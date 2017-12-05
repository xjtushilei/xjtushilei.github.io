---
layout: post
title: python的flask解决xss攻击漏洞
categories: [python, bug]
description: 项目有xss漏洞的问题，虽然我确认没有什么影响，但是安全部门还是说不行。
keywords: python-xss攻击, python, 漏洞, bug
---


> 版权声明：可以任意转载，转载时请标明文章[原始出处-xjtushilei](http://www.xjtushilei.com/2017/11/02/python-xss攻击/)和作者信息：[石磊](http://www.xjtushilei.com/about/)      


# xss漏洞解决

## 跨站脚本攻击的原理

XSS又叫CSS (Cross Site Script) ，跨站脚本攻击。它指的是恶意攻击者往Web页面里插入恶意脚本代码，而程序对于用户输入内容未过滤，当用户浏览该页之时，嵌入其中Web里面的脚本代码会被执行，从而达到恶意攻击用户的特殊目的。

跨站脚本攻击的危害：窃取cookie、放蠕虫、网站钓鱼 ...

跨站脚本攻击的分类主要有：存储型XSS、反射型XSS、DOM型XSS

 

XSS漏洞是Web应用程序中最常见的漏洞之一。如果您的站点没有预防XSS漏洞的固定方法，那么就存在XSS漏洞。这个利用XSS漏洞的病毒之所以具有重要意义是因为，通常难以看到XSS漏洞的威胁，而该病毒则将其发挥得淋漓尽致。


## 解决方案

由于我们在debug模式中，用户输入什么，就能返回什么，导致被认定为xss漏洞！TAT

于是乎，直接在request的参数里进行了html标签的去除。本来可更好一点，通过第三方包，但是运维对python容器制作很烦，于是我就用了正则表达式。TAT


# SQL注入漏洞

## SQL注入攻击的原理：

 
使用用户输入的参数拼凑SQL查询语句，使用户可以控制SQL查询语句

防御方法
- 使用预编译语句，
- 绑定变量
- 使用安全的存储过程
- 检查数据类型
- 使用安全函数

建议方法：不要使用拼接的sql，使用占位符,例如使用JdbcTemplate

## 解决方案

python的web开发环境真的不好，写个服务端都不能愉快的玩耍。自己实现了个简单的sql安全检测搞定了。