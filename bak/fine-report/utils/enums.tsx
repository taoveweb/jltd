// const getSelectOptionData = (enumList) => {
//   return enumList.map(item => {
//     return {
//       item[]
//     }
//   })
// }

const keys = (enumList:any) => {
  return enumList.map((item:any) => {
    return item.key;
  });
};

const getValue = (enumList:any, key:any) => {
  let selectValue = null;
  enumList.some((item:any) => {
    if (item.key !== key) {
      return false;
    }

    selectValue = item.value;
    return true;
  });

  return selectValue;
};

const getKey = (enumList:any, value:any) => {
  let selectKey = null;
  enumList.some((item:any) => {
    if (item.value !== value) {
      return false;
    }

    selectKey = item.key;
    return true;
  });

  return selectKey;
};
// 发票类型
const InvoiceState = [
  { key: 10, value: '增值税专用发票' },
  { key: 20, value: '普通发票' },
];
const EnumEnableState = [
  {
    key: 1,
    value: '启用',
  },
  {
    key: 0,
    value: '停用',
  },
];
const NewsState = [
  {
    key: 'Y',
    value: '已发布',
  },
  {
    key: 'N',
    value: '未发布',
  },
];
const PublishState = [
  {
    key: 1,
    value: '已发布',
  },
  {
    key: 0,
    value: '未发布',
  },
];
const IsTenant = [
  {
    key: 1,
    value: '租户',
  },
  {
    key: 0,
    value: '平台',
  },
];
const TopState = [
  {
    key: '1',
    value: '是',
  },
  {
    key: '0',
    value: '否',
  },
];
const YNEnum = [
  {
    key: 'Y',
    value: '是',
  },
  {
    key: 'N',
    value: '否',
  },
];
const OneTwoEnum = [
  {
    key: '1',
    value: '是',
  },
  {
    key: '2',
    value: '否',
  },
];

const waybillScanTypeEnum = [
  {
    key: '01',
    value: '内部运单号',
  },
  {
    key: '02',
    value: '外部运单号',
  },
  {
    key: '03',
    value: '内部订单号',
  },
  {
    key: '04',
    value: '外部订单号',
  },

  {
    key: '05',
    value: '内部派车单号',
  },
  {
    key: '06',
    value: '外部派车单号',
  },
];

const skuBatchesEnum = [
  {
    key: '10',
    value: '批次号',
  },
  {
    key: '20',
    value: '生产日期',
  },
  {
    key: '30',
    value: '合同号',
  },
  {
    key: '40',
    value: 'CIQ',
  },

  {
    key: '50',
    value: '商品状态',
  },
];

const stateEnum = [
  {
    key: '01',
    value: '新增',
  },
  {
    key: '02',
    value: '启用',
  },
  {
    key: '03',
    value: '停用',
  },
];

const templateTypeEnum = [
  {
    key: '1',
    value: 'EXCEL导出模板',
  },
  {
    key: '2',
    value: 'EXCEL导入模板',
  },
];

const moduleEnum = [
  {
    key: '1',
    value: '承运订单',
  },
  {
    key: '2',
    value: '报价管理',
  },
];

const HandleStatus = [
  { key: '1', value: '未处理' },
  { key: '2', value: '已处理' },
  { key: '3', value: '拒绝' },
];

