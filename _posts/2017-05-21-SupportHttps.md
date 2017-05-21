---
layout: post
title: Nginx 网站支持https在ubuntu 16.04
categories: [ubuntu,Server,linux,nginx]
description: 自从谷歌对http提示不安全时候，全民都开始转向https，于是自己也做了尝试，现在记录一下。
keywords: ubuntu,Server,linux
---



# 前言

自从谷歌对http提示不安全时候，全民都开始转向https，于是自己也做了尝试，现在记录一下。


# 服务器介绍

我的是腾讯云的学生机，1核1G1M20G

系统：ubuntu 16.04 64bit

Nginx: nginx/1.10.0



# 安装 cerbot

[cerbot官网](https://certbot.eff.org/) ,按照提示来就行了，支持几乎所有类型的linux服务器。


ubuntu的我自己记录一下：

```
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot 
```




# 获得证书

`sudo certbot certonly --webroot -w /home/wwwroot/xjtushilei/ -d xjtushilei.com -d www.xjtushilei.com`

其中，`-w` 后面是自己网站的目录，用来区分不同的证书用的，`-d` 是添加域名，可以设置多个，如我的设置了两个。

之后证书会自动生成到指定目录下，在下一章有介绍

# 设置 Nginx

不同的服务器，设置不同，位置也不同，找到自己的nginx配置文件，增加一个server，或者在之前的server中进行修改，有几点需要注意：

1. `listen 443 ssl;` 让支持 `https`，如果有防火墙，记得打开。
2. `ssl_certificate` 和 `ssl_certificate_key` 在ubuntu下的默认目录为：`/etc/letsencrypt/live/xjtushilei.com/` 最后一个是你的域名，不同的域名目录不一样。`fullchain.pem` 是 `ssl_certificate`，` privkey.pem` 是`ssl_certificate_key`。如果服务器不同，你用的 `apache httpd `的话，修改这两个即可。
3. `http` 强制跳转 `https`，如下所示，进行 `301` 重定向即可。


```
server {
    listen          80;
    listen          443 ssl;
    server_name     xjtushilei.com www.xjtushilei.com ;
    root            /home/wwwroot/xjtushilei;
    index           index.html index.htm;
    ssl_certificate            /etc/letsencrypt/live/xjtushilei.com/fullchain.pem;
    ssl_certificate_key      /etc/letsencrypt/live/xjtushilei.com/privkey.pem;
    if ($scheme = http) {
        return  301 https://$host$request_uri;
    }
}
```

# 开始开心的玩耍

至此，配置结束。比如 我的域名访问： [http://xjtushilei.com](http://xjtushilei.com) 则会自动跳转到 `htpps` 上。会看到绿色小锁锁，开心。


# 续签

证书只有90天，到期需要续签，我们可以自动续签。写一段代码。


