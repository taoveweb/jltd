---
category: Components
subtitle: 导入导出
type: self
cols: 1
title: importTemplate
---

router.js中配置路由

{
   '/import': {
      component: dynamicWrapper(app, ['importBatchInfoList'], () =>
        import('../routes/impexp/importBatchInfoList')
      ),
    },
    '/importTemplate': {
      component: dynamicWrapper(app, ['importTemplate'], () =>
        import('../routes/impexp/importTemplate')
      ),
    },
}