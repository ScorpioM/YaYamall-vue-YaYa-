<p align="center">
 <h1> <img width="45px" src="/src/assets/img/readme/logo.png">
YaYa医师</h1>

</p>

<p align="center">  
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://travis-ci.org/PanJiaChen/vue-element-admin" rel="nofollow">
    <img src="https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master" alt="Build Status">
  </a>
</p>

简体中文 | [English](README.en.md)

# 如果觉得还行,请给一个👉 star,谢谢😎 ! 有疑问请加群。

## 简介 

### 这是一款基于 vue.js 开发的医药商城系统，是我的本科毕业设计项目。

下面是效果演示图：

![演示图](/src/assets/img/readme/)

YaYa医师组件效果图：
![YaYa医师登录页](/src/assets/img/readme/login.jpg)

![YaYa医师首页](/src/assets/img/readme/index.jpg)

![YaYa医师药品专区](/src/assets/img/readme/yaoping.jpg)

YaYa医师组件效果图：

![YaYa医师器械专区](/src/assets/img/readme/qixie.jpg)

![YaYa医师病痛百科](/src/assets/img/readme/baike.jpg)

![YaYa医师个人中心](/src/assets/img/readme/person.jpg)

![YaYa医师商品详情](/src/assets/img/readme/details.jpg)

## 项目来由

```
YaYa医师是本人，，，，
```

***

#### 如何安装

* 使用 `npm` 安装

  ``` bash
  npm install vue-mchat
  ```
##### 使用

在`main.js`中引入

  ``` bash
  # npm 下载方式
  // 进入css
  import 'MChat/lib/MChat.css'
  //引入组件
  import MChat from 'MChat'
  // 使用vue加载组件
  Vue.use(MChat)
  # 
  ```

#### 如何进行二次开发

##### 方案一：

直接将 `pacages` 文件夹复制到你需要的项目，在 `main.js` 中引入 `vue-mchat`:

```JavaScript
import App from './App.vue'
import MChat from '../packages/index'

Vue.use(MChat)
```

##### 方案二：

在 `vue-mchat` 的基础上进行开发，通过打包成js库引入：

在 `vue-mchat` 目录下执行：

```bash
npm run lib 
```

可获得 `lib` 文件其中包含 `MChat` 的编译文件库，将 `lib` 整个复制到项目里，在 `main.js` 中引入:

```JavaScript
import  '../lib/MChat.css'
import MChat from '../lib/MChat.umd'

Vue.use(MChat)
```

## 🌰 加群获得群聊版本代码

[群聊演示地址](http://www.julymeteor.com/im/)
[文档-示例](http://www.julymeteor.com/chat/)

## QQ交流群

![共同进步](/src/assets/img/readme/qunzu.jpg)

## Browsers support

Modern browsers and Internet Explorer 10+.

| ![IE](/doc/img/icon/ie10.png)</br>IE / Edge | ![Firefox](/doc/img/icon/Firefox.png)</br>Firefox | ![Chrome](/doc/img/icon/Chrome.png)</br>Chrome | ![](/doc/img/icon/Safari.png)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions



Copyright (c) 2020-present ScorpioM