const DemonstrationEnum = [
  { key: '01', value: '未处理' },
  { key: '02', value: '已处理' },
  { key: '03', value: '拒绝' },
];
const TemplateStatus = [
  { key: '承运订单', value: '承运订单' },
  { key: '报价管理', value: '报价管理' },
  { key: '发货订单', value: '发货订单' },
  { key: '运单管理', value: '运单管理' },
  { key: '网点管理', value: '网点管理' },
  { key: '出库单', value: '出库单' },
  { key: '快递单号', value: '快递单号' },
  { key: '商品SKU管理', value: '商品SKU管理' },
  { key: '收发货方', value: '收发货方' },
  { key: '车源管理', value: '车源管理' },
  { key: '我的司机', value: '我的司机' },
  { key: '我的车辆', value: '我的车辆' },
  { key: '货源管理', value: '货源管理' },
  { key: '物流产品', value: '物流产品' },
  { key: '供应商管理', value: '供应商管理' },
  { key: '设备管理', value: '设备管理' },
  { key: '运单统计', value: '运单统计' },
  { key: '司机列表', value: '司机列表' },
  { key: '设备列表', value: '设备列表' },
  { key: '仓库列表', value: '仓库列表' },
  { key: '车辆列表', value: '车辆列表' },
  { key: '采购订单', value: '采购订单' },
  { key: '收货确认', value: '收货确认' },
  { key: '代采购订单', value: '代采购订单' },
  { key: '销售订单', value: '销售订单' },
  { key: '应收费用', value: '应收费用' },
  { key: '应付费用', value: '应付费用' },
  { key: '商品预警', value: '商品预警' },
  { key: '库存预警', value: '库存预警' },
  { key: '商品预警', value: '商品预警' },
  { key: '库存预警', value: '库存预警' },
  { key: '入库管理', value: '入库管理' },
  { key: '库存管理', value: '库存管理' },
  { key: '商品检疫报告', value: '商品检疫报告' },
  { key: '仓库温度预报警', value: '仓库温度预报警' },
  { key: '仓库湿度预报警', value: '仓库湿度预报警' },
  { key: '监控预报警统计', value: '监控预报警统计' },
  { key: '滞销品库存汇总', value: '滞销品库存汇总' },
  { key: '供应商交货统计', value: '供应商交货统计' },
  { key: '供应商交货统计', value: '供应商交货统计' },
  { key: '物流配送信息汇总', value: '物流配送信息汇总' },
  { key: '库存预警报表', value: '库存预警报表' },
  { key: '出库记录', value: '出库记录' },
  { key: '供应商交货统计', value: '供应商交货统计' },
  { key: '滞销品库存汇总（货主）', value: '滞销品库存汇总（货主）' },
  { key: '滞销品库存汇总(承运商)', value: '滞销品库存汇总(承运商)' },
  { key: '账号对账统计', value: '账号对账统计' },
  { key: '短信对账统计', value: '短信对账统计' },
  { key: '订单对账统计', value: '订单对账统计' },
  { key: '订单对账明细报表', value: '订单对账明细报表' },
  { key: '物流配送信息汇总', value: '物流配送信息汇总' },
  { key: '库存详情', value: '库存详情' },
  { key: '签收执行统计', value: '签收执行统计' },
  { key: '司机执行统计', value: '司机执行统计' },
  { key: '司机月度统计', value: '司机月度统计' },
  { key: '库存详情（按仓库）', value: '库存详情（按仓库）' },
  { key: '库存详情（按仓储商）', value: '库存详情（按仓储商）' },
  { key: '出库详情', value: '出库详情' },
  { key: '承运商月度统计', value: '承运商月度统计' },
  { key: '承运商月度统计详情', value: '承运商月度统计详情' },
  { key: '物流商司机执行统计', value: '物流商司机执行统计' },
  { key: '在途统计（按接驳点）', value: '在途统计（按接驳点）' },
  { key: '在途统计（按车辆）', value: '在途统计（按车辆）' },
  { key: '司机月度统计详情', value: '司机月度统计详情' },
  { key: '费用导入', value: '费用导入' },
  { key: '物流订单', value: '物流订单' },
  { key: '商品SKU管理', value: '商品SKU管理' },
  { key: '商品共享', value: '商品共享' },
  { key: '物流订单', value: '物流订单' },
  { key: '采购订单导入并生成物流订单', value: '采购订单导入并生成物流订单' },
  { key: '供应商管理', value: '供应商管理' },
  { key: '运单导出', value: '运单导出' },
  { key: '商品查询报表', value: '商品查询报表' },
  { key: '历史库存详情', value: '历史库存详情' },
  { key: '线路资源导入', value: '线路资源导入' },
  { key: '订单完成率统计', value: '订单完成率统计' },
  { key: '商品入库记录（货主）', value: '商品入库记录（货主）' },
  { key: '商品入库记录详情（货主）', value: '商品入库记录详情（货主）' },
  { key: '商品出库记录（货主）', value: '商品出库记录（货主）' },
  { key: '商品出库记录详情（货主）', value: '商品出库记录详情（货主）' },
  { key: '库存查询（按商品明细）', value: '库存查询（按商品明细）' },
  { key: '库存查询（按仓库）', value: '库存查询（按仓库）' },
  { key: '商品库存批次列表(按仓库)', value: '商品库存批次列表(按仓库)' },
  { key: '库存查询（按物流商）', value: '库存查询（按物流商）' },
  {
    key: '商品库存批次列表（按物流商）',
    value: '商品库存批次列表（按物流商）',
  },
  { key: '承运订单对账统计', value: '承运订单对账统计' },
  { key: '承运订单对账明细报表', value: '承运订单对账明细报表' },
  { key: '运单导入', value: '运单导入' },
  { key: '应收费用管理', value: '应收费用管理' },
  { key: '应付费用管理', value: '应付费用管理' },
  { key: '出库差异值统计', value: '出库差异值统计' },
  { key: '入库差异量统计', value: '入库差异量统计' },
  { key: '代采购订单', value: '代采购订单' },
  { key: '证照提醒', value: '证照提醒' },
  { key: '吉林国药费用管理', value: '吉林国药费用管理' },
  { key: '我的线路资源导入', value: '我的线路资源导入' },
  { key: '库存报告', value: '库存报告' },
  { key: '物流订单导入（运输出库）', value: '物流订单导入（运输出库）' },
  { key: '物流订单导入（运输入库）', value: '物流订单导入（运输入库）' },
  { key: '物流订单导入（运输订单）', value: '物流订单导入（运输订单）' },
  { key: '物流订单导入（出库订单）', value: '物流订单导入（出库订单）' },
  { key: '物流订单导入（入库订单）', value: '物流订单导入（入库订单）' },
  { key: '订单预报警', value: '订单预报警' },
  { key: '开票资料', value: '开票资料' },
  { key: '送货报表导出', value: '送货报表导出' },
  { key: '转出出库单导出', value: '转出出库单导出' },
  { key: '费用明细导出', value: '费用明细导出' },
  { key: '实收量', value: '实收量' },
  { key: '转出入库单导出', value: '转出入库单导出' },
  { key: '效期预警导出', value: '效期预警导出' },
  { key: '效期预警设置导入', value: '效期预警设置导入' },
  { key: '应收费用导出', value: '应收费用导出' },
  { key: '应付费用导出', value: '应付费用导出' },
  { key: '检验检疫报告查询', value: '检验检疫报告查询' },
  { key: '包装规格导出', value: '包装规格导出' },
  { key: '包装规格导入', value: '包装规格导入' },
  { key: '收发货人', value: '收发货人' },
  { key: '收发货方', value: '收发货方' },
  { key: '司机配送统计', value: '司机配送统计' },
  { key: '每日自运配送统计', value: '每日自运配送统计' },
  { key: '国药吉林费用明细', value: '国药吉林费用明细' },
  { key: '我接收的物流单（运输订单）', value: '我接收的物流单（运输订单）' },
  { key: '我收到的商品SKU', value: '我收到的商品SKU' },
  { key: '导出我的预出', value: '导出我的预出' },
  { key: '导出我收到的预出', value: '导出我收到的预出' },
  { key: '导出我的预收', value: '导出我的预收' },
  { key: '导出我收到的预收', value: '导出我收到的预收' },
  { key: '货主-运输订单', value: '货主-运输订单' },
  { key: '货主-入库订单', value: '货主-入库订单' },
  { key: '货主-出库订单', value: '货主-出库订单' },
  { key: '货主-运输入库订单', value: '货主-运输入库订单' },
  { key: '货主-运输出库订单', value: '货主-运输出库订单' },
  { key: '物流商-入库订单', value: '物流商-入库订单' },
  { key: '物流商-出库订单', value: '物流商-出库订单' },
  { key: '物流商-运输入库订单', value: '物流商-运输入库订单' },
  { key: '物流商-运输订单', value: '物流商-运输订单' },
  { key: '物流商-运输出库订单', value: '物流商-运输出库订单' },
  { key: '运单导入', value: '运单导入' },
  {
    key: '承运商物流订单导入（运输出库）',
    value: '承运商物流订单导入（运输出库）',
  },
  {
    key: '承运商物流订单导入（出库订单）',
    value: '承运商物流订单导入（出库订单）',
  },
  {
    key: '承运商物流订单导入（运输入库）',
    value: '承运商物流订单导入（运输入库）',
  },
  {
    key: '承运商物流订单导入（入库订单）',
    value: '承运商物流订单导入（入库订单）',
  },
  {
    key: '承运商物流订单导入（运输订单）',
    value: '承运商物流订单导入（运输订单）',
  },
  { key: '货主导入（运输出库）', value: '货主导入（运输出库）' },
  { key: '货主导入（出库订单）', value: '货主导入（出库订单）' },
  { key: '货主导入（运输订单）', value: '货主导入（运输订单）' },
  { key: '货主导入（运输入库）', value: '货主导入（运输入库）' },
  { key: '货主导入（入库订单）', value: '货主导入（入库订单）' },
  { key: '仓库设备温湿度数据', value: '仓库设备温湿度数据' },
  { key: '移动设备温湿度数据', value: '移动设备温湿度数据' },
  { key: '我收到待确认账单明细', value: '我收到待确认账单明细' },
  { key: '收发货方', value: '收发货方' },
  { key: '收发货方联系人', value: '收发货方联系人' },
  { key: '收发货方', value: '收发货方' },
  { key: '我收到的商品SKU包装规格', value: '我收到的商品SKU包装规格' },
  { key: '我收到的商品SKU基本信息', value: '我收到的商品SKU基本信息' },
  { key: '我的商品SKU基本信息', value: '我的商品SKU基本信息' },
  { key: '我的商品SKU包装规格', value: '我的商品SKU包装规格' },
  { key: '运输订单执行统计', value: '运输订单执行统计' },
  { key: '运输执行统计', value: '运输执行统计' },
  { key: '应收应付订单费用', value: '应收应付订单费用' },
  { key: '应收应付运输费用', value: '应收应付运输费用' },
  { key: '运输报警统计', value: '运输报警统计' },
  { key: '运单温湿度', value: '运单温湿度' },
  { key: '我接收的物流单（运输出库）', value: '我接收的物流单（运输出库）' },
  { key: '我接收的物流单（运输入库）', value: '我接收的物流单（运输入库）' },
  { key: '我接收的物流单（出库订单）', value: '我接收的物流单（出库订单）' },
  { key: '我接收的物流单（入库订单）', value: '我接收的物流单（入库订单）' },
  { key: '企业经营范围', value: '企业经营范围' },
  { key: '企业证照', value: '企业证照' },
  { key: '费用名称导出', value: '费用名称导出' },
  { key: '费用名称', value: '费用名称' },
  { key: '委托协议', value: '委托协议' },
  { key: '商品证照', value: '商品证照' },
  { key: '批号档案导出', value: '批号档案导出' },
  { key: '管控字段配置', value: '管控字段配置' },
  { key: '批次档案查询', value: '批次档案查询' },
  { key: '采购渠道导出', value: '采购渠道导出' },
  { key: '基础数据包装规格', value: '基础数据包装规格' },
  { key: '基础数据包装规格导出', value: '基础数据包装规格导出' },
  { key: '中央库存查询', value: '中央库存查询' },
  { key: '商品未入库单据', value: '商品未入库单据' },
  { key: '商品未出库单据', value: '商品未出库单据' },
  { key: '销售占用单据', value: '销售占用单据' },
  { key: '企业仓别', value: '企业仓别' },
  { key: '商品通路', value: '商品通路' },
  { key: '仓间通路导出', value: '仓间通路导出' },
  { key: '订单跟踪-订单查询导出', value: '订单跟踪-订单查询导出' },
  { key: '库存差异报告', value: '库存差异报告' },
  { key: '库存差异报告查询', value: '库存差异报告查询' },
  { key: '车辆管理', value: '车辆管理' },
  { key: '司机管理', value: '司机管理' },
  { key: '订单异常', value: '订单异常' },
  { key: '车辆设备', value: '车辆设备' },
  { key: '仓库设备', value: '仓库设备' },
  { key: '仓库设备导出', value: '仓库设备导出' },
  { key: '开票信息', value: '开票信息' },
  { key: '开票信息导出', value: '开票信息导出' },
  { key: '收发货方管理', value: '收发货方管理' },
  { key: '收发货方管理(物流协同)', value: '收发货方管理(物流协同)' },
  { key: '费用明细', value: '费用明细' },
  { key: '用户活跃度报表', value: '用户活跃度报表' },
  { key: '我的派车单', value: '我的派车单' },
  { key: '车辆使用记录', value: '车辆使用记录' },
  { key: '我接收的物流单', value: '我接收的物流单' },
  { key: '物流单查询列表', value: '物流单查询列表' },
  { key: '质量库存清单', value: '质量库存清单' },
  { key: '不合格药品记录', value: '不合格药品记录' },
  { key: '药品出库复核记录', value: '药品出库复核记录' },
  { key: '药品养护记录', value: '药品养护记录' },
  { key: '药品验收记录', value: '药品验收记录' },
  { key: '药品收货记录', value: '药品收货记录' },
  { key: '采购订单', value: '采购订单' },
  { key: '导入并生成物流订单', value: '导入并生成物流订单' },
  { key: '代采购订单', value: '代采购订单' },
  { key: '销售订单', value: '销售订单' },
  { key: '报价管理', value: '报价管理' },
  { key: '库存预警', value: '库存预警' },
  { key: '库存预警', value: '库存预警' },
  { key: '应收应付订单费用', value: '应收应付订单费用' },
  { key: '费用明细', value: '费用明细' },
  { key: '应收应付运输派车费用', value: '应收应付运输派车费用' },
  { key: '仓库管理导出', value: '仓库管理导出' },
  { key: '仓库管理导入', value: '仓库管理导入' },
  { key: '商品基本信息', value: '商品基本信息' },
  { key: '商品包装信息', value: '商品包装信息' },
  { key: '商品运输信息', value: '商品运输信息' },
  { key: '商品仓储信息', value: '商品仓储信息' },
  { key: '商品医药信息', value: '商品医药信息' },
  { key: '出库管理', value: '出库管理' },
  { key: '入库记录', value: '入库记录' },
  { key: '入库详情', value: '入库详情' },
  { key: '开票信息', value: '开票信息' },
  { key: '费用名称', value: '费用名称' },
  { key: '运单管理', value: '运单管理' },
  { key: '运单跟踪', value: '运单跟踪' },
  { key: '委外单跟踪', value: '委外单跟踪' },
  { key: '承运商月度统计', value: '承运商月度统计' },
  { key: '运单历史记录导出', value: '运单历史记录导出' },
];

