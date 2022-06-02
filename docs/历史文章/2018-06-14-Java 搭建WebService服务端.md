---
title: Java 搭建WebService服务端
date: 2018-06-14 16:59:52
category: Java
tags:
  - Java
  - WebService
permalink: /pages/489ea2/
categories:
  - 历史文章
author:
  name: itlaonong
  link: https://github.com/itlaonong
---

# 写在前面

之前在工作中遇到了和其他公司系统对接问题，对方提供的 WebService 接口，通过对接工作对 WebService 有了一定的了解。

现在公司也有微服务项目，主要使用的是 dubbo，并定制化的加入了 restful 协议（详见当当网开源的 dubbox）。WebService 主要还是在一些老项目中使用，最近在进行一个老项目的重构改造工作，其中给其他项目提供的 WebService 接口要一并重写。要求呢，调用方直接修改接口地址即可。

<!-- more -->

# Java 开发 WebService 服务端

## xfire

查看项目老代码，老代码使用的是 xfire 搭建的 WebService 服务。基于要和原有服务保持一致的想法，准备使用 xfire。

在项目中加入 xfire 依赖和相应配置，启动一直报错。百度发现，是因为 xfire 已经很久没更新，当时的 spring 是 2.x ，现在我们使用的 spring 是 4.x。等于说这 2 个不兼容。遂决定放弃，另求他法。因此 xfire 方式就不细写了。有兴趣百度教程有很多。

## cxf

cxf 是 Apache 的项目，相比于 xfire 来说是一直在更新的，网上教程也很多。我主要借鉴的是[https://blog.csdn.net/khsay/article/details/78054741](https://blog.csdn.net/khsay/article/details/78054741)。因为我是在原有项目中搭建的。文中只提取了 WebService 部分，可能会有错误。有问题可以与我讨论，或者查看我借鉴的这篇文章。

### 项目添加依赖

我们项目用的是 gradle 作为构建工具

```groovy
compile group: 'org.apache.cxf', name: 'cxf-rt-frontend-jaxws', version: '3.2.4'
compile group: 'org.apache.cxf', name: 'cxf-rt-transports-http', version: '3.2.4'
compile group: 'org.apache.cxf', name: 'cxf-rt-ws-security', version: '3.2.4'
```

### 创建接口和实现类

接口类

```java
package io.github.loanon.webservice.api;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface DemoService {

    @WebMethod
    String callService(String xmlStr);

}
```

实现类

```java
package io.github.loanon.webservice.api.impl;

import javax.jws.WebService;
import org.springframework.stereotype.Service;
import io.github.loanon.webservice.api.DemoService

@Service("demoService")
@WebService(targetNamespace = "https://services.webServices.loanon.github.io", serviceName = "demoService")
public class DemoServiceImpl implements DemoService {

    @Override
    public String callService(String xmlStr) {
        //TODO your code
        return "";
    }
}
```

### XML 配置

添加 spring-cxf.xml 并在 spring 的 applicationContext.xml 中引入

applicationContext.xml

```xml
<!-- webService -->
<import resource="classpath:spring-config/spring.cxf.xml"/>
```

spring-cxf.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:cxf="http://cxf.apache.org/core"
       xmlns:jaxws="http://cxf.apache.org/jaxws"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://cxf.apache.org/jaxws http://cxf.apache.org/schemas/jaxws.xsd
        http://cxf.apache.org/core http://cxf.apache.org/schemas/core.xsd">

    <!--发布服务-->
    <jaxws:endpoint id="DemoService" implementor="io.github.loanon.webservice.api.impl.DemoServiceImpl" address="/demoService">
    </jaxws:endpoint>

    <cxf:bus>
        <cxf:features>
            <cxf:logging/>
        </cxf:features>
    </cxf:bus>

</beans>
```

在 web.xml 中加入 cxf 的 Servlet。

```xml
<!--cxf -->
<servlet>
    <servlet-name>cxf</servlet-name>
    <servlet-class>org.apache.cxf.transport.servlet.CXFServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>cxf</servlet-name>
    <url-pattern>/ws/*</url-pattern>
</servlet-mapping>
```

### 验证

浏览器访问`http://localhost:8080/demo/ws/demoService?wsdl`，如果没有意外，可以看到 wsdl 信息。

# 写在最后

前面说到要保持和原有项目平滑过渡。就是说对于调用方只需要改一下地址，不用改代码就可以直接调用新服务。所以尽量和原有服务在协议上保持一致，目前看到的时候请求报文中会有方法名，所以只将方法名保持一致。当然这个有待测试。只有等联调结果，才能确定。

soapUI 中 WebService 的请求报文。

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:api="http://api.webservice.loanon.github.io/">
    <soapenv:Header/>
    <soapenv:Body>
         <!-- 这个节点有方法名信息 -->
        <api:callService>
            <!--Optional:-->
            <arg0>?</arg0>
        </api:callService>
    </soapenv:Body>
</soapenv:Envelope>
```
