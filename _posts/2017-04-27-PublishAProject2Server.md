---
layout: post
title: JavaWeb工程发布到生产服务器
categories: [java,maven,Server,Spring-Boot,Docker]
description: 把自己的工程发布到生产服务器中，使用了自动构建框架，和docker容器管理服务。
keywords: java, 服务器，docker
---

> 项目是实验室和北京xx公司合作的项目，关于知识图谱的，涉及知识图谱的创建、管理、可视化等，主要是自己完成的。由于第一次自己参与到正式的代码集成中，之前的不是特别正规，故记录一下。

# 流程

**源码 \-&gt; Gitlab \-&gt; Jenkins \-&gt; docker容器管理器**

一个自动化的流程，很是方便！

# 源码

使用Spring-Boot 框架写的web，当时他们公司主要在使用SpringMVC。

接下来主要就是使用构建工具的问题了。

该项目要求使用gradle，但是当时比较熟悉maven，实验室不知什么原因gradle网速很差（虽然都是maven仓库），发现maven可以直接转gradle，直接使用命令

`gradle init --type pom`

还是十分方便的，所以我同时维护了gradle和maven。

src根目录中：我们加入了“deploy/dockerfile文件"！ 方便自动生成docker！

# Gitlab

我的版本控制平台自己使用的话，一般都是在国内的git平台：coding.net或者OsChina，如果开源的话会推入github等。

OsChina由于免费项目数有1000个，所以之后会将个人的仓库使用在OsChina上。

小技巧：我读github的源码喜欢将代码导入到国内的仓库里，比如coding.net，这样网速比较方便，且有手机客户端随时查看！


#### gitlab

介绍：使用Git作为代码管理工具，并在此基础上搭建起来的web服务。功能和github类似，相当于自己有一个github公司的全部的服务。

可以从gitlab官网下载代码，在自己服务器上搭一个。

xx公司就是自己搭建的gitlab，并且是社区版本，他们之前使用的版本控制是svn，因svn有各种问题，后转为了git。他们使用的社区版，并打算最近转为企业版。

创建账号，然后和其他git平台一样，都可以导入仓库。这一步也是十分简单的。

tips：如果想体验gitlab服务而不想搭建，可以在“天池大数据”比赛中，注册账号，就有一个gitlab账号，然后使用阿里的gitlab。


# Jenkins

Jenkins是基于Java开发的一种持续集成工具，用于监控持续重复的工作，功能包括：

- 1、持续的软件版本发布/测试项目。
- 2、监控外部调用执行的工作。

这里主要是自动从gitlab上，下载代码，构建编译测试代码，可以选择随意的构建工具等其他设置，可以自己加入脚本，比如生成docker！

这一步，将giblab和一些脚本配置一下，使点击一个按钮，就可以自动拉取代码，生成一个docker镜像！


# docker容器管理器

目前我使用到的：

- 监控dokcer，发现一个工程较新的docker（有时间标签）会自动部署，并将原来的停掉，几乎是无缝替换。
- 提供日志监控
- 容器ip，提供域名服务，自动配置该项目的二级域名
- docker运行监控，宕机自动重启，监控报警
- 测试
- 持续交付

xx公司使用的是灵雀云，从灵雀云官网介绍看！灵雀云完全能替代掉Jenkins的功能，但是不知为何加入了Jenkins，第一想法是提高架构部门的工作复杂度而变得高大上（因为公司有一个基础架构部），或许我是错的，大家怎么想？

这一步就是将生成的docker放进去容器中，并进行各种监控等后续步骤。


# 感想

自动化流程确实不错！不过在实验室推广就没必要了。没有去过公司的可以了解一下~

接触这些新的东西很是开心。

自己继续加油！
