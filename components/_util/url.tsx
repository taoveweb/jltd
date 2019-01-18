//const host = getRootPath();
/* const host = '/jlt-workplat-web/';
const rest = 'rest';
const customerList = 'customerList';
const importBatch = 'importBatch';
const importExportTemplate = 'importExportTemplate';
const system = 'system';
const file = 'file';
const mdmFeeCategory = 'mdmFeeCategory';
const invoiceBaseInfo = 'mdmInvoiceBaseInfo';
const mdmCarDevice = 'mdmDevice';
const carBindDevice = 'mdmCarDevice'; //车辆绑定设备
const equipment = 'equipment';
const mdmCar = 'mdmCar'; //车辆列表
const mdmWarehouseDevice = 'mdmEquipment';
//const mdmWarehouseDeviceChild ='mdmEquipmentChild'
const wmSku = 'mdmSku';
const mdmOwner = 'mdmCrmCustomer';
const mdmPackBasicInfo = 'mdmPackBasicInfo';
const mdmSkuCategory = 'mdmSkuCategory';
const mdmWarehouse = 'mdmWarehouse';
const mdmDriver = 'mdmDriver';
const consigneeAndConsigner = 'mdmConsign';
const mdmSkuMedicine = 'mdmSkuMedicine';
const mdmSupplier = 'mdmSupplier';
const mdmPackUnitInfo = 'mdmPackUnitInfo';
//const cdCarrierConfig = 'cdCarrierConfig';
const mdmSupplierContact = 'mdmSupplierContact';
const mdmEquipmentChild = 'mdmEquipmentChild';
const mdmBranch = 'mdmBranch';
const mdmBranchCoverage = 'mdmBranchCoverage';
const mdmRoute = 'mdmRoute';
const mdmRouteSite = 'mdmRouteSite';
const mdmDriverVehicleBinding = 'mdmDriverVehicleBinding';
const mdmAccount = 'mdmAccount';
const exception ='exception'; */

