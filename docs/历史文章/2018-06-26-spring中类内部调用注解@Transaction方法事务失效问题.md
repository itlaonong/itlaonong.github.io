---
title: spring中类内部调用注解@Transaction方法事务失效问题
date: 2018-06-26 10:14:32
category: Java
tags:
  - Spring
  - Transaction
permalink: /pages/42cc38/
categories:
  - 历史文章
author:
  name: itlaonong
  link: https://github.com/itlaonong
---

# 写在前面

在最近的工作用 dubbo 修改发布 restful 协议的时候，遇到一个问题，dubbo 内部写的是 service，控制事务的时候，直接写了一个方法 B，把 A 方法需要事务的内容放在里面。类似下面代码的方式进行调用，结果是事务无效。

<!-- more -->

```java
@Service("testService")
public TestServiceImpl implments TestService{

    /**
     * 对外的接口方法
     */
    public String A(){

        ...

        this.B();
        ...


    }

    @Transactional
    private String B(){
        ... ...
    }

}

```

# 原因

查找一下资料和别人的经历，了解到，spring 的 aop 事务是通过代理实现的，而上面的代码 A 方法中直接调用 B 方法是内部直接调用。不会触发 spring 的代理机制，而是直接调用。所以事务无效。

# 解决方法

## 1.直接注入法

想到既然直接调用没有效果，那么像注入 Dao 一样，将 Service 自己注入到自己里面，在通过引用进行调用不就好了。

示例代码如下。

```java
@Service("testService")
public TestServiceImpl implments TestService{

    @Autowired
    private TestService testService;

    /**
     * 对外的接口方法
     */
    public String A(){

        ...

        testService.B();
        ...


    }

    @Transactional
    private String B(){
        ... ...
    }

}
```

实测这样的方式，事务是有效的。但是也会引起其他的一些问题（目前我的项目里面没有出现，网上有相关的讨论）。问题就是，这样的代码会造成对象引用的无限递归。据说在 springboot 中会出问题。

## 2. 工具获取法

还有就是使用 SpringUtil 等工具动态获取 self 对象后调用方法。

```java
@Service("testService")
public TestServiceImpl implments TestService{

    /**
     * 对外的接口方法
     */
    public String A(){

        ...
        TestService testService = SpringUtil.getBean("testService", TestService.class);
        testService.B();
        ...


    }

    @Transactional
    private String B(){
        ... ...
    }

}
```

# 最后

其实应该尽量避免这种方式的事务模式。实在没办法，还是建议使用第二种方式处理。
