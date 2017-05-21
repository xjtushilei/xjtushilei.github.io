---
layout: post
title: ubuntu 16.04安装jekyll自动化部署个人网站
categories: [ubuntu,Server,linux,jekyll]
description: github pages无法被百度收录，coding等国内的pages比较坑，所以就自己搭建服务器，自动化部署自己的个人网站
keywords: ubuntu,Server,linux, jekyll
---



# 前言

github pages无法被百度收录，coding等国内的git pages比较坑，所以就自己搭建服务器，自动化部署自己的个人网站。


# 配置环境

## 安装 jvm

用rvm官方推荐的方式安装 `curl -L get.rvm.io | bash -s stable `

回显提示我们，RVM被安装在$HOME/.vrm中；并且需要在终端中加载脚本$HOME/.rvm/scripts/rvm

所以，我们把它添加到系统环境变量中

`sudo vim /etc/profile`

最后添加如下：
```
export PATH=$PATH:/home/ubuntu/.rvm/bin
```
使生效

`source /etc/profile`


###其实
并不用添加到环境变量种，重启面板就好啦。 安装包自动帮你安装到了用户的环境变量里了。


## 安装 ruby

查看目前有哪些ruby ： ` rvm list known`

安装一个比较新的： `rvm install ruby-2.4.0`

选择2.4.0作为当前的使用版本，并且设置为缺省：`rvm use ruby-2.4.0 --default ` 

设置好之后察看ruby版本：`ruby -v  `


## gem换源

换源：`gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/`

显示目前的源：`gem sources -l`

更新缓存：`gem sources -u `



## 安装 jekyll

 `gem install jekyll bundler`
 
bundler的作用：运行 bundle install 则安装所以必须的东西都会自动安装完成


## 安装 nodejs

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

sudo apt-get install -y nodejs
```



# jekyll 测试

下载我的jekyll博客

` git clone https://用户名:s密码@git.coding.net/xjtushilei/xjtushilei.git`

之后只需要在xjtushilei的目录下 `git pull` 即可获取最新的博客, 不用输入密码

进去目录 ：`cd xjtushilei`

安装该项目需要的包：`bundle install`

生成项目到wwwroot下：`jekyll build --destination  /home/wwwroot/tongtong/` 这样web服务器就可以驱动它。

# 自动化脚本

写一个自动化的脚本，不断地拉取，然后更新，这样就能实时的拥有最新的网页。更新频率可以自由设置，比如每天晚上1点更新，或者每5分钟一次等

update_website.sh
```
cd /home/ubuntu/xjtushilei/
git pull
jekyll build --destination  /home/wwwroot/tongtong/
```
## 定时执行

脚本在cron里无法运行，感觉是环境变量的问题，因为我在root的环境下运行脚本失败，jekyll不在全局环境变量里吗？我添加后尝试，还是失败。


目前为止，只能人工ssh来运行脚本了，不能自动定时执行了。如果有谁有经验可以回复我科学的方法。在这里谢谢大家了。