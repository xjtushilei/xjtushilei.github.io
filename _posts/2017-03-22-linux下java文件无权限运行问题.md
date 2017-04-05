---
layout: post
title: linux下java文件无权限运行问题
categories: [java,phantomjs,Spring-boot]
description: 一个爬虫的项目，在Linux下运行。由于用到了phantomjs爬虫驱动，但是不可运行。
keywords: java, phantomjs, Spring-boot
---


spring-boot开发的爬虫项目，基于web的。java web的文件，或者java生成的文件无权限运行等关于权限的问题，我都想可以通过如下的方式来进行！

## 好方法

很好的想法是我在兼容linux和windows两个系统，实现很简单，把两个驱动同时放在这里就行。

``` java
 if ("Linux".equals(System.getProperty("os.name"))) {
            logger.info("Linux:  phantomjs.binary.path:phantomjs/phantomjs");
            System.setProperty("phantomjs.binary.path", StartOfOS.class.getClassLoader().getResource("").getPath() + "phantomjs/phantomjs");
        } else {
            logger.info("windwos:  phantomjs.binary.path:phantomjs/phantomjs.exe");
            System.setProperty("phantomjs.binary.path", StartOfOS.class.getClassLoader().getResource("").getPath() + "phantomjs/phantomjs.exe");
        }
```


## 问题

如图，phantomjs的驱动，显示如图的报错！

![phantomjs.png](/images/blog/phantomjs.png) 

##尝试

先看了log，没发现什么问题，然后google，也没有结果。由于经验不多，就手动进行了如下的尝试。

我单独写了个java程序，发现可以正常运行，但是改方法却不行。于是想到了是权限的问题。

讲道理，如果最后部署在docker里，我猜，没有权限的问题吧？

## 解决

想直接chomd 777 ，不过考虑到移植性，坐了如下的权限处理！

直接给该文件赋予可读权限！（ps：目前我遇到的所有linux问题，90%都是权限导致的）

```java
File phantomjsFile = new File(StartOfOS.class.getClassLoader().getResource("").getPath() + "phantomjs/phantomjs");
        logger.info("是否可执行：" + phantomjsFile.canExecute());
        if (!phantomjsFile.canExecute()) {
            phantomjsFile.setExecutable(true);
            if (!phantomjsFile.canExecute()) {
                logger.error("爬虫软件无权限运行！");
            }
        }
```

## 总结

linux权限的问题，很多。自己被坑了好多好多次。

开发提前在运行环境做测试，或者直接在运行环境下开发。

我想，大概过不了多久，我想主动把所有的开发都在linux 上进行了。