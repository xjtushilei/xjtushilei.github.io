---
layout: wiki
title: windows 安装
categories: install
description: windows 安装。
keywords: windows 安装
---

# MongoDB


#### **1\. 下载**

```
下载链接：https://www.mongodb.com/download-center?jmp=nav#community

```

#### **2\. 安装**

```
按提示安装即可
1. Complete：完整安装
2. Custom：自定义安装，可选择安装路径和安装组件


```  

#### **3\. 配置**

```
1. 安装完的目录结构 [C:\Program Files\MongoDB\Server\3.6]
```

2. 在MongoDB安装目录创建2个文件夹 data和logs（也可自定义选择放置路径）


在conf文件夹下新建mongodb.config文件，内容如下：
```
dbpath=E:\MongoDB\data #数据库路径
logpath=E:\MongoDB\logs\mongodb.log #日志输出文件路径
logappend=true #错误日志采用追加模式
journal=true #启用日志文件，默认启用
quiet=true #过滤掉无用的日志信息，若需要调试使用请设置为false
port=27017 #端口号 默认为27017
```


#### **4\. 添加为系统服务**


添加为系统服务 PowerShell（Admin）(使用绝对路径)
  
> M:\data\MongoDB3.4.1\bin\mongod.exe -config M:\data\MongoDB3.4.1\conf\mongodb.config -install -serviceName "MongoDB" 
 
启动服务  

> net start mongodb