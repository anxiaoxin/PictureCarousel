# PictureCarousel
## 图片轮播插件
图片轮播，大家经常谈起的一个功能。这里首次尝试去写一个所谓的“插件”，基本思想是使使用者尽可能少的去写代码，只需写一些基本的HTML。这里展示的是两种轮播方式，一种是图片有叠加的，一种是无叠加的。测试是在最新个的Chrome环境下,[点击查看实际效果](https://anxiaoxin.github.io/project/picCarousel/)。

#### 无叠加轮播截图
![无叠加轮播截图](https://github.com/anxiaoxin/PictureCarousel/blob/master/src/img/%E6%97%A0%E5%8F%A0%E5%8A%A0%E6%88%AA%E5%9B%BE.jpg)


#### 有叠加截图
![无叠加轮播截图](https://github.com/anxiaoxin/PictureCarousel/blob/master/src/img/%E6%9C%89%E5%8F%A0%E5%8A%A0%E6%88%AA%E5%9B%BE.jpg)

#### 一些思考
本来想做成用户只需引用一下css和js就行，但是想到这是图片有关的操作。可能会涉及到图片加载方面的问题（用户对图片的加载进行自己的处理），所以还是写成了需要用户调用一个初始化函数。  
PS. 图片是命运石之门TV动画版的人物。虽然我是用了一个多小时看完24集动画的故事讲解，但依然觉得相当不错！
