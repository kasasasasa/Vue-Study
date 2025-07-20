# Vue-Study
## Vue速通日记
### 官方文档：https://cn.vuejs.org
Vue开发的最大的特点就是其的响应式特性，只要在Vue中修改了数据，视图就会自动更新，可以更加专注于业务核心逻辑<br>
***
### Vue指令
带有v-前缀的特殊属性，不同属性对应不同的功能<br>
#### 常见命令：<br>
&middot; 动态设置元素innerHTML
```
v-html="表达式"
```
&middot; 控制css样式，适合频繁切换显示隐藏的场景
```
v-show="表达式"
```
&middot; 条件渲染：根据判断条件控制元素的创建和移除， 控制元素显示隐藏，表达式true显示，false隐藏
```
v-if="表达式"
v-else-if="表达式"
v-else
```
&middot; 事件注册：添加监听+提供处理逻辑
```
v-on:事件名="内联语句"
@事件名="内联语句"
v-on:事件名="methods中的函数名()"/@事件名="methods中的函数名()"
```
&middot; 动态设置html的标签属性
```
v-bind:属性名="内联语句"
:属性名="内联语句"
:class="对象/数组"
:style="样式对象"
```
&middot; 基于数据循环，多次渲染整个元素
```
v-for="(item,index) in 数组" //item 每一项,index 下标
v-for="item in 数组"//省略index
v-for="(item,index) in 数组" :key="唯一标识" //给列表项添加唯一标识，便于Vue进行列表项的正确排序复用
```
&middot; 给表单使用，双向数据绑定，可以快速获取和设置表单元素内容
```
v-model="变量"
```
#### 指令修饰符"."
指明一些指令后缀，不同后缀封装了不同的处理操作，目的是为了简化代码
&middot; 按键修饰符：键盘回车监听
```
@keyup.enter
```
&middot; v-model修饰符
```
v-model.trim//去除首尾空格
v-model.number//转数字
```
&middot; 事件修饰符
```
@事件名.stop//阻止冒泡
@事件名.prevent//组织默认行为
```
#### 计算属性
基于现有的数据，计算出来的新属性。依赖数据的变化，自动重新计算。<br>
声明在computed配置项(与data并列)中，一个计算属性对应一个函数<br>
使用起来和普通属性一样使用{{ 计算属性名 }} //没有括号<br>
与methods区别：计算属性会对计算出来的结果缓存，再次使用直接读取缓存，依赖项变化了，会自动重新计算，并再次缓存
```
computed:{
计算属性名(){
  基于现有数据，编写求值逻辑
  return 结果
```
#### watch侦听器（监视器）
监视数据变化，执行一些业务逻辑或异步操作
```
直接输入简单数据类型进行监视
deep:true //对复杂类型深度监视
immediate:true //初始化立刻执行一次handler方法
```
***
### 另：Element组件库官网：https://element.eleme.cn/#/zh-CN/component/menu
非常好的组件库使我成为专业cv工程师（）
### 安装element插件
```
yarn add element-ui -S
```
### axios官方文档：https://www.axios-http.cn/
### 启动项目命令(痛苦的开始)
调出终端然后输入
```
 yarn serve
```
### 自动修复格式命令
非常好用的,简直救我狗命
```
npx eslint --fix 文件路径
```
