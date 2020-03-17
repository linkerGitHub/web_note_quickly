# web note quickly，网页快速笔记，chrome扩展
一个侧边栏笔记区，记录笔记和笔记在页面的响应位置的chrome扩展。
当你不想打开onenote之类的东西时，这是一个用于在网页上快速记录的工具...
## 目前功能
 1. 如果不清理存储空间（localstorage），您所做的笔记将保存在浏览器中。
 2. 该扩展名将记住笔记的域名，相应的站点显示相应的笔记。
 3. 只有单击浏览器窗口右下角的按钮，它才会展开，可以收起。
 4. 扩展名记录了您做笔记的y位置，因此，当笔记的y位置在窗口的视口中时，笔记项目将正常显示，否则，将显示为迷你朴素类型。
 5. 窗口视口中的y位置有一个加载条，它显示视口中笔记的大致y位置。
 6. markdown可用，你可以使用markdwon样式制作笔记，也可以将照片或地址链接拖动到编辑区域。

 ## TODO
-[ ] 导出笔记
-[ ] 所有笔记节点的树形显示
-[ ] 支持SPA页面
-[ ] 手动设定URL处理方法

## 基于
1. 使用[vue-chrome-extension-boilerplate](https://github.com/mubaidr/vue-chrome-extension-boilerplate)为模版创建
2. 使用[element-ui](https://github.com/ElemeFE/element)构建

## 细节
1. 存储位置：chrome扩展localstorage
2. 打包后大小：0.5MB

## 图样
后续再补...


## run
```shell script
# development mode
npm run dev
# build(production) mode
npm run build
# pack to zip
npm run zip
```
you can checkout the `scripts` block of `package.json` for more detail

## license
Apache 2.0