const url =(window as any).globalUrl /* {
  file: {
    get selectEsFileList() {
      return `${host}${file}/selectEsFileList`;
    },
    get fileDownload() {
      return `${host}${file}/downLoadFile`;
    },
  },
  driver: {
    get queryList() {
      return `${host}${mdmDriver}/selectPage`;
    },
    get selectBindRelation() {
      return `${host}${mdmDriverVehicleBinding}/selectBindRelation`;
    },
    get bindCarRelation() {
      return `${host}${mdmDriverVehicleBinding}/bindCarRelation`;
    },
    get queryDetail() {
      return `${host}${mdmDriver}/queryDetail`;
    },
    get validateIsOnly() {
      return `${host}${mdmDriver}/validateIsOnly`;
    },
    get save() {
      return `${host}${mdmDriver}/save`;
    },
    get batchDelete() {
      return `${host}${mdmDriver}/batchDelete`;
    },
    get startUse() {
      return `${host}${mdmDriver}/startUse`;
    },
    get stopUse() {
      return `${host}${mdmDriver}/stopUse`;
    },
    get updateStatusEvent() {
      return `${host}${mdmDriver}/updateStatusEvent`;
    },
  },
  importBatch: {
    get queryList() {
      return `${host}${importBatch}/page`;
    },
    get add() {
      return `${host}${importBatch}/add`;
    },
    get addImportBatchNum() {
      return `${host}${importBatch}/addImportBatchNum`;
    },
  },
  importExportTemplate: {
    downloadTemplate(templateId: any) {
      return (
        `${host}${importExportTemplate}/downloadTemplate?templateId=` +
        templateId
      );
    },
    exportTemplate(templateId: any) {
      return (
        `${host}${importExportTemplate}/exportTemplate?templateId=` + templateId
      );
    },
    exportTemplateThread(templateId: any) {
      return (
        `${host}${importExportTemplate}/exportTemplateThread?templateId=` +
        templateId
      );
    },
    get findColumn() {
      return `${host}${importExportTemplate}/findColumn`;
    },
    get findImportTemplate() {
      return `${host}${importExportTemplate}/findImportTemplate`;
    },
    get importPage() {
      return `${host}${importExportTemplate}/importPage`;
    },
    get importTemplateCheck() {
      return `${host}${importExportTemplate}/importTemplateCheck`;
    },
    get importTemplateSumbit() {
      return `${host}${importExportTemplate}/importTemplateSumbit`;
    },
    get updateMongoDB() {
      return `${host}${importExportTemplate}/updateMongoDB`;
    },
    get getImportProgress() {
      return `${host}${importExportTemplate}/getImportProgress`;
    },
    get importTemplate() {
      return `${host}${importExportTemplate}/importTemplate`;
    },
  },
  system: {
    get getDataDictionary() {
      return `${host}${system}/getDataDictionary`;
    },
     getSelectData() {
      return `${host}${system}/getCompanyType`;
    },
  },
  cdDictionary: {
    get getDataDictionary() {
      return `${host}${system}/getDataDictionary`;
    },
  },
  consigneeAndConsigner: {
    get validateMainInfoIsExist() {
      return `${host}${consigneeAndConsigner}/validateMainInfoIsExist`;
    },
    get selectPage() {
      return `${host}${consigneeAndConsigner}/selectPage`;
    },
    get queryDetail() {
      return `${host}${consigneeAndConsigner}/queryDetail`;
    },
    get save() {
      return `${host}${consigneeAndConsigner}/save`;
    },
    get update() {
      return `${host}${consigneeAndConsigner}/update`;
    },
    get batchDelete() {
      return `${host}${consigneeAndConsigner}/batchDelete`;
    },
    get getWareHousePage() {
      return `${host}${mdmWarehouse}/selectPage`;
    },
    get getOwnerPage() {
      return `${host}${mdmOwner}/selectPage`;
    },
    get getSupplierPage() {
      return `${host}${mdmSupplier}/selectPage`;
    },
    get getConsignContacts() {
      return `${host}/mdmConsignContact/getConsignContacts`;
    },
  },
  supplierList: {
    get selectPage() {
      return `${host}${mdmSupplier}/selectPage`;
    },
    get deleteList() {
      return `${host}${mdmSupplier}/deleteList`;
    },
    get updateMdmSupplier() {
      return `${host}${mdmSupplier}/updateMdmSupplier`;
    },
    get addMdmSupplier() {
      return `${host}${mdmSupplier}/addMdmSupplier`;
    },
    get queryDetail() {
      return `${host}${mdmSupplier}/selectOne`;
    },
    get selectList() {
      return `${host}${mdmSupplier}/selectList`;
    },
    get querySupplierToBindedCarrier() {
      return `${host}${mdmSupplier}/querySupplierToBindedCarrier`;
    },
    get saveBindCarrierlist() {
      return `${host}${mdmSupplier}/saveBindCarrierlist`;
    },
    get selectPageToContacts() {
      return `${host}${mdmSupplierContact}/selectPage`;
    },
    get validateSupplierIsExist() {
      return `${host}${mdmSupplier}/validateSupplierIsExist`;
    },
  },
  warehouseList: {
    get selectPage() {
      return `${host}${mdmWarehouse}/selectPage`;
    },
    get deleteList() {
      return `${host}${mdmWarehouse}/deleteList`;
    },
    get updateWarehouse() {
      return `${host}${mdmWarehouse}/updateWarehouse`;
    },
    get addWarehouse() {
      return `${host}${mdmWarehouse}/addWarehouse`;
    },
    get queryDetail() {
      return `${host}${mdmWarehouse}/selectOne`;
    },
    get queryEquipmentList() {
      return `${host}${mdmWarehouse}/queryEquipmentList`;
    },
    get saveBindAndUnbindEquipmentlist() {
      return `${host}${mdmWarehouse}/saveBindAndUnbindEquipmentlist`;
    },
    get queryCustomerList() {
      return `${host}${mdmWarehouse}/queryCustomerList`;
    },
    get selectWarehouseListToBindedEsCustomer() {
      return `${host}${mdmWarehouse}/selectWarehouseListToBindedEsCustomer`;
    },
    get saveBindAndUnbindWarehouseOwnerlist() {
      return `${host}${mdmWarehouse}/saveBindAndUnbindWarehouseOwnerlist`;
    },
    get validateWarehouseIsExist() {
      return `${host}${mdmWarehouse}/validateWarehouseIsExist`;
    },
  },
  medicineSku: {
    get queryList() {
      return `${host}${mdmSkuMedicine}/selectSkuAndMedicinePage`;
    },
    get selectOneSku() {
      return `${host}${mdmSkuMedicine}/selectOneSkuMedicine`;
    },
    get save() {
      return `${host}${mdmSkuMedicine}/save`;
    },
    get judgeRepeatMedicine() {
      return `${host}${mdmSkuMedicine}/judgeRepeatMedicine`;
    },
  },
  storageSku: {
    get queryList() {
      return `${host}${wmSku}/selectPage`;
    },
    get selectOneSku() {
      return `${host}${wmSku}/selectOneSku`;
    },
    get save() {
      return `${host}${wmSku}/saveAboutStorage`;
    },
  },
  transportSku: {
    get queryList() {
      return `${host}${wmSku}/selectPage`;
    },
    get selectOneSku() {
      return `${host}${wmSku}/selectOneSku`;
    },
    get save() {
      return `${host}${wmSku}/saveAboutTransport`;
    },
    get selectPage() {
      return `${host}${mdmPackUnitInfo}/selectPage`;
    },
  },
  packageSku: {
    get selectOneSku() {
      return `${host}${wmSku}/selectOneSku`;
    },
    get save() {
      return `${host}${wmSku}/saveAboutPack`;
    },
    get queryList() {
      return `${host}${wmSku}/selectPage`;
    },
    get getPackInfoDetail() {
      return `${host}${mdmPackBasicInfo}/selectPackAndDetail`;
    },
  },
  packInfo: {
    get queryList() {
      return `${host}${mdmPackBasicInfo}/selectPage`;
    },
    get getPackInfoDetail() {
      return `${host}${mdmPackBasicInfo}/getPackInfoDetail`;
    },
    get savePackInfo() {
      return `${host}${mdmPackBasicInfo}/savePackInfo`;
    },
    get deleteList() {
      return `${host}${mdmPackBasicInfo}/deleteList`;
    },
    get getPackUnitDetail() {
      return `${host}${mdmPackUnitInfo}/getPackUnitDetail`;
    },
    get validatePackSpeciIsExist() {
      return `${host}${mdmPackBasicInfo}/validatePackSpeciIsExist`;
    },
    get checkPackUnitIsUsed() {
      return `${host}${mdmPackUnitInfo}/checkPackUnitIsUsed`;
    },
  },
  shipperList: {
    get selectPage() {
      return `${host}${mdmOwner}/selectPage`;
    },
    get queryDetail() {
      return `${host}${mdmOwner}/selectCustomerAndContact`;
    },
    get save() {
      return `${host}${mdmOwner}/save`;
    },
    get update() {
      return `${host}${mdmOwner}/update`;
    },
    get deleteList() {
      return `${host}${mdmOwner}/remove`;
    },
    get getBindList() {
      return `${host}${mdmOwner}/queryBindRelationList`;
    },
    get bindCompany() {
      return `${host}${mdmOwner}/saveBindRelation`;
    },
    get judgeRepeatCustomer() {
      return `${host}${mdmOwner}/judgeRepeatCustomer`;
    },
    get checkCustomerUsed() {
      return `${host}${mdmOwner}/checkCustomerUsed`;
    },
  },
  basicWmSku: {
    get queryList() {
      return `${host}${wmSku}/selectPage`;
    },
    get selectOneSku() {
      return `${host}${wmSku}/selectOneSku`;
    },
    get save() {
      return `${host}${wmSku}/save`;
    },
    get add() {
      return `${host}${wmSku}/add`;
    },
    get update() {
      return `${host}${wmSku}/update`;
    },
    get deleteList() {
      return `${host}${wmSku}/remove`;
    },
    get judgeRepeatSku() {
      return `${host}${wmSku}/judgeRepeatSku`;
    },
    get checkSKuBindRelationship() {
      return `${host}${wmSku}/checkSKuBindRelationship`;
    },
    get saveBindSupplierRelation() {
      return `${host}${wmSku}/saveBindSupplierRelation`;
    },
  },
  mdmFeeCategory: {
    get queryList() {
      return `${host}${mdmFeeCategory}/queryList`;
    },
    get queryDetail() {
      return `${host}${mdmFeeCategory}/queryDetail`;
    },
    get save() {
      return `${host}${mdmFeeCategory}/save`;
    },
    get batchDelete() {
      return `${host}${mdmFeeCategory}/batchDelete`;
    },
    get validateUniqueCodeIsExist() {
      return `${host}${mdmFeeCategory}/validateUniqueCodeIsExist`;
    },
  },
  mdmCarDevice: {
    get queryList() {
      return `${host}${mdmCarDevice}/selectPage`;
    },
    get queryDevice() {
      return `${host}${mdmCarDevice}/queryDevice`;
    },
    get save() {
      return `${host}${mdmCarDevice}/save`;
    },
    get update() {
      return `${host}${mdmCarDevice}/update`;
    },
    get deleteMdmCarDevice() {
      return `${host}${mdmCarDevice}/deleteMdmCarDevice`;
    },
    get validateDeviceNoIsExist() {
      return `${host}${mdmCarDevice}/validateDeviceNoIsExist`;
    },
    get updateStatusEvent() {
      return `${host}${mdmCarDevice}/updateStatusEvent`;
    },
    get getCarDeviceList() {
      return `${host}${carBindDevice}/getCarDeviceList`;
    },
    get saveMdmCarDevice() {
      return `${host}${carBindDevice}/saveMdmCarDevice`;
    },
    get getBindCarDeviceList() {
      return `${host}${carBindDevice}/getBindCarDeviceList`;
    },
  },
  equipment: {
    get queryList() {
      return `${host}${equipment}/queryList`;
    },
    get queryDevice() {
      return `${host}${equipment}/queryEquipment`;
    },
    get save() {
      return `${host}${equipment}/save`;
    },
    get update() {
      return `${host}${equipment}/update`;
    },
    get deleteList() {
      return `${host}${equipment}/deleteList`;
    },
  },
  mdmWarehouseDevice: {
    get getMdmWarehouseDevicePage() {
      return `${host}${mdmWarehouseDevice}/getMdmWarehouseDevicePage`;
    },
    get getWarehouseDeviceDetail() {
      return `${host}${mdmWarehouseDevice}/getWarehouseDeviceDetail`;
    },
    get saveMdmEquipment() {
      return `${host}${mdmWarehouseDevice}/saveMdmEquipment`;
    },
    get deleteMdmWarehouseDevice() {
      return `${host}${mdmWarehouseDevice}/deleteMdmWarehouseDevice`;
    },
    get updateStatusEvent() {
      return `${host}${mdmWarehouseDevice}/updateStatusEvent`;
    },
    get validateMainInfoIsExist() {
      return `${host}${mdmWarehouseDevice}/validateMainInfoIsExist`;
    },
    get getWarehouseDeviceChildList() {
      return `${host}${mdmEquipmentChild}/getWarehouseDeviceChildList`;
    },
  },
  redirect: {
    get url() {
      return `${host}${rest}/redirect`;
    },
  },
  rest: {
    get userInfo() {
      return `${host}${rest}/userInfo`;
    },
    get centerPageUrl() {
      return `${host}${rest}/getUrl`;
    },
    // 获取系统URL配置
    getUrlConfig() {
      return `${host}${rest}/getUrlConfig`;
    },
  },
  invoiceBaseInfo: {
    get queryList() {
      return `${host}${invoiceBaseInfo}/queryList`;
    },
    get queryDetail() {
      return `${host}${invoiceBaseInfo}/queryDetail`;
    },
    get save() {
      return `${host}${invoiceBaseInfo}/save`;
    },
    get batchDelete() {
      return `${host}${invoiceBaseInfo}/batchDelete`;
    },
    get validateInvoiceBaseCodeIsExist() {
      return `${host}${invoiceBaseInfo}/validateInvoiceBaseCodeIsExist`;
    },
  },
  mdmCar: {
    get getMdmCarPage() {
      return `${host}${mdmCar}/getMdmCarPage`;
    },
    get getMdmCarDetail() {
      return `${host}${mdmCar}/getMdmCarDetail`;
    },
    get saveMdmCar() {
      return `${host}${mdmCar}/saveMdmCar`;
    },
    get deleteMdmCar() {
      return `${host}${mdmCar}/deleteMdmCar`;
    },
    get validateCarNoIsExist() {
      return `${host}${mdmCar}/validateCarNoIsExist`;
    },
    get getTransactionMdmCarDetail() {
      return `${host}${mdmCar}/getTransactionMdmCarDetail`;
    },
  },
  nav: {
    // 获取新消息数量
    getMsgCount(centerPageUrl: string) {
      return `${centerPageUrl}/jlt-bcs/bcs/member/getMsgCountJsonp.shtml`;
    },
    // 获取服务列表
    getEsServices(centerPageUrl: string) {
      return `${centerPageUrl}/jlt-bcs/bcs/esService/getEsServicesJsonp.shtml`;
    },
    get initColumns() {
      return `${host}${customerList}/initColumns`;
    },
    // 获取菜单权限
    getMenu() {
      return `${host}${system}/getMenu`;
    },
    // 获取按钮权限
    getButtonPermission() {
      return `${host}${system}/getButtonPermission`;
    },
    get logout() {
      return `${host}/logout`;
    },
  },
  mdmSkuCategory: {
    get getMdmSkuCategoryPage() {
      return `${host}${mdmSkuCategory}/getPage`;
    },
    get saveSkuCategory() {
      return `${host}${mdmSkuCategory}/saveSkuCategor`;
    },
    get getSkuCategoryList() {
      return `${host}${mdmSkuCategory}/getSkuCategoryList`;
    },
    get getSkuCategoryByCondition() {
      return `${host}${mdmSkuCategory}/getSkuCategoryByCondition`;
    },
    get deleteList() {
      return `${host}${mdmSkuCategory}/deleteList`;
    },
    get getPageForSku() {
      return `${host}${mdmSkuCategory}/getPageForSku`;
    },
    get validateCategoryIsExist() {
      return `${host}${mdmSkuCategory}/validateCategoryIsExist`;
    },
  },
  mdmBranch: {
    get getMdmBranchPage() {
      return `${host}${mdmBranch}/selectPage`;
    },
    get deleteMdmBranch() {
      return `${host}${mdmBranch}/deleteMdmBranch`;
    },
    get getBranchDetail() {
      return `${host}${mdmBranch}/getBranchDetail`;
    },
    get saveMdmBranch() {
      return `${host}${mdmBranch}/saveMdmBranch`;
    },
    get validateBranchInfoIsExist() {
      return `${host}${mdmBranch}/validateBranchInfoIsExist`;
    },
  },
  mdmBranchCoverage: {
    get getBranchCoverageList() {
      return `${host}${mdmBranchCoverage}/getBranchCoverageList`;
    },
  },
  mdmRoute: {
    get getMdmRoutePage() {
      return `${host}${mdmRoute}/selectPage`;
    },
    get deleteMdmRoute() {
      return `${host}${mdmRoute}/deleteMdmRoute`;
    },
    get getRouteDetail() {
      return `${host}${mdmRoute}/getRouteDetail`;
    },
    get saveMdmRoute() {
      return `${host}${mdmRoute}/saveMdmRoute`;
    },
    get validateRouteInfoIsExist() {
      return `${host}${mdmRoute}/validateRouteInfoIsExist`;
    },
    get updateStatusEvent() {
      return `${host}${mdmRoute}/updateStatusEvent`;
    },
  },
  mdmRouteSite: {
    get getRouteSiteList() {
      return `${host}${mdmRouteSite}/getRouteSiteList`;
    },
    get getSitePageForAdd() {
      return `${host}${mdmRouteSite}/getSitePageForAdd`;
    },
  },
  mdmAccount: {
    get selectPage() {
      return `${host}${mdmAccount}/selectPage`;
    },
    get accountEnabled() {
      return `${host}${mdmAccount}/accountEnabled`;
    },
    get batchRemove() {
      return `${host}${mdmAccount}/batchRemove`;
    },
    get selectOneAccount() {
      return `${host}${mdmAccount}/selectOneAccount`;
    },
    get save() {
      return `${host}${mdmAccount}/save`;
    },
    get getAccountCode() {
      return `${host}${mdmAccount}/getAccountCode`;
    },
    get checkBusinessRepeat() {
      return `${host}${mdmAccount}/checkBusinessRepeat`;
    },
    get selectDetailPage() {
      return `${host}${'mdmAccountDetail'}/selectPage`;
    },
    get selectAccountToDetail() {
      return `${host}${mdmAccount}/selectAccountToDetail`;
    },
  },
  exception: {
    upload() {
      return `${host}${exception}/upload`;
    },
  },
}; */
export default url;