const NotifyTypeEnum = [
  { key: 'AbnormalTransitJL', value: '吉林在途异常反馈' },
  { key: 'AsnSynch', value: 'wms仓储入库同步' },
  { key: 'AuctionFeedback', value: '货源竞价接口' },
  { key: 'BussinessExpFb', value: '业务处理反馈接口' },
  { key: 'CarLoadingJL', value: '吉林装车信息' },
  { key: 'Complaint', value: '56N投诉接口' },
  { key: 'DipperSynch', value: '北斗GPS同步' },
  { key: 'dispatchReceive', value: '派车单' },
  { key: 'DispatchWayBill', value: '康城调度单下发接口' },
  { key: 'Evaluate', value: '56N评价接口' },
  { key: 'FeedBackInfoRecv', value: '润阳路由反馈接口' },
  { key: 'FileSynch', value: 'wms仓储附件同步' },
  { key: 'GenerateToken', value: '获取令牌' },
  { key: 'GoodsAndFreezersJL', value: '国药吉林货物与冷藏箱关系接收' },
  { key: 'GoodsAndFreezersJL56N', value: '货物与冷藏箱关系接收接口' },
  { key: 'GoodsOrder', value: '货源订单接入接口' },
  { key: 'GoodsPublish', value: '货源发布接口' },
  { key: 'InspectionQuarantine', value: 'wms仓储检验检疫报告' },
  { key: 'InventorySynch', value: 'wms库存同步' },
  { key: 'JieYiPosition', value: '捷依温度数据接口' },
  { key: 'LineSynchronizationJL', value: '国药吉林路线接收' },
  { key: 'LinkToPosition', value: '宁图获取位置信息接口' },
  { key: 'LoadingCarJL', value: '吉林用车反馈' },
  { key: 'LogisticOrderCancelCheck', value: '56N订单取消校验接口' },
  { key: 'LogisticsAbnormalTransit', value: '56N在途异常' },
  { key: 'LogisticsAbnormalTransitFeedback', value: '在途异常确认反馈' },
  { key: 'LogisticsLineSynchronization', value: '56N线路同步' },
  { key: 'LogisticsLoadingCar', value: '56N用车确认' },
  { key: 'LogisticsReturnCar', value: '56N交车确认' },
  { key: 'LogisticsWaybillSign', value: '56N运单签收' },
  { key: 'lybyun', value: '百度鹰眼上传GPS接口' },
  { key: 'lybyunHistory', value: '百度鹰眼获取GSP接口' },
  { key: 'lybyunMobile', value: '百度鹰眼上传MOBILEGPS接口' },
  { key: 'MobileInfornation', value: '56N手机定位' },
  { key: 'OfficeSynch', value: '承运当同步接口' },
  { key: 'OrderCancelCarrier', value: '56N订单取消接口' },
  { key: 'OrderCancelFeedback', value: '取消反馈' },
  { key: 'OrderCancelJL', value: '国药吉林订单取消' },
  { key: 'OrderDispatch', value: '56N运单接收' },
  { key: 'OrderFeedback', value: '润阳下单反馈接口' },
  { key: 'OrderRecv', value: '润阳订单接收' },
  { key: 'OrderStatusFb', value: '订单状态反馈接口' },
  { key: 'OrderToCarrier', value: '56N订单下发接口' },
  { key: 'OrderToCarrierOnTime', value: '56N订单实时下发接口' },
  { key: 'PlatCancelWayBill', value: '康城调度单取消接口' },
  { key: 'PlatRoute', value: '56N运单路由' },
  { key: 'PlatWayBillOrder', value: '通化福彬 56N运单下发接口' },
  { key: 'PlatWayBillOrder1', value: '56N运单下发接口' },
  { key: 'PlatWayBillOrderJob', value: '56N运单下发接口定时器' },
  { key: 'ReceiptConfirmation', value: '56N收货确认接口' },
  { key: 'ReceiptDetail', value: 'wms仓储收货明细' },
  { key: 'ReceiptJL', value: '吉林回单' },
  { key: 'RecvTemperatureInfo', value: '国药湖南GPS' },
  { key: 'ReportWayBill', value: '上报运单' },
  { key: 'ReturnCarJL', value: '吉林交车反馈' },
  { key: 'RouteJL', value: '吉林路由' },
  { key: 'RyOrderCancel', value: '润阳订单取消' },
  { key: 'RyOrderCancelFeedback', value: '润阳取消反馈接口' },
  { key: 'ShipmentFeedbackHN', value: '湖南国药装车反馈' },
  { key: 'SignExceptionFeedbackHN', value: '湖南国药异常签收反馈' },
  { key: 'SignExceptionJL', value: '吉林异常签收' },
  { key: 'SignFeedbackHN', value: '湖南国药签收反馈' },
  { key: 'SignJL', value: '吉林签收' },
  { key: 'StockOutFeedback', value: '仓储出库记录' },
  { key: 'UnsOrderWayBillFb', value: '运单反馈接口' },
  { key: 'VehicleGpsTempInfo', value: 'GPS温湿度接口' },
  { key: 'WaybillFeedback', value: '运单路由反馈接口' },
  { key: 'WayBillSentOut', value: 'WMS运单下发接口' },
  { key: 'WaybillSynch', value: '国药湖南运单查询接口' },
];

