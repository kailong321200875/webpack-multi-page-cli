# webpack-multiPage-cli

## 介绍

这是一套基于webpack4的多页脚手架，其实起初只是想在网上找一套符合自己口味的多页脚手架，花费了挺长时间都没找到满意的。后面想想，那就自己撸一套出来吧，然后这套脚手架就诞生了，各方面都很符合自己的尿性，也借鉴了许多大佬的意见和想法。

## 使用场景

当你知道你不需要vue、react这种框架的时候，你就可以选择它。
当你不知道要不要用vue、react这种框架的时候，你还是可以选择它。
(纯属多余的废话。。。)

就我个人而言，起初撸出这套脚手架出来，其实就是为了做一些小型的项目，不需要依赖vue, react这种大型框架的项目，比如官网，活动页啥的。

## 功能

`webpack-multiPage-cli` 目前处于比较初阶的版本，对于我自己而言，其实以下所实现的功能已经够用了。

```
- 区分开发环境和生产环境

- 动态创建 文件夹以及里面文件 npm run c 文件夹名

- 支持全局引入JQuery，无需单独引入

- 支持图片相对路径引入

- 支持字体图标

- 支持视频、音频播放

- 支持全局css样式以及全局scss变量，具体可以查看 build/webpack.rules.config.js

- 支持ESlint

- 支持移动端适配，px转vw
```

## 目录结构

```
├── build                      # webpack相关
│   │── build.js               # 打包文件
│   │── create.js              # 动态创建文件目录
│   │── webpack.base.conf.js   # 公共webpack配置
│   │── webpack.dev.conf.js    # 开发环境配置
│   │── webpack.prod.conf.js   # 生产环境配置
│   └── webpack.rules.conf.js  # 规则配置
├── src                        # 源代码
│   ├── assets                 # 图片 视频 音频 字体等资源
│   ├── styles                 # 全局样式文件夹
│   ├── utils                  # 工具类
│   └── views                  # views 所有页面
├── .eslintrc.js               # eslint 配置项
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

## 安装

方式一：

```
git clone https://github.com/kailong321200875/webpack-multiPage-cli.git
```

方式二：

全局安装脚手架

```
npm install -g webpack4-cli

webpack4 init
```

```
# 安装依赖
npm install

# 启动项目
npm run dev

# 动态创建页面
npm run c 页面名称


# ESlnit修复
npm run lint

# 打包
npm run build
```
