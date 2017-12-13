---
layout: post
title: 服务器日常初始化的脚本
categories: [linux,gcc,python]
description: 主要记录了gcc的升级脚本，以及其他的常见配置
keywords: linux, gcc,python,配置
---


> 版权声明：可以任意转载，转载时请标明文章[原始出处-xjtushilei](http://www.xjtushilei.com/2017/12/13/server-init/)和作者信息：[石磊](http://www.xjtushilei.com/about/)      

升级了架构，采用了腾讯云的vpc，成都服务器，连续配置了12台服务器，肯定要节省点时间，所以就这样记录一下吧，之后需要的话，写成脚本更佳。省事的主要就是gcc那些了，gcc自带的版本太低了，项目需求高。

# 设置locale
`vim /etc/locale.conf`
```
LANG=en_US.utf-8
LC_CTYPE="en_US.utf-8"
LC_NUMERIC="en_US.utf-8"
LC_TIME="en_US.utf-8"
LC_COLLATE="en_US.utf-8"
LC_MONETARY="en_US.utf-8"
LC_MESSAGES="en_US.utf-8"
LC_PAPER="en_US.utf-8"
LC_NAME="en_US.utf-8"
LC_ADDRESS="en_US.utf-8"
LC_TELEPHONE="en_US.utf-8"
LC_MEASUREMENT="en_US.utf-8"
LC_IDENTIFICATION="en_US.utf-8"
LC_ALL=en_US.utf-8

```
`. /etc/locale.conf
`

# 创建dev用户


```
useradd -d /home/dev -m dev
passwd dev
密码
```


# 升级GCC
```bash
wget http://ftp.gnu.org/gnu/gmp/gmp-5.0.1.tar.gz 
tar -xvzf gmp-5.0.1.tar.gz
cd gmp-5.0.1/
./configure --prefix=/usr/local/gmp-5.0.1
make
make install
cd ..
wget http://ftp.gnu.org/gnu/mpfr/mpfr-3.1.5.tar.gz
tar -xvzf mpfr-3.1.5.tar.gz
cd mpfr-3.1.5/
./configure --prefix=/usr/local/mpfr-3.1.5 --with-gmp=/usr/local/gmp-5.0.1
make
make install
cd ..
wget http://ftp.gnu.org/gnu/mpc/mpc-1.0.3.tar.gz
tar -xvzf mpc-1.0.3.tar.gz
cd mpc-1.0.3/
./configure --prefix=/usr/local/mpc-1.0.3 --with-gmp=/usr/local/gmp-5.0.1 --with-mpfr=/usr/local/mpfr-3.1.5
make
make install
cd ..
vim /etc/profile
```
````
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/mpc-1.0.3/lib:/usr/local/gmp-5.0.1/lib:/usr/local/mpfr-3.1.5/lib
````
```
source /etc/profile
wget http://fr.mirror.babylon.network/gcc/releases/gcc-4.9.4/gcc-4.9.4.tar.gz
tar -xzvf gcc-4.9.4.tar.gz
cd gcc-4.9.4
./configure --disable-multilib --enable-languages=c,c++ --with-gmp=/usr/local/gmp-5.0.1 --with-mpfr=/usr/local/mpfr-3.1.5 --with-mpc=/usr/local/mpc-1.0.3
make -j4
make install
cd ..
gcc -v
```

# python3环境

```
wget https://www.python.org/ftp/python/3.6.3/Python-3.6.3.tgz
tar -xzvf Python-3.6.3.tgz
cd Python-3.6.3

./configure
make
make install

pip3 install virtualenv
```

# java
```
wget http://dev-1252377804.cosbj.myqcloud.com/jdk-8u151-linux-x64.rpm
rpm -ivh jdk-8u151-linux-x64.rpm
vim  /etc/profile
```
```
JAVA_HOME=/usr/java/jdk1.8.0_151
CLASSPATH=.:$JAVA_HOME/lib/tools.jar
PATH=$JAVA_HOME/bin:$PATH
export JAVA_HOME CLASSPATH PATH
```
`. /etc/profile
`
#  dev用户的python3 虚拟环境
```
su dev
cd ~
mkdir .pip
vim ~/.pip/pip.conf
```
```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```
```
virtualenv .py3 -p python3
vim .bashrc 
```
```
alias py3='source ~/.py3/bin/activate'
```
```
source .bashrc
py3
pip install NumPy SciPy pybind11
```


# nodejs

```
wget https://npm.taobao.org/mirrors/node/v8.9.0/node-v8.9.0-linux-x64.tar.xz
xz -d node-v8.9.0-linux-x64.tar.xz
tar -xf node-v8.9.0-linux-x64.tar
mv node-v8.9.0-linux-x64 /usr/local/node/

vim  /etc/profile
```
```
export NODE_HOME=/usr/local/node
export PATH=$NODE_HOME/bin:$PATH
```
```
. /etc/profile
node -v
npm config set registry https://registry.npm.taobao.org
```

# ant 配置

```
wget http://mirrors.tuna.tsinghua.edu.cn/apache//ant/binaries/apache-ant-1.10.1-bin.zip
unzip apache-ant-1.10.1-src.zip
mv apache-ant-1.10.1 /usr/local/ant
vim  /etc/profile

```
```
 export ANT_HOME=/usr/local/ant
 export PATH=$PATH:$ANT_HOME/bin
```
```
. /etc/profile
ant -version

```

