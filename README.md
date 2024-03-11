## 步骤
1.首次打包
kintone-plugin-packer plugin
2.重命名ppk文件为private.ppk
3.注意配置的kuc和安装的kuc版本能对上 common/index.ts

## 开发
方式1: 自动编译，打包，上传
确认manifest.json中js的地址为js/desktop.js类,而不是本地地址
pnpm run start

方式2: 已经上传好插件后，只希望修改js，不需要重新打包，上传
打开go live
确认js地址为https://127.0.0.1:5500/plugin/js/desktop.js
先使用方式1上传插件后，停止pnpm run start,改为pnpm run develop
修改js后，刷新页面即可

## 生产
修改plugin.json中的js地址  例：js/desktop.js  
pnpm run build
插件最终生成在dist下

## 问题
1.如果不显示插件画面，可能是kuc版本不对  
2.注意kuc的真实版本
3.jspdf会有动态导入的问题，先不做
4.想在插件中设置token，然后调用中间服务器，并且通过流式返回。但是这种proxy方式，不适合使用流式返回。因为流式返回需要服务端转发之后，也使用流式返回。所以这种方式不适合。
所以首先需要流式返回请求的，不适合放在插件中。只能直接在前端调用。前端调用时，如果使用了中间服务器，并且带上自定义的access token的话，无法隐藏access token（可以伪造）。如果不带的话，中间服务器可以在服务端限定访问的来源，但无法进行鉴权。

## 文件解析功能
用bun快速实现了一个文件解析的服务，文件解析需要先启动该服务：fileparse

## stream流，逐字输出的总结
使用两个useEffect，一个是页面加载后直接加载数据，一个是监听数据变化就直接输出数据。
使用队列解决等待全部chunk加载完再输出的问题
使用函数式更新等办法解决逐字输出可能导致的多字，少字的问题（因为状态更新是异步的）
具体：  
函数式更新是React中的一个特性，它允许你传递一个函数到setState，这个函数接收先前的状态作为参数，并返回新的状态。这个特性在处理可能会引起竞态条件的异步操作时非常有用。
在你的情况下，processQueue函数中的setMessageQueue和setWords都是异步的，这意味着它们可能不会立即更新状态。因此，如果你在状态更新后立即访问状态，可能会得到旧的状态值。
通过使用函数式更新，你可以确保你总是在最新的状态上操作。当你传递一个函数到setState时，React会确保这个函数在应用状态更新时运行，这样你就可以得到最新的状态值。
同时流式访问的问题在问题4中列出。

## tailwind
在config中使用了，在desktop还没使用，学习阶段。使用的话，需要使用tailwind:watch脚本去生成

## 注意
本例只是demo，部分llm请求都是从本地发出的，实际上应该走服务器中间件进行中转。不然会暴露access token。只是为了演示，所以简化了部分。其中附件分析这块是走服务端转发的。

## 演示
1 function calling功能
发送微信
显示地图/导航
发送邮件
解析附件

2 json mode功能
生成模拟数据

json mode功能对比function calling功能
列表页添加模拟数据。通过json mode，指定了json返回，并且通过提示词约束数据的格式。对比function calling，json mode适合固定单一的功能，只需要结构化数据。
而function calling适用于多种功能合集，动态调用接口。

