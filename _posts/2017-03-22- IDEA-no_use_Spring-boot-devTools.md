---
layout: post
title: Intellij IDEA 使用Spring-boot-devTools无效解决办法
categories: [java,IDEA,html,Spring-boot]
description: 实验室的项目里用到的，跟商业公司合作，因此无法开源。。
keywords: java, idea
---


mooc中国的项目里用到了spring-boot，我提出并勇敢尝试的。由于在修改前端的时候，需要频繁的预览样式，但是又不能每次都重启，太慢了。于是查到了这个很有帮助的方法！

# 1 maven配置

##  1.1 maven 依赖
在pom.xml文件中，增加如下插件。
``` xml
 <!--devtools可以实现页面热部署（即页面修改后会立即生效，这个可以直接在application.properties文件中配置spring.thymeleaf.cache=false来实现），
                   实现类文件热部署（类文件修改后不会立即生效），实现对属性文件的热部署。
                   即devtools会监听classpath下的文件变动，并且会立即重启应用（发生在保存时机），注意：因为其采用的虚拟机机制，该项重启是很快的
                -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <optional>true</optional><!-- optional=true,依赖不会传递，该项目依赖devtools；之后依赖myboot项目的项目如果想要使用devtools，需要重新引入 -->
        </dependency>
```

## 1.2 maven 插件

在pom.xml文件中，增加如下插件。

``` xml
<build>
        <plugins>
            <!-- 用于将应用打成可直接运行的jar（该jar就是用于生产环境中的jar） 值得注意的是，如果没有引用spring-boot-starter-parent做parent，
               且采用了上述的第二种方式，这里也要做出相应的改动 -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <fork>true</fork><!-- 如果没有该项配置，肯呢个devtools不会起作用，即应用不会restart -->
                </configuration>
            </plugin>
            <!-- spring Boot在编译的时候，是有默认JDK版本的，如果我们期望使用我们要的JDK版本的话，那么要配置呢 -->
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

## eclipse OR IDEA
    如果你是eclipse开发，现在已经可以重启项目来使用了。但是，如果你是idea的话，请看第二步的设置！

# 2. IDEA 其他设置

## 2.1 在设置中打开自动编译

如图，在设置中打开即可。

![1.png](/db/idea/1.png) 

## 2.2 打开运行时编译

按快捷键 **Shift+Ctrl+Alt+/** ，选择 **Registry**

![2.png](/db/idea/2.png) 


勾选如图所示

![3.png](/db/idea/3.png) 