const BussinessTypeEnum = [
  { key: 'AbnormalTransitJL', value: '吉林在途异常反馈' },
  { key: 'AsnSynch', value: 'wms仓储入库同步' },
  { key: 'AuctionFeedback', value: '货源竞价接口' },
  { key: 'BussinessExpFb', value: '业务处理反馈接口' },
  { key: 'CarLoadingJL', value: '吉林装车信息' },
  { key: 'Complaint', value: '56N投诉接口' },
  { key: 'DipperSynch', value: '北斗GPS同步' },
  { key: 'dispatchReceive', value: '派车单' },
  { key: 'DispatchWayBill', value: '康城调度单下发接口' },
  { key: 'Evaluate', value: '56N评价接口' },
  { key: 'FeedBackInfoRecv', value: '润阳路由反馈接口' },
  { key: 'FileSynch', value: 'wms仓储附件同步' },
  { key: 'GenerateToken', value: '获取令牌' },
  { key: 'GoodsAndFreezersJL', value: '国药吉林货物与冷藏箱关系接收' },
  { key: 'GoodsAndFreezersJL56N', value: '货物与冷藏箱关系接收接口' },
  { key: 'GoodsOrder', value: '货源订单接入接口' },
  { key: 'GoodsPublish', value: '货源发布接口' },
  { key: 'InspectionQuarantine', value: 'wms仓储检验检疫报告' },
  { key: 'InventorySynch', value: 'wms库存同步' },
  { key: 'JieYiPosition', value: '捷依温度数据接口' },
  { key: 'LineSynchronizationJL', value: '国药吉林路线接收' },
  { key: 'LinkToPosition', value: '宁图获取位置信息接口' },
  { key: 'LoadingCarJL', value: '吉林用车反馈' },
  { key: 'LogisticOrderCancelCheck', value: '56N订单取消校验接口' },
  { key: 'LogisticsAbnormalTransit', value: '56N在途异常' },
  { key: 'LogisticsAbnormalTransitFeedback', value: '在途异常确认反馈' },
  { key: 'LogisticsLineSynchronization', value: '56N线路同步' },
  { key: 'LogisticsLoadingCar', value: '56N用车确认' },
  { key: 'LogisticsReturnCar', value: '56N交车确认' },
  { key: 'LogisticsWaybillSign', value: '56N运单签收' },
  { key: 'lybyun', value: '百度鹰眼上传GPS接口' },
  { key: 'lybyunHistory', value: '百度鹰眼获取GSP接口' },
  { key: 'lybyunMobile', value: '百度鹰眼上传MOBILEGPS接口' },
  { key: 'MobileInfornation', value: '56N手机定位' },
  { key: 'OfficeSynch', value: '承运当同步接口' },
  { key: 'OrderCancelCarrier', value: '56N订单取消接口' },
  { key: 'OrderCancelFeedback', value: '取消反馈' },
  { key: 'OrderCancelJL', value: '国药吉林订单取消' },
  { key: 'OrderDispatch', value: '56N运单接收' },
  { key: 'OrderFeedback', value: '润阳下单反馈接口' },
  { key: 'OrderRecv', value: '润阳订单接收' },
  { key: 'OrderStatusFb', value: '订单状态反馈接口' },
  { key: 'OrderToCarrier', value: '56N订单下发接口' },
  { key: 'OrderToCarrierOnTime', value: '56N订单实时下发接口' },
  { key: 'PlatCancelWayBill', value: '康城调度单取消接口' },
  { key: 'PlatRoute', value: '56N运单路由' },
  { key: 'PlatWayBillOrder', value: '通化福彬 56N运单下发接口' },
  { key: 'PlatWayBillOrder1', value: '56N运单下发接口' },
  { key: 'PlatWayBillOrderJob', value: '56N运单下发接口定时器' },
  { key: 'ReceiptConfirmation', value: '56N收货确认接口' },
  { key: 'ReceiptDetail', value: 'wms仓储收货明细' },
  { key: 'ReceiptJL', value: '吉林回单' },
  { key: 'RecvTemperatureInfo', value: '国药湖南GPS' },
  { key: 'ReportWayBill', value: '上报运单' },
  { key: 'ReturnCarJL', value: '吉林交车反馈' },
  { key: 'RouteJL', value: '吉林路由' },
  { key: 'RyOrderCancel', value: '润阳订单取消' },
  { key: 'RyOrderCancelFeedback', value: '润阳取消反馈接口' },
  { key: 'ShipmentFeedbackHN', value: '湖南国药装车反馈' },
  { key: 'SignExceptionFeedbackHN', value: '湖南国药异常签收反馈' },
  { key: 'SignExceptionJL', value: '吉林异常签收' },
  { key: 'SignFeedbackHN', value: '湖南国药签收反馈' },
  { key: 'SignJL', value: '吉林签收' },
  { key: 'StockOutFeedback', value: '仓储出库记录' },
  { key: 'UnsOrderWayBillFb', value: '运单反馈接口' },
  { key: 'VehicleGpsTempInfo', value: 'GPS温湿度接口' },
  { key: 'WaybillFeedback', value: '运单路由反馈接口' },
  { key: 'WayBillSentOut', value: 'WMS运单下发接口' },
  { key: 'WaybillSynch', value: '国药湖南运单查询接口' },
];

