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
如果不显示插件画面，可能是kuc版本不对  
注意kuc的真实版本
jspdf会有动态导入的问题，先不做

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

## tailwind
在config中使用了，在desktop还没使用，学习阶段。使用的话，需要使用tailwind:watch脚本去生成

