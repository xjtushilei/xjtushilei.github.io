---
layout: post
title: phantomjs爬虫在docker下不能正常运行的问题
categories: [phantomjs, spider, docker, linux]
description: docker环境，centos7下，phantomjs不能正常工作的问题
keywords: phantomjs, 爬虫, docker, linux
---


> 版权声明：可以任意转载，转载时请标明文章[原始出处-xjtushilei](http://www.xjtushilei.com/2017/11/01/phantomjs-linux/)和作者信息：[石磊](http://www.xjtushilei.com/about/)      

# 背景

和北京xx教育合作的知识图谱项目，因为xx升级了docker镜像的管理,撤掉了之前的docker，导致服务全部瘫痪。虽然立马就锁定了问题，还是记录一下吧，省的所有在centos下进行爬虫的人debug时候找不到原因。

# phantomjs

一个基于webkit内核的无头浏览器，即没有UI界面，即它就是一个浏览器，只是其内的点击、翻页等人为相关操作需要程序设计实现。

提供javascript API接口，即通过编写js程序可以直接与webkit内核交互，在此之上可以结合java语言等，通过java调用js等相关操作，从而解决了以前c/c++才能比较好的基于webkit开发优质采集器的限制。

提供windows、linux、mac等不同os的安装使用包，也就是说可以在不同平台上二次开发采集项目或是自动项目测试等工作。

它将非常方便的应用于模拟登陆，如微博、电商类，或是小米、火车票抢票等项目中，下一步计划将其与上述项目结合，开发更有意思的项目。   

# 官网

http://phantomjs.org/

# 下载与安装

我附个图片算啦，支持各大平台和各种语言。

![下载与安装](/images/blog/phantomjs/1.png)

# 坑

![下载与安装](/images/blog/phantomjs/2.png)

一般情况下，大家都是只下载了驱动器，没有注意到有些linux环境是没有一些依赖的。比如我的ubuntu是有这些依赖的，但是docker的centos7里是没有的，这就是一个坑。

所以，解决办法就是：

`RUN yum install -y fontconfig`