// let message = '';
// NotifyTypeEnum.forEach(item => {
//   message += `{ key: '${item.value}', value: '${item.value}' },`;
// });
// console.log(message);
// debugger;

const LogType = [
  { key: '0', value: '登录' },
  { key: '1', value: '新增' },
  { key: '2', value: '修改' },
  { key: '3', value: '删除' },
  { key: '4', value: '导入' },
  { key: '5', value: '导出' },
];
const ProcessingState = [
  { key: '0', value: '系统异常' },
  { key: '1', value: '单据接入异常' },
  { key: '2', value: '车辆资质异常' },
  { key: '3', value: '车辆入网异常' },
  { key: '4', value: '车辆定位异常' },
  { key: '4', value: '车辆资质异常' },
];
const ErrorState = [
  { key: '0', value: '已处理' },
  { key: '1', value: '未处理' },
];
const State = [
  { key: '1', value: '已处理' },
  { key: '0', value: '待处理' },
  { key: null, value: '待处理' },
];
const StatusEnum = [
  { key: '10', value: '预览' },
  { key: '20', value: '提交成功' },
  { key: '30', value: '提交失败' },
];
const templateType = [
  {
    key: '1',
    value: 'EXCEL导出模板',
  },
  {
    key: '2',
    value: 'EXCEL导入模板',
  },
];

