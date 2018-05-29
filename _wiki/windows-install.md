---
layout: wiki
title: windows 安装
categories: install
description: windows 安装。
keywords: windows 安装
---

# MongoDB

## 内网安装
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
systemLog:
  destination: file
  path: E:\data\mongo-log-server\logs\mongod.log
  logAppend: true
storage:
  dbPath: E:\data\mongo-log-server\data
net:
  port: 27017
  bindIp: 127.0.0.1
#security:
 # authorization: enabled
```


#### **4\. 添加为系统服务**


添加为系统服务 PowerShell（Admin）(使用绝对路径)
  
> E:\data\mongo-log-server\bin\mongod.exe --config E:\data\mongo-log-server\conf\mongod.cfg --install --serviceName mongologs --serviceDisplayName mongologs 
 
启动服务  

> net start mongodb

## 外网安全
3.X
#### 创建用户
在无认证环境下，创建全局用户,
> 在哪个db下创建的用户，需要在哪个db进行认证。所以创建前注意use admin，切换到admin，以后，默认以admin进行创建

```
db.createUser({  
        user:'root',  
        pwd:'yotta123',  
        roles:[{  
           'role':'root',
           'db':'admin'  
       }]  
    })  

```

创建只读
```
db.createUser({  
    user:'read-log-4-network-collage',  
    pwd:'log-log-4-network-collage',  
    customData:{description:"管理员root"},  
    roles:[{  
        'role':'read',
        'db':'log-4-network-collage'  
    }]  
})  

```

角色介绍-内建的角色

- 数据库用户角色：read、readWrite;
- 数据库管理角色：dbAdmin、dbOwner、userAdmin；
- 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
- 备份恢复角色：backup、restore；
- 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
- 超级用户角色：root // 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
- 内部角色：__system

角色说明：
- Read：允许用户读取指定数据库
- readWrite：允许用户读写指定数据库
- dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
- userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
- clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
- readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
- readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
- userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
- dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
- root：只在admin数据库中可用。超级账号，超级权限


官方详情角色说明：https://docs.mongodb.com/manual/reference/built-in-roles/#built-in-roles

#### 启用认证

配置文件里 
```
auth=false #开启用户认证
```
重启服务

#### 测试

```
db.auth("root","yotta123")
```
返回1，测试成功

其他测试自己尝试

