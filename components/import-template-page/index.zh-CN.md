---
category: Components
subtitle: 导入详情页面
type: jlt-Components
cols: 1
title: importTemplatePage
---

router.js中配置路由

使用
{
   '/importTemplate': {
      component: dynamicWrapper(app, ['importBatchInfoList'], () =>
        import('jltd').ImportTemplatePage
      ),
    },
}