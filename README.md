## 文件结构

```
|——dist # 编译后的待发布目录
|——public # 公共资源目录
|——src # 源码目录
|--└——api # RestFul 接口定义目录
|--└——assets # 项目所需资源文件，如：图片、样式、字体
|--└——components # 公用的UI组件
|--└——environments # 项目的全局配置目录
|--└——└——.env.dev # development配置文件
|--└——└——.env.prod # production配置文件
|--└——routes # 路由配置及页面对应的 VUE 文件
|--└——store # vuex 数据目录
|--└——utils # 通用 utils 目录
|--└——App.vue # 项目入口 VUE 文件
|--└——main.ts # 项目入口 typescript 文件
|--└——shims.d.ts # 类型、模块声明文件
|——test # 测试文件目录
|——.browserslistrc # browsers 配置文件
|——.gitignore # gitignore 配置文件
|——.prettierrc # prettier 配置文件
|——babel.config.js # babel 配置文件
|——dll.config.js # dll 配置文件
|——package.json # npm 配置文件
|——postcss.config.js # postcss 配置文件
|——tsconfig.json # typescript 配置文件
|——tslint.json # tslint 配置文件
|——yarn.lock # yarn 依赖包信息文件
```

## 运行步骤

1. yarn
2. yarn run serve

## 构建步骤

1. yarn run build
