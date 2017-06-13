---
layout: post
title: Spring-Cloud系列第1篇：spring-cloud-config
categories: [spring-boot,java,spring-cloud]
description: spring-cloud学习系列的第1篇，讲解spring-cloud-config的故事，创建配置管理服务器及实现分布式配置管理应用。
keywords: spring-boot,java,spring-cloud
---


> 自学spring-cloud系列，越来越感觉spring-cloud很强大！
>
>主要分为以下几篇：
> 1. [spring-cloud-config:分布式配置管理](http://www.xjtushilei.com/2017/06/12/spring-cloud-series-spring-cloud-config)
> 2. [spring-cloud-eureka:服务注册与发现](http://www.xjtushilei.com/2017/06/13/spring-cloud-series-spring-cloud-eureka)
> 3. [spring-cloud-eureka-consumer:远程服务调用和及其负载均衡](http://www.xjtushilei.com/2017/06/13/spring-cloud-series-spring-cloud-eureka-consumer)
> 4. [spring-cloud-Hystrix:熔断器保证服务高可用](http://www.xjtushilei.com/2017/06/13/spring-cloud-series-spring-cloud-Hystrix)


# 介绍

创建配置管理服务器及实现分布式配置管理应用，实现统一配置管理。

提供三种方式：
- 基于git
- 基于svn（淘汰）
- 基于本地文件（测试使用）

# 如何使用

- 创建server端
- 创建client端
## 1. 创建server端

让你的分布式的应用可以取到配置。服务端很简单，只需要配置你的配置文件位于哪里就行了。

pom.xml:
```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
```

当然了，我已经在全局加入了一些其他配置文件，因为我使用了模块式的开发，所以这里很简单。

配置文件:

```properties
spring.application.name=config-server

server.port=8888
spring.cloud.config.server.git.uri=file:///${user.home}/config-repo

```
一般端口都是8888，可以随意设置，git这里我采用了本地git，方便测试。如果是远程的话，肯定是私有的内部公开的，可以使用用户名和密码登录。官网查看最新的配置文件即可。

启动：
```java
@SpringBootApplication
@EnableConfigServer
public class SpringCloudConfigServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringCloudConfigServerApplication.class, args);
    }
}
```
在启动文件里，加入这样一句话就好啦。



## 2. 创建client端

当然了，也很简单。

pom.xml:
```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
```

配置文件：
```properties
spring.application.name=appname1
server.port=8082
spring.profiles.active=dev
spring.cloud.config.profile=dev
spring.cloud.config.uri=http://localhost:8888/
```

这里主要就是你的服务端在哪里。`spring.application.name` 和 `spring.cloud.config.profile` 决定了会去远程git里取哪一个git文件。`spring.profiles.active`决定了使用哪个版本。


其实，这里就是你的拥有一大堆逻辑代码的那个应用。所以这里可以用各种各样的配置文件。当然了，我们推荐你全部都配置在远程端。不然以后修改或者临时需求修改很麻烦。

使用配置：

```java
@Value("${foo}")
String foo;
```
这是我使用了自己的配置的方法，如果是spring自己的话，比如数据库配置的datasource等，会直接使用。

# 示例源码
所有源码在我的github仓库里，传送门：[https://github.com/xjtushilei/spring-cloud-simples.git](https://github.com/xjtushilei/spring-cloud-simples.git)

# 支持

如果你喜欢~

扫一扫！

<img src="/images/微信支付.JPG" width="50%" /><img src="/images/支付宝支付.JPG" width="50%" />


