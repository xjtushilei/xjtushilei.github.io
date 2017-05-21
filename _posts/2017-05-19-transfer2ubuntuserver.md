---
layout: post
title: windows服务器迁移Ubuntu Server 16.04
categories: [ubuntu,Server,linux]
description: 将自己的服务器从windows迁移到了linux，虽然Windows很方便，感觉专业性还是差了点，有一些东西也不是很方便。
keywords: ubuntu,Server,linux
---



# 前言

之前一直使用的windowsserver2008，内存占用也不多，没想象的那么多。一切都很稳定，不过最近出了windows的病毒，感觉linux的防火墙更方便，windows一大堆东西学习来太麻烦了。


刚开始，用的centos 7.2，我尝试了几款linux面板。大家可以百度了解，挺人性化的。个人感受而言，`宝塔linux面板`优于 `appnode` 。如果付费的话，显然后者更好。因为后者的免费版本，功能有限，使用了付费的，感觉比宝塔好。为什么之后选择不适用linux面板这样的神奇呢？主要有5个原因：
1. https支持不够好
2. java技术栈的需要配置tomcat，他们对tomcat支持很不友好
3. 用别人的面板，存在后门的嫌隙很大
4. 各种配置都是点击式的，出了问题都不知道怎么配置，自己学会才是硬道理
5. 体验过程中出现的bug、十分不舒服。几个面板都还不够稳定，或许一年后再来体验比较好。如果你是一个php程序员，使用面板将会非常方便！



# 服务器介绍

我的是腾讯云的学生机，1核1G1M20G

系统选的是：ubuntu16.04（不使用面板的话，推荐这款来个人使用，有运维推荐centos7）因为自己平时用的就是ubuntu，熟悉一点，社区大，虽然之前体验centos感觉也还行。


# ssh

我用的 `mobaxterm` 来进行 `ssh` 远程操作服务器，可以拖动文件和准在线编辑文件。不过注意ssh是有自动断线的，如果安装时间太长，会自动断线。可以使用 `screen` 命令来防止，更简单的是如下图：

![mobaxterm设置](/images/blog/transferubuntu/0.png)

# 创建超级用户

` sudo passwd` 输入超级用户root的密码
 
` su ` 切换root用户

之后都是在超级用户下操作

# DNS

使用ubuntu14.04有此情况，16.04和其他操作系统根据情况忽略DNS操作。后来我使用了16。04，默认的dns就好了。

腾讯云的源的域名是内网域名，需要添加内网解析的dns，我们完全把dns的第一个换成腾讯云的内网dns。


根据自己的服务器所在地址修改，如下

广州服务器：
- nameserver 10.225.30.181
- nameserver 10.225.30.223

北京服务器：
- nameserver 10.53.216.182
- nameserver 10.53.216.198

上海服务器：
- nameserver 10.236.158.114
- nameserver 10.236.158.106

上海金融服务器：
- nameserver 10.48.46.77
- nameserver 10.48.46.27

深圳金融服务器：
- nameserver 100.83.224.91
- nameserver 100.83.224.88

香港服务器：
- nameserver 10.243.28.52
- nameserver 10.225.30.178


### 修改腾讯云的dns操作：

`cp /etc/resolv.conf /etc/resolv.conf.bak` 备份

`vim /etc/resolv.conf`  修改



# lnmp

之前一直在用 `lamp` ，后来发现 `nginx` 会好用一点，特别在反向代理上比apache有很多优势。lamp 相对简单点，从我入门的角度来说。在线熟悉了，就用一下 `lnmp`