const OrderStateEnum = [
  {
    key: '10',
    value: '创建',
  },
  {
    key: '20',
    value: '提交',
  },
  {
    key: '30',
    value: '部分调度',
  },
  {
    key: '40',
    value: '完全调度',
  },
  {
    key: '50',
    value: '部分装车',
  },
  {
    key: '60',
    value: '完全装车',
  },
  {
    key: '70',
    value: '部分签收',
  },
  {
    key: '80',
    value: '完全签收',
  },
  {
    key: '90',
    value: '拒绝',
  },
  {
    key: '100',
    value: '取消',
  },
];

const Enums = [
  { key: '-1', value: '失败' },
  { key: '2', value: '重发处理中' },
  { key: '1', value: '正常' },
  { key: '0', value: '异常' },
];
const ReportStatue = [
  { key: '0', value: '已上报' },
  { key: '1', value: '未上报' },
];

const CycleEnum = [
  { key: 'year', value: '年' },
  { key: 'quarter', value: '季度' },
  { key: 'month', value: '月' },
  { key: 'week', value: '周' },
];
const AppTypeEnum = [
  { key: '01', value: '司机版-Android' },
  { key: '02', value: '司机版-IOS' },
  { key: '03', value: '货主版-Android' },
  { key: '04', value: '货主版-IOS' },
];

const upEnum = [{ key: '01', value: '普通' }, { key: '02', value: '强制' }];

export default {
  keys,
  getValue,
  getKey,
  InvoiceState,
  skuBatchesEnum, // 批次属性
  waybillScanTypeEnum, // 运单扫描单号类型
  EnumEnableState,
  YNEnum,
  OneTwoEnum,
  stateEnum, // 新增 启用 停用
  templateTypeEnum, // 模板类型
  moduleEnum, // 所属模块
  NewsState, // 新闻状态  发布 未发布
  PublishState,//发布状态 发布 未发布
  IsTenant,//是否租户
  TopState, // 置顶状态
  HandleStatus, // 处理状态
  DemonstrationEnum, // 预约演示管理
  TemplateStatus, // 前台日志 所属模板
  LogType, // 后台日志 日志类型
  ProcessingState, // 异常管理 处理状态
  ErrorState,
  StatusEnum,
  templateType,
  Enums,
  State,
  OrderStateEnum,
  ReportStatue,
  CycleEnum,
  upEnum,
  AppTypeEnum,
  NotifyTypeEnum,
  BussinessTypeEnum,
};
