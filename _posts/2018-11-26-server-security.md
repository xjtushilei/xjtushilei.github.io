---
layout: post
title: 服务器防暴力破解
categories: [osgi, java, maven]
description: 自己的服务器最近连续几天被攻破好几次，被服务商给禁止使用了。因为上面没什么重要服务，仅仅跑跑代理，就没注意过安全问题。结果几天时间就被暴力破解了几千次！
keywords: osgi, maven
---

> 版权声明：可以任意转载，转载时请标明文章[原始出处-ScriptShi](http://www.xjtushilei.com/2018/11/26/server-security/)


自己的服务器最近连续几天被攻破好几次，被服务商给禁止使用了。因为上面没什么重要服务，仅仅跑跑代理，就没注意过安全问题。下面列一下自己采取的操作。

# 黑客暴力破解记录

```
sudo grep "Failed password" /var/log/secure | awk '{print $11}' | sort | uniq -c | sort -nr 
```

不看不知道，一看吓一跳。

![](/images/blog/server-security/1.png)

三天时间，就被这么多人暴力破解了很多很多次！

# new no-root user and passwd

修改默认的root密码，并增加新的非root账户。
```
passwd
useradd xxxx
passwd xxxx
```
# ssh

`vim /etc/ssh/sshd_config`
内修改
```
Port xxxxx
PasswordAuthentication no #禁止密码认证
PermitEmptyPasswords no #禁止空密码
```
```
service sshd restart
```
就暂时不修改秘钥登录了，秘钥携带不方便。以后登录使用非root账户登录，防止别人暴力破解密码。

# iptables

```
wget -4qO-  https://xjtushilei.com/images/blog/server-security/Get_Out_Spam.sh |bash
```

防SPAM和BT、PT。代码是网上找的，还不错。如果你封的话，经常会被利用了当邮件服务器乱七八糟的转发东西，很恶心。

```
#!/bin/bash
#########################################################################
# File Name: Get_Out_Spam.sh
# Author: LookBack
# Email: admin#dwhd.org
# Version:
# Created Time: 2015年09月15日 星期二 22时30分38秒
#########################################################################

smpt_port="25,26,465"
pop_port="109,110,995"
imap_port="143,218,220,993"
other_port="24,50,57,105,106,158,209,587,1109,24554,60177,60179"
key_word=(Subject HELO SMTP
    "torrent" ".torrent" "peer_id=" "announce"
    "info_hash" "get_peers" "find_node"
    "BitTorrent" "announce_peer"
    "BitTorrent protocol" "announce.php?passkey=")

v4iptables=`which iptables 2>/dev/null`
v6iptables=`which ip6tables 2>/dev/null`

cat_rules() { $1 -t $2 -L OUTPUT -nvx --line-numbers; }
mangle_key_word() { $1 -t mangle -A OUTPUT -m string --string "$2" --algo bm --to 65535 -j DROP; }
tcp_port_DROP() {
    [ "$1" = "$v4iptables" ] && $1 -t filter -A OUTPUT -p tcp -m multiport --dports $2 -m state --state NEW,ESTABLISHED -j REJECT --reject-with icmp-port-unreachable
    [ "$1" = "$v6iptables" ] && $1 -t filter -A OUTPUT -p tcp -m multiport --dports $2 -m state --state NEW,ESTABLISHED -j REJECT --reject-with tcp-reset
}
udp_port_DROP() { $1 -t filter -A OUTPUT -p udp -m multiport --dports $2 -j DROP; }
save_rules() {
    if [ -f /etc/redhat-release ]; then
        for i in $v4iptables $v6iptables;do ${i}-save > /etc/sysconfig/`basename $i`; done
    else
        for i in $v4iptables $v6iptables;do ${i}-save > /etc/`basename $i`.rules;done
        cat > /etc/network/if-pre-up.d/iptables << EOF
#!/bin/bash
${v4iptables}-restore < /etc/`basename $v4iptables`.rules
EOF
        chmod +x /etc/network/if-pre-up.d/iptables
    fi
}

if [ -n "$v4iptables" -a -n "$v6iptables" ]; then
    for i in ${key_word[@]}; do for j in $v4iptables $v6iptables; do mangle_key_word $j $i; done; done
    for i in ${smpt_port} ${pop_port} ${imap_port} ${other_port}; do for j in $v4iptables $v6iptables; do tcp_port_DROP $j $i && udp_port_DROP $j $i; done; done
    clear && for i in $v4iptables $v6iptables; do for j in filter mangle; do cat_rules $i $j; done; done && save_rules
elif [ -n "$v4iptables" ]; then
    for i in ${key_word[@]}; do mangle_key_word $v4iptables $i;done
    for i in ${smpt_port} ${pop_port} ${imap_port} ${other_port}; do tcp_port_DROP $v4iptables $i && udp_port_DROP $v4iptables $i; done
    clear && for i in filter mangle; do cat_rules $v4iptables $i;done && save_rules
else
    echo "Your system don't find iptables"
fi
```

# DenyHosts

防暴力破解的神器，但是自己使用不当（自己记错密码）也会很蛋疼，把自己给封了。

```
wget https://nchc.dl.sourceforge.net/project/denyhosts/denyhosts/2.6/DenyHosts-2.6.tar.gz
tar zxvf DenyHosts-2.6.tar.gz                             #解压源码包
cd DenyHosts-2.6                                          #进入安装解压目录
python setup.py install                                   #安装DenyHosts
cd /usr/share/denyhosts/                                  #默认安装路径
cp denyhosts.cfg-dist denyhosts.cfg                       #denyhosts.cfg为配置文件
cp daemon-control-dist daemon-control                     #daemon-control为启动程序
chown root daemon-control                                 #添加root权限
chmod 700 daemon-control                                  #修改为可执行文件
ln -s /usr/share/denyhosts/daemon-control /etc/init.d     #对daemon-control进行软连接，方便管理
echo "安装到这一步就完成了。"
/etc/init.d/daemon-control start                          #启动denyhosts
chkconfig daemon-control on                               #将denghosts设成开机启动
```

修改配置文件。

`vim /usr/share/denyhosts/denyhosts.cfg`

```
SECURE_LOG = /var/log/secure                  #ssh 日志文件  #redhat系列根据/var/log/secure文件来判断；
DENY_THRESHOLD_INVALID = 1                   #允许无效用户失败的次数
DENY_THRESHOLD_VALID = 3                     #允许普通用户登陆失败的次数
DENY_THRESHOLD_ROOT = 3                      #允许root登陆失败的次数
```

更改DenyHosts的默认配置之后，重启DenyHosts服务即可生效:
`/etc/init.d/daemon-control restart  `


将自己常用的ip或ip段加入到白名单。
```
修改/etc/hosts.allow文件

    #

    # hosts.allow This file describes the names of the hosts which are

    # allowed to use the local INET services, as decided

    # by the '/usr/sbin/tcpd' server.

    #

    sshd:210.13.218.*:allow

    sshd:222.77.15.*:allow
```

# 禁用密码登录

1. `ssh-keygen -t rsa` 生成密钥和私钥 ，并将 `id_rsa` 保存到自己电脑上，尽量将服务器上的删掉
2. `cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys` 添加自己的公钥到认可文件里
3. 修改SSH的配置文件 `vi/etc/ssh/sshd_config` ,取消掉注释
     ```
        RSAAuthentication yes
        PubkeyAuthentication yes
        
        AuthorizedKeysFile .ssh/authorized_keys
        
        PasswordAuthentication no
     ```
4. 修改权限 `chmod 600 /root/.ssh/authorized_keys`
5. 重启服务 `service sshd restart`

