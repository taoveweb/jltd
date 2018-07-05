const Enum = {
  DEFAULT_PAGE_NUMBER: 1,
  DEFAULT_PAGE_SIZE: 10,
  BTN_TYPE: [
    {
      text: "primary",
      value: "primary"
    },
    {
      text: "Default",
      value: ""
    }
  ],
  storageCondition: [
    { text: "冷藏", value: 10 },
    { text: "冷冻", value: 20 },
    { text: "常温", value: 30 },
    { text: "保暖", value: 40 },
    { text: "遮光", value: 50 },
    { text: "密封", value: 60 },
    { text: "严封或熔封", value: 70 },
    { text: "阴凉处", value: 80 },
    { text: "凉暗处", value: 90 }
  ],
  // 性别
  sex: [
    {
      text: "男",
      value: "1"
    },
    {
      text: "女",
      value: "2"
    }
  ],
  // 订单类型
  orderType: [
    { text: "运输出库", value: "1" },
    { text: "运输入库", value: "2" },
    { text: "运输订单", value: "3" },
    { text: "出库订单", value: "4" },
    { text: "入库订单", value: "5" }
  ],
  // 状态
  importStatus: [
    { text: "等待导入", value: "10" },
    { text: "等待校验", value: "20" },
    { text: "等待提交", value: "30" },
    { text: "提交成功", value: "40" }
  ],
  type: [
    {
      text: "收货方",
      value: "0"
    },
    {
      text: "发货方",
      value: "1"
    },
    {
      text: "收发货方",
      value: "2"
    }
  ],
  isConsignor: [
    {
      text: "是",
      value: 1
    },
    {
      text: "否",
      value: 0
    }
  ],
  isConsignee: [
    {
      text: "是",
      value: 1
    },
    {
      text: "否",
      value: 0
    }
  ],
  isWh: [
    {
      text: "是",
      value: 1
    },
    {
      text: "否",
      value: 0
    }
  ],
  nature: [
    { text: "自有", value: "1" },
    { text: "合同", value: "2" },
    { text: "外协", value: "3" }
  ],
  driverLicenseType: [
    { text: "A1", value: "1" },
    { text: "A2", value: "2" },
    { text: "A3", value: "3" },
    { text: "B1", value: "4" }
  ],
  status: [{ text: "是", value: "Y" }, { text: "否", value: "N" }],
  industry: [
    { text: "餐饮", value: "10" },
    { text: "食品", value: "140" },
    { text: "医药", value: "40" },
    { text: "其他", value: "00" }
  ],
  transportCondition: [
    { text: "常温", value: 10 },
    { text: "超低温", value: 20 },
    { text: "冷鲜", value: 30 },
    { text: "冷藏", value: 40 },
    { text: "冷冻", value: 50 },
    { text: "冰温", value: 60 }
  ],
  yesOrNo: [
    {
      text: "是",
      value: "Y"
    },
    {
      text: "否",
      value: "N"
    }
  ],
  packType: [
    {
      text: "包装货",
      value: "10"
    },
    {
      text: "散货",
      value: "20"
    }
  ],
  isBalanceObject: [
    {
      text: "否",
      value: "0"
    },
    {
      text: "是",
      value: "1"
    }
  ],
  SdiDeviceType: [
    {
      text: "温度记录装置",
      value: "1"
    },
    {
      text: "制冷系统",
      value: "2"
    },
    {
      text: "存储及相关设备",
      value: "3"
    },
    {
      text: "冷库用门组及库板工程",
      value: "4"
    },
    {
      text: "冷链物流月台设备设施",
      value: "5"
    },
    {
      text: "搬运设备",
      value: "6"
    },
    {
      text: "物流容器",
      value: "7"
    },
    {
      text: "分拣设备",
      value: "8"
    }
  ],
  DeviceType: [
    {
      text: "温度记录装置",
      value: "1"
    },
    {
      text: "制冷系统",
      value: "2"
    },
    {
      text: "存储及相关设备",
      value: "3"
    },
    {
      text: "冷库用门组及库板工程",
      value: "4"
    },
    {
      text: "冷链物流月台设备设施",
      value: "5"
    },
    {
      text: "搬运设备",
      value: "6"
    },
    {
      text: "物流容器",
      value: "7"
    },
    {
      text: "分拣设备",
      value: "8"
    }
  ],
  business_industry: [
    { text: "餐饮", value: "10" },
    { text: "食品", value: "30" },
    { text: "医药", value: "20" },
    { text: "物流", value: "40" }
  ],
  
  manufacturer: [
    {
      text: "温度记录装置",
      value: "1"
    },
    {
      text: "制冷系统",
      value: "2"
    },
    {
      text: "存储及相关设备",
      value: "3"
    },
    {
      text: "冷库用门组及库板工程",
      value: "4"
    },
    {
      text: "冷链物流月台设备设施",
      value: "5"
    },
    {
      text: "搬运设备",
      value: "6"
    },
    {
      text: "物流容器",
      value: "7"
    },
    {
      text: "分拣设备",
      value: "8"
    }
  ],
  equipmentStatus: [
    {
      text: "启用",
      value: "1"
    },
    {
      text: "停用",
      value: "0"
    }
  ],
  equipmentType: [
    {
      text: "温度记录装置",
      value: "1"
    },
    {
      text: "制冷系统",
      value: "2"
    },
    {
      text: "存储及相关设备",
      value: "3"
    },
    {
      text: "冷库用门组及库板工程",
      value: "4"
    },
    {
      text: "冷链物流月台设备设施",
      value: "5"
    },
    {
      text: "搬运设备",
      value: "6"
    },
    {
      text: "物流容器",
      value: "7"
    },
    {
      text: "分拣设备",
      value: "8"
    }
  ],
  supplierName: [
    {
      text: "温度记录装置",
      value: "1"
    },
    {
      text: "制冷系统",
      value: "2"
    },
    {
      text: "存储及相关设备",
      value: "3"
    },
    {
      text: "冷库用门组及库板工程",
      value: "4"
    },
    {
      text: "冷链物流月台设备设施",
      value: "5"
    },
    {
      text: "搬运设备",
      value: "6"
    },
    {
      text: "物流容器",
      value: "7"
    },
    {
      text: "分拣设备",
      value: "8"
    }
  ],
  // 车载设备
  isCarDevice: [
    {
      text: "是",
      value: "0"
    },
    {
      text: "否",
      value: "1"
    }
  ],
  carTypeName: [
    {
      text: "冷藏车",
      value: "0"
    },
    {
      text: "常温车",
      value: "1"
    }
  ],
  SdiSdiProducer: [
    {
      text: "温度记录装置",
      value: "1"
    },
    {
      text: "制冷系统",
      value: "2"
    },
    {
      text: "存储及相关设备",
      value: "3"
    },
    {
      text: "冷库用门组及库板工程",
      value: "4"
    },
    {
      text: "冷链物流月台设备设施",
      value: "5"
    },
    {
      text: "搬运设备",
      value: "6"
    },
    {
      text: "物流容器",
      value: "7"
    },
    {
      text: "分拣设备",
      value: "8"
    }
  ],
  SdiDeviceStatus: [
    {
      text: "启用",
      value: "1"
    },
    {
      text: "停用",
      value: "0"
    }
  ],
  IS_MINUNIT: [
    {
      text: "是",
      value: "Y"
    },
    {
      text: "否",
      value: "N"
    }
  ],
  // 仓库的仓库类型
  WarehouseWwWhType: [
    { label: "恒温库", value: "10" },
    { label: "冷藏库", value: "20" },
    { label: "冷冻库", value: "30" }
  ],
  // 供应商类型
  wsTypeEn: [
    { label: "源头", value: "1" },
    { label: "物流", value: "2" },
    { label: "结算", value: "3" }
  ],
  // 物流商类型
  subType: [
    { label: "运输", value: "21" },
    { label: "仓储", value: "22" },
    { label: "仓配", value: "23" }
  ],
  /**
   * 行内编辑
   */
  EDIT_TYPE_LINE: "LINE",
  /**
   * 操作编辑
   */
  EDIT_TYPE_OPERATE: "OPERATE",
  /**
   * 默认新增的单位信息，最小单位"否"
   */
  IS_MINUNIT_DEFAULT: "N",
  /**
   * 最小单位"是"
   */
  IS_MINUNIT_YES: "Y",
  DATE_FORMAT: "YYYY-MM-DD",
  /**
   * 车辆所属
   */
  CAR_ATTACH: "CAR_ATTACH",
  /**
   * 车辆类型
   */
  VEHICLE_TYPE: "VEHICLE_TYPE",
  /**
   * 双人运输方式
   */
  DOU_TRANSPORT_VM: "DOU_TRANSPORT_VM",
  /**
   * 车长
   */
  VEHICLE_LENGTH: "VEHICLE_LENGTH",
  /**
   * 燃料类型
   */
  FUEL_TYPE: "FUEL_TYPE",
  /**
   * 设备类型
   */
  DEVICE_TYPE: "DEVICE_TYPE",
  /**
   * 厂商
   */
  DEVICE_PRODUCER: "DEVICE_PRODUCER",
  /**
   * 人员性质
   */
  PERSON_NATURE: "PERSON_NATURE",
  /**
   * 性别
   */
  GENDER: "GENDER",
  /**
   * 驾驶证类型
   */
  DRIVING_TYPE: "DRIVING_TYPE",
  // 是结算对象
  IS_SETTLEMENT: "1",
  // 包装类型
  PACK_TYPE: "PACK_TYPE",
  // 行业分类
  INDUSTRY_CLASSFIFY: "INDUSTRY_CLASSFIFY",
  // 运输要求
  TRANSPORT_CONDITION: "TRANSPORT_CONDITION",
  // 贮藏要求
  STORAGE_CONDITION: "STORAGE_CONDITION",
  // 效期单位
  SHELF_LIFE_UNIT: "SHELF_LIFE_UNIT",
  // 养护需求
  MAINTAIN_LEVEL: "MAINTAIN_LEVEL",
  // 药品类型
  DRUG_TYPE: "DRUG_TYPE",
  // 药品属性
  DRUG_ATTRIBUTE: "DRUG_ATTRIBUTE",
  MEDICINE_DRUG_TYPE: "MEDICINE_DRUG_TYPE",
  /**
   * 类型（网点覆盖）
   */
  TYPE_BRANCH_CONVER: "TYPE_BRANCH_CONVER",
  /**
   * 干线
   */
  MAIN_LINE: "10",
  /**
   * 层级
   */
  HIERARCHY: "HIERARCHY",
  /**
   * 默认提示
   */
  DEFAULT_PLACEHOLDER: "请输入",
  /**
   * 默认提示
   */
  DEFAULT_SELECT_PLACEHOLDER: "请选择",
  // 经营行业
  BUSINESS_INDUSTRY: "BUSINESS_INDUSTRY",
  /**
   * 启用
   */
  ENABLE_STATUS: "1",
  /**
   * 禁用
   */
  DISABLE_STATUS: "0",
  /**
   * 是否最小单位
   */
  DATACATIONRY_IS_MINUNIT: "IS_MINUNIT",
  /**
   * 行内编辑保存提示
   */
  PLEASE_SAVE_INFO_MSG: "请先保存信息",
  IS_WH: "IS_WH",
  // 剂型
  DRUG_FORM: "DRUG_FORM",
  /**
   * 司机状态启用
   */
  DRIVER_ENABLE_STATUS: "Y",
  /**
   * 司机状态禁用
   */
  DRIVER_DISABLE_STATUS: "N",
  /**
   *是否默认
   */
  IS_DEFAULT: "IS_DEFAULT",
  /**
   *是否默认 :否
   */
  IS_DEFAULT_STATUS_N: "N",
  /**
   *是否默认 :是
   */
  IS_DEFAULT_STATUS_Y: "Y",
  /**
   *开通系统用户
   */
  IS_OPEN_SYSTEM_USER: "IS_OPEN_SYSTEM_USER",
  // 默认药品属性
  DRUG_ATTRIBUTE_DEFAULT: "10",
  // 默认药品类型属性
  DRUG_TYPE_DEFAULT: "10",
  // 默认车辆所属属性（车辆列表）
  CAR_ATTACH_DEFAULT: "01",
  // 默认车辆类型属性（车辆列表）
  VEHICLE_TYPE_DFAULT: "51",
  // 默认燃料类型属性（车辆列表）
  FUEL_TYPE_DEFAULT: "10",
  /**
   *仓库设备状态启用
   */
  DEVICE_ENABLE_STATUS: "启用",
  DEVICE_DISABLE_STATUS: "停用",
  // 默认否N
  Default_N: "N",
  // 默认否0
  Default_ZERO: "0",
  /**
   * 生成账单方式
   */
  BE_ACCOUNT_TYPE: "BE_ACCOUNT_TYPE",
  /**
   * 业务类型
   */
  ACCOUNT_BUSINESSTYPE: "ACCOUNT_BUSINESSTYPE",
  /**
   * 记账周期
   */
  ACCOUNT_CYCLE: "ACCOUNT_CYCLE",
  /**
   * 启用
   */
  ACCOUNT_ENABLE_STATUS: "启用",
  /**
   * 停用
   */
  ACCOUNT_DISABLE_STATUS: "停用",
  /**
   * 是否（通用，是：Y；否：N）
   */
  YES_OR_NO: "YES_OR_NO",
  /**
   * 是否（通用，是：1；否：0）
   */
  WHETHER: "WHETHER",
  /**
   * 启用状态（通用，启用：1；停用：0）
   */
  IS_ENABLE: "IS_ENABLE",
  /**
   * 启用状态（通用，启用：Y；停用：N）
   */
  IS_ENABLE_CN: "IS_ENABLE_CN",
  /**
   * 收发货方类型
   */
  NEW_CONTACT_TYPE: "NEW_CONTACT_TYPE",
  /**
   * 默认时间格式
   */
  DEFAULT_FORMAT_TIME: "YYYY-MM-DD HH:mm",
  /**
   * 对账周期-按天
   */
  ACCOUNT_CYCLE_BY_DAY: "按天",
  /**
   * 是否默认（是）
   */
  IS_DEFAULT_YES: "1",
  /**
   * 是否默认（否）
   */
  IS_DEFAULT_NOT: "0"
};
export default Enum;