官网 [https://lnmp.org](https://lnmp.org), 我安装的1.3版本，服务器是ubuntu16.04版本

`wget -c http://soft.vpser.net/lnmp/lnmp1.3-full.tar.gz && tar zxf lnmp1.3-full.tar.gz && cd lnmp1.3-full && ./install.sh lnmp`   下载 && 解压 && cd && 执行  ，下载的网速大概2.5M每秒

安装过程中，可以仔细看一下说明，学生机的话，推荐一路默认就行，其中php推荐5.6。高版本的好多学生机是不能用的，因为检测到性能不够。

先自动检测系统环境，更新一些软件。

![编译安装lnmp](/images/blog/transferubuntu/1.png)

然后和进行编译安装，编译了很久，可以去喝一杯咖啡了，要慢慢享受才行。网速还行，腾讯云内网的源，只是cpu慢，编译比较慢。注意:千万别让 `ssh` 断了，或使用了screen，不然推荐你重装系统再来一遍吧。

`lamp` 在 `ubuntu 16.04` 安装一切顺利，。14.04出了很多bug。不过云服务有一点很好，重装操作系统很快很快！初学者遇到安装bug，因为自己操作原因的话，直接重装就好啦

![lnmp](/images/blog/transferubuntu/2.png)

## 箴言

编译安装的速度真的是**受不了了**，如果你可以，推荐你从apt-get里自己下载配置，速度会好很多。

那么为什么还推荐这种方式呢？[传送门](https://lnmp.org/about.html)  感觉我真是一个打广告的。

## LNMP相关软件安装目录

- Nginx 目录: /usr/local/nginx/
- MySQL 目录 : /usr/local/mysql/
- MySQL配置文件：/etc/my.cnf
- Nginx日志目录：/home/wwwlogs/
- Nginx主配置(默认虚拟主机)文件：/usr/local/nginx/conf/nginx.conf
- 添加的虚拟主机配置文件：/usr/local/nginx/conf/vhost/域名.conf
- PHP配置文件：/usr/local/php/etc/php.ini
- PHPMyAdmin目录 : /home/wwwroot/default/phpmyadmin/ 强烈建议将此目录重命名为其不容易猜到的名字。phpmyadmin可自己从官网下载新版替换。
- 默认网站目录 :  /home/wwwroot/default/

更多详见：[传送门](https://lnmp.org/faq/lnmp-software-list.html)

# JDK环境

两种方法：
- apt-get
- 下载源码，自己配置path路径

## apt-get方法

这里使用第一种方法，比较简单，后来经过测验，速度真是太慢了！！！！推荐自己配置吧

1. 添加java的源
    - `sudo add-apt-repository ppa:webupd8team/java`
    - `sudo apt-get update`
2. 安装oracle-java-installer
    - jdk7
        - `sudo apt-get install oracle-java7-installer`
    - jdk8
        - `sudo apt-get install oracle-java8-installer`

3. 设置系统默认jdk
    - JDk7
        - `sudo update-java-alternatives -s java-7-oracle`
    - JDK8
        - `sudo update-java-alternatives -s java-8-oracle`
4. 检查安装成功
    - `java -version`

## 自己配置方法

1. 上传jdk包
    - 自己去官网下载linux 64的.tar.gz
    - `ssh` 上传上去，推荐使用 `mobaxterm` 的拖动上传文件到服务器，上传平均速度700K每秒
2. 解压
    - `tar -xzvf jdk-8u131-linux-x64.tar.gz`
3. 配置
    - 见[下方的**配置**](#配置)



# maven 环境

跟jdk安装一样，推荐自己上传，然后解压，再配置，配置文件见[下方的**配置**](#配置)

如果上传的.zip，解压使用 `unzip file.zip `

推荐提前更换阿里的镜像，如下。这样maven下载速度会很快！

```xml
    <mirror>  
        <id>nexus-aliyun</id>  
        <mirrorOf>*</mirrorOf>  
        <name>Nexusaliyun</name>  
        <url>http://maven.aliyun.com/nexus/content/groups/public</url>  
    </mirror> 
```


# Tomcat

使用的tomcat8，根据自己情况而定。直接上传到服务器，解压扔到一个目录就行，不用安装和配置！

如果上传的.zip，解压使用 `unzip file.zip `

# 配置

直接配置就行了，我的jdk和maven目录如下面的配置文件所示

`sudo vim /etc/profile`

在最后，粘贴如下代码（请自行修改路径）：

```
export MAVEN_HOME=/home/ubuntu/apache-maven-3.3.9
export JAVA_HOME=/home/ubuntu/jdk1.8.0_131
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin:$MAVEN_HOME/bin

```

使配置生效

`source /etc/profile`

测试成功没

`java -version` 和 `mvn -v`

发现mvn没有运行权限，简单暴力的执行如下:
```
chmod -R 777 jdk1.8.0_131
chmod -R 777 apache-maven-3.3.9
chmod -R 777 apache-tomcat-8.5.15
```

再次`mvn -v`，成功！



# 服务运行

## Tomcat
- sh /home/ubuntu/apache-tomcat-8.5.15/bin/startup.sh  开启
- sh /home/ubuntu/apache-tomcat-8.5.15/bin/shutdown.sh  关闭

# LNMP

各个程序状态管理: 

`lnmp {nginx|mysql|mariadb|php-fpm|pureftpd} {start|stop|reload|restart|kill|status}`



# JavaWeb运行

git clone https://git.coding.net/xjtushilei/SearchVIP.git

**带密码的git：**
git clone https://用户名:密码@git.coding.net/xjtushilei/SearchVIP.git

mvn package

mv target/searchvip-0.0.1-SNAPSHOT.war /home/ubuntu/apache-tomcat-8.5.15/webapps/searchvip.war

运行tomcat

# mysql优化

让mysql外网访问：

- 首先需要自己在phpmyadmin里添加一个用户 主机为 % 的任意主机（也可以编辑已有的用户）
- 并且iptables 里删除DROP 3306端口的规则
    - ` sudo iptables -L -n --line-numbers`  按行号显示规则
    - ` sudo iptables -D INPUT 5`  删除3306的规则的那行

修改端口等：`sudo vim /etc/my.cnf`

详情操作：https://my.oschina.net/code33/blog/299242?p=1





# nginx


添加的虚拟主机配置文件：/usr/local/nginx/conf/vhost/*.conf


配置样例：

```
server {
    listen                     80;
    listen                     443 ssl;
    server_name                tongtong.xjtushilei.com;
     root                      /home/wwwroot/tongtong;
    index                      index.html index.htm index.php;
    include enable-php.conf;
    keepalive_timeout          65s;
    client_max_body_size       1m;
    ssl_certificate            /opt/appnode/agent/data/ssl/tongtong.xjtushilei.com/tongtong.xjtushilei.com.crt;
    ssl_certificate_key        /opt/appnode/agent/data/ssl/tongtong.xjtushilei.com/tongtong.xjtushilei.com.key;
    ssl_ciphers                ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-SHA256:AES128-SHA256:AES256-SHA:AES128-SHA:DES-CBC3-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
    ssl_prefer_server_ciphers  on;
    ssl_protocols              TLSv1 TLSv1.1 TLSv1.2;
    ssl_session_cache          shared:SSL:5m;
    ssl_session_timeout        5m;
    gzip_types                 text/plain text/css text/xml text/javascript text/x-component application/json application/javascript application/xml application/xhtml+xml application/xml+rss application/rss+xml application/atom+xml application/x-font-ttf application/x-web-app-manifest+json font/opentype image/svg+xml image/x-icon;

    if ($scheme = http) {
        return  301 https://$host$request_uri;
    }


}
```

