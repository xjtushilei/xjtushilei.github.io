---
layout: post
title: Spring-Cloud系列第3篇：spring-cloud-eureka-consumer
categories: [spring-boot,java,spring-cloud]
description: spring-cloud学习系列的第3篇，讲解spring-cloud-eureka-consumer 的故事，远程服务调用和及其负载均衡。
keywords: spring-boot,java,spring-eureka
---


> 自学spring-cloud系列，越来越感觉spring-cloud很强大！
>
>主要分为以下几篇：
> 1. [spring-cloud-config:分布式配置管理](http://www.xjtushilei.com/2017/06/12/spring-cloud-series-spring-cloud-config)
> 2. [spring-cloud-eureka:服务注册与发现](http://www.xjtushilei.com/2017/06/13/spring-cloud-series-spring-cloud-eureka)
> 3. [spring-cloud-eureka-consumer:远程服务调用和及其负载均衡](http://www.xjtushilei.com/2017/06/13/spring-cloud-series-spring-cloud-eureka-consumer)
> 4. [spring-cloud-Hystrix:熔断器保证服务高可用](http://www.xjtushilei.com/2017/06/13/spring-cloud-series-spring-cloud-Hystrix)
> 5. [spring-cloud-config-eureka-ribbon:分布式配置管理的高可用](http://www.xjtushilei.com/2017/06/13/spring-cloud-series-spring-cloud-config-eureka)
> 6. [spring-cloud-bus:配置信息的实时更新](http://www.xjtushilei.com/2017/06/14/spring-cloud-series-spring-cloud-bus)


# 介绍

spring-cloud-eureka，更加具体的内容，这里将会介绍远程服务调用和及其负载均衡。

我们将我们的服务注册在我们的服务中心里，那么如何去调用这些服务呢？我们可以用使用远程服务调用来解决，顺带还有方便的负载均衡功能。

# 如何使用

1. 创建服务中心
2. 注册几个被调用服务
3. 注册一个consumer
4. 测试consumer与负载均衡

## 1. 创建服务中心

上一篇文章，我们已经学会了使用单机或者集群的方式来创建服务中心，这里我们使用简单的单机方式来创建！



在 `spring-cloud-eureka-server` 里启动采用这个profile文件：
```yml
server:
  port: 8761

spring:
  application:
    name: eureka-server

eureka:
  instance:
    lease-expiration-duration-in-seconds: 6
    lease-renewal-interval-in-seconds: 2
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```
这个是单机版的。并将自己注册到了服务里。

## 2. 注册几个被调用服务

我们启动了这三个profile文件。

![注册几个被调用服务](/images/blog/spring-clouds/3.png)

配置文件中，`server.port` 分别是 8083,8084,8085，其他参数完全一致！同时，我们在controller中设置了这样一个rest服务。
```java
    @Value("${server.port}")
    String port;

    @RequestMapping("/hi")
    public String hi() {
        return port+" 端口为您服务！";
    }
```
这样方便知道我们具体调用了哪个服务。


## 3. 注册一个consumer


需要额外的依赖，使用了feign来进行远程调用。


pom.xml ： 
```xml
        <!--远程调用-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-feign</artifactId>
        </dependency>
```

创建一个接口：

```java
@Component
@FeignClient(name = "eureka-client-1")
public interface HelloRemoteInterface {

    @RequestMapping(value = "/hi")
    public String hi();
}
```
这里的name就是你的那个服务的application.name。根据名字来调用，才能实现负载均衡嘛。

使用接口，创建一个测试的controller：

```java
@RestController
public class ConsumerController {

    @Autowired
    HelloRemoteInterface helloRemoteInterface;

    @RequestMapping("/hello")
    public String hello() {
        return helloRemoteInterface.hi();
    }
}
```



同时，将我们的这个服务也注册到服务中心。

配置文件：

```yml
server:
  port: 8086

spring:
  application:
    name: eureka-consumer

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

启动方法：
```java
@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class SpringCloudEurekaConsumerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringCloudEurekaConsumerApplication.class, args);
    }
}
```


![已经启动的的服务](/images/blog/spring-clouds/5.png)

到这里，我们已经启动了好多个服务，如上图所示，在IDEA中，采用不同的profile来启动的方式，有一个单机的server，三个普通的服务（端口号不一样），还有我们的消费服务，下一节，你可以从截图中看的更明白。

## 4. 测试consumer与负载均衡

到上一步为止，我们已经可以看到在Eureka的dashboard中已经有了好多个服务，如下图，主要包括：
- 一个服务注册server
- 一个消费者，用来进行远程调用
- 三个普通的client（其端口不一样，来模拟分布式）

![server中的服务](/images/blog/spring-clouds/4.png)

这时候，我们调用我们的consumer服务，浏览器里输入 `http://localhost:8086/hello`

得到的结果是不一样的，一共有三个：
- 8083 端口为您服务！
- 8084 端口为您服务！
- 8085 端口为您服务！

正好就是我们想要的结果。


不断的进行测试下去会发现3种结果交替出现，说明服务中心自动提供了服务均衡负载的功能。如果我们将服务提供者的数量在提高为N个，测试结果一样，请求会自动轮询到每个服务端来处理。


# 示例源码
所有源码在我的github仓库里，传送门：[https://github.com/xjtushilei/spring-cloud-simples.git](https://github.com/xjtushilei/spring-cloud-simples.git)

# 支持

如果你喜欢~

扫一扫！

<img src="/images/微信支付.JPG" width="50%" /><img src="/images/支付宝支付.JPG" width="50%" />


