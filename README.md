# lzy-flow-chart

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lzy-flow-chart是一个流程图设计的demo。由于笔者觉得网上的一些流程图插件要不是需要收费，要不开源的很多满足不了大多开发者的需求设计，故自己开发了一个demo，并且对该demo就行开源。
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本项目的技术是umi+react+svg

### 实现了的功能：
1. 拖动节点，创建虚节点，进行移动
2. 拖动连线
3. 拖拽的时候出现对齐辅助线
4. 每个节点在距离小于5px的时候就会自动吸附对齐
————————————————————————————————————————————
#### 更新：
5. 实现删除节点（使用鼠标选中再按delete键删除）
6. 实现删除连线（使用鼠标选中再按delete键删除）

![](https://github.com/zhiyuan3458/lzy-flow-chart/blob/master/%E6%95%88%E6%9E%9C%E5%9B%BEgif/1.gif?raw=true)

![](https://github.com/zhiyuan3458/lzy-flow-chart/blob/master/%E6%95%88%E6%9E%9C%E5%9B%BEgif/2.gif?raw=true)

## 打开demo步骤
1. 先clone项目到本地
2. 执行npm i或者yarn
3. npm start或者yarn start
4. 浏览器中输入http://localhost:8002/lzy-flow-chart即可开始使用

## 文档
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暂无文档。现在在项目里的src/pages/flow-chart里面有一些笔者写的自己标注的注释，可以先参考着。之后相关文档笔者将会努力肛上，发布到笔者的博客csdn中（昵称：汁源）
<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本项目是使用umi项目搭建的，如果需要不想用umi的话，可以直接把项目中src/pages/flow-chart的目录复制到自己的项目中，然后配置一下路由即可
	   
## TODO LIST
#### 第二期将实现的功能：
1. ~~实现删除节点（使用鼠标选中再按delete键删除）~~
2. ~~实现删除连线（使用鼠标选中再按delete键删除）~~
3. 实现放大缩小编辑器，拖拽编辑器的功能
4. 优化界面的设计，优化代码

#### 第三期将实现的功能：
1. 实现碰撞检测，节点不准重叠功能（拖拽的时候如果重叠将会显示红色边框，释放鼠标后不会拖拽成功）
2. 可以修改节点中的信息
3. 有可能实现撤销重做功能（也有可能是第四期做）

#### 第四期将实现的功能：
1. 实现撤销重做功能

## 写在最后
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果大家对现在的设计或者代码优化有什么想法或者建议，欢迎各位在issue中向笔者灌水，笔者愿洗耳恭听。
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由于笔者时间上的问题，所以其实笔者希望能找到一位ui帮忙设计一下这个界面的。欢迎有志参与开源的项目帮忙帮忙一哈~~~

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 最后，希望各位觉得看完代码之后觉得有用的话，不妨可以高抬贵手，扫一下下面的码，给笔者一些小费~~~
 开发 + 写文档可不是一件容易的事情，不过笔者的初衷还是希望能开源一款大家都能用得上的demo出来给大家参考。

**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;卖个小广告：笔者也承接前端的各种项目噢，欢迎大家有项目的可以直接联系我的qq群:534775880或者扫下面的二维码，备注一下“前端接单”即可，笔者验证后将会通过加qq的请求**

<image width="30%" src="https://github.com/zhiyuan3458/lzy-flow-chart/blob/master/%E6%95%88%E6%9E%9C%E5%9B%BEgif/qq.jpg?raw=true" />

在未来的计划中，笔者还打算开一个qq群，方便大家在qq中向笔者灌水，大家也可以互相讨论技术问题**

<img width="300" src="https://www.showdoc.com.cn/server/api/attachment/visitfile/sign/6603543b05c29f6ea5b0cbe98c7bb7b8" />
        
<img width="300" src="https://www.showdoc.com.cn/server/api/attachment/visitfile/sign/04b5b74729ecf62f338faf3b90f32d10" />
