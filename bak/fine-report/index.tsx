import ReportConfigList from './ReportConfigList';
import TenantReportConfigList from './TenantReportConfigList';

import ReportConfigListModel from "./model/reportConfigList";
import TenantReportConfigListModel from "./model/tenantReportConfigList";

import ReportConfigListDetail from "./ReportConfigList/Detail";
import TenantReportConfigListDetail from "./TenantReportConfigList/Detail";

ReportConfigList.model=ReportConfigListModel;
TenantReportConfigListModel.model=TenantReportConfigList

ReportConfigList.Detail=ReportConfigListDetail;
TenantReportConfigList.Detail=TenantReportConfigListDetail;

export default {ReportConfigList,TenantReportConfigList}

