---
layout: post
title: swagger和jersey2.x构建JAVA自动化文档
categories: java restful
description: swagger是一个API文档框架, jersey是基于java的Restful API框架
keywords: swagger, jersey, 文档
---

# 背景
跟奥鹏公司合作，他们喜喜欢要各种各样的文档。讲道理是很合理的，但是学校可能不注重这个。说来也巧，恰好看到了swagger，巧妙的来了一发，完美解决了文档各种问题。


# Swagger 配置

### swagger core
用来和java代码进行集成，采用注释的方式，很方便，还能和spring集成。官网wiki在[swagger Core](https://github.com/swagger-api/swagger-core/wiki)。该项目感觉要停的感觉，因为以前官网主页还有位置，现在已经没有了。

### Swagger UI 
Use a Swagger specification to drive your API documentation.直接下载，官网很容易找到，放在Apache服务器下，比较简单，不做更多介绍。

# Jersey2.x 准备

### jar包准备
不要去jersey官网下载，直接使用swagger的官网提供的包，建议使用maven。最新版本（2016年）如下

```
        <!-- jersey+swagger RESTFUL API框架 -->
        <dependency>
            <groupId>io.swagger</groupId>
            <artifactId>swagger-jersey2-jaxrs</artifactId>
            <version>1.5.0</version>
        </dependency>
```
### 代码风格
使用[swagger Core](https://github.com/swagger-api/swagger-core/wiki)提供的方法，进行swagger的配置，里面讲的很清楚，不建议去其他博客看，版本不一致会有许多问题。


# 运行与调试
### swagger.json
运行web工程可以直接生成该文件。

举例：
- http://localhost:8080/工程名字/swagger.json 可以看到生成的json文件。该文件是swagger ui需要的文件
- http://localhost:8080/工程名字/swagger.yaml 另一种格式的文档文件 

### 运行
打开 swagger ui的主页，自己下载的主页，注意放在类似Apache服务器里进行操作。之后，输入上面的swagger.json文件，然后就可以看到相关的文档。

### 调试
很容易看懂，可以看到里面的api声容并茂！来一张快照如下。

![调试截图](/images/blog/swaggerjersey.png)

# 总结
希望swagger继续更新版本，将spring支持的很好。或者大家有spring的文档工具推荐，可以一起交流！