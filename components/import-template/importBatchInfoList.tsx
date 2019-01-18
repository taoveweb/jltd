import { Icon, message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import update from 'immutability-helper';
// @ts-ignore
import queryString from 'query-string';
// @ts-ignore
import React, { Component } from 'react';

import buttonGroup from '../button-group';
import LabelWithController from '../label-with-controller';
import PaginationComponent from '../pagination-component';
import ImportExcel from './importExcel';
import TableComponent from './TableComponents';

// @ts-ignore
// @ts-ignore
const Enum = {
  // 订单类型
  orderType: [
    { text: '运输出库', value: '1' },
    { text: '运输入库', value: '2' },
    { text: '运输订单', value: '3' },
    { text: '出库订单', value: '4' },
    { text: '入库订单', value: '5' },
  ],
  // 状态
  importStatus: [
    { text: '等待导入', value: '10' },
    { text: '等待校验', value: '20' },
    { text: '等待提交', value: '30' },
    { text: '提交成功', value: '40' },
  ],
};

const utils = {
  downloadTemplate: (templateId: any) => {
    const downloadUrl = `../importExportTemplate/downloadTemplate?templateId=${templateId}`;
    downloadFile(downloadUrl);
  },
};

const downloadFile = (url: any) => {
  if (document.getElementById('download-iframe') != null) {
    // @ts-ignore
    document.getElementById('download-iframe').remove();
  }
  let iframe = document.createElement('iframe');
  iframe = document.createElement('iframe');
  iframe.id = 'download-iframe';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  iframe.style.height = '0px';
  iframe.src = url;
  document.body.appendChild(iframe);
};

// 导入列表
class ImportBatchInfoList extends Component<any, any> {
  columns: any;

  constructor(props: any) {
    super(props);
    this.state = {
      idList: [],
      rows: [],
      templateId: '',
      importBatchNumTable: '',
      importBatchNum: '',
      orderType: '',
      createTimeStartTime: '',
      createTimeEndTime: '',
      status: '',
      createName: '',
      submitTimeStartTime: '',
      submitTimeEndTime: '',
      queryMore: '',
      queryCondition: 'none',
      queryLess: 'none',
      loading: false,
    };
    this.columns = [
      {
        dataIndex: 'importBatchNum',
        title: '导入批次号',
        width: 100,
      },
      {
        dataIndex: 'orderTypeTxt',
        title: '订单类型',
        width: 80,
      },
      {
        dataIndex: 'importRemark',
        title: '导入描述',
        width: 200,
      },
      {
        dataIndex: 'statusTxt',
        title: '状态',
        width: 80,
      },
      {
        dataIndex: 'originalRecordNum',
        title: '原始记录数',
        width: 80,
      },
      {
        dataIndex: 'successNum',
        title: '提交成功数',
        width: 80,
      },
      {
        dataIndex: 'orderNum',
        title: '提交订单数',
        width: 80,
      },
      {
        dataIndex: 'failNum',
        title: '提交失败数',
        width: 80,
      },
      {
        dataIndex: 'createTime',
        title: '创建时间',
        width: 100,
      },
      {
        dataIndex: 'submitTime',
        title: '提交时间',
        width: 100,
      },
      {
        dataIndex: 'createName',
        title: '操作人',
        width: 70,
      },
      {
        dataIndex: 'operation',
        title: '操作',
        width: 70,
        fixed: 'right',
        // @ts-ignore
        render: (val, item) => {
          return (
            <div>
              <a onClick={() => this.importEdit(item.templateId, item.importBatchNum)}>编辑</a>
            </div>
          );
        },
      },
    ];
  }

  componentWillMount() {
    this.searchTemplateForState();
  }

  // 导入批次号
  onImportBatchNumChange = (importBatchNum: any) => {
    if (importBatchNum == null) {
      importBatchNum = '';
    }
    this.setState({
      importBatchNum,
    });
  };

  // 订单类型
  onOrderTypeChange = (orderType: any) => {
    if (orderType == null) {
      orderType = '';
    }
    this.setState({
      orderType,
    });
  };

  // 创建时间从
  onCreateTimeStartTimeChange = (createTimeStartTime: any) => {
    if (createTimeStartTime == null) {
      createTimeStartTime = '';
    }
    this.setState({
      createTimeStartTime,
    });
  };

  // 创建时间到
  onCreateTimeEndTimeChange = (createTimeEndTime: any) => {
    if (createTimeEndTime == null) {
      createTimeEndTime = '';
    }
    this.setState({
      createTimeEndTime,
    });
  };

  // 状态
  onStatusChange = (status: any) => {
    if (status == null) {
      status = '';
    }
    this.setState({
      status,
    });
  };

  // 操作人
  onCreateNameChange = (createName: any) => {
    if (createName == null) {
      createName = '';
    }
    this.setState({
      createName,
    });
  };

  // 提交时间从
  onSubmitTimeStartTimeChange = (submitTimeStartTime: any) => {
    if (submitTimeStartTime == null) {
      submitTimeStartTime = '';
    }
    this.setState({
      submitTimeStartTime,
    });
  };

  // 提交时间到
  onSubmitTimeEndTimeChange = (submitTimeEndTime: any) => {
    if (submitTimeEndTime == null) {
      submitTimeEndTime = '';
    }
    this.setState({
      submitTimeEndTime,
    });
  };

  // 重置
  onResetClick = () => {
    this.setState({
      importBatchNum: '',
      orderType: '',
      createTimeStartTime: '',
      createTimeEndTime: '',
      status: '',
      createName: '',
      submitTimeStartTime: '',
      submitTimeEndTime: '',
    });
  };

  // 编辑
  onEditClick = () => {
    const { rows } = this.state;
    if (rows.length === 0) {
      message.error('请选择一条记录');
      return;
    }
    if (rows.length > 1) {
      message.error('请只选择一条记录');
      return;
    }
    const row = rows[0];
    this.importEdit(row.templateId, row.importBatchNum);
  };

  // 编辑
  importEdit = (templateId: any, importBatchNum: any) => {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/importTemplate',
        search: queryString.stringify({
          templateId,
          importBatchNum,
        }),
      })
    );
  };

  // 选中行
  onCellSelect = (idList: any, rows: any) => {
    this.setState({
      idList,
      rows,
    });
  };

  // 分页变化
  onPageChange = (page: any, pageSize: any) => {
    this.searchTemplateForRedux(page, pageSize);
  };

  // 每页条数变化
  onPageSizeChange = (pageSize: any) => {
    this.searchTemplateForRedux('1', pageSize);
  };

  // 用state信息搜索模板
  searchTemplateForState = () => {
    const {
      importBatchNum,
      orderType,
      createTimeStartTime,
      createTimeEndTime,
      status,
      createName,
      submitTimeStartTime,
      submitTimeEndTime,
    } = this.state;
    this.setState({
      loading: true,
    });
    this.props
      .dispatch({
        type: 'importBatchInfoList/getImportBatchList',
        payload: {
          importBatchNum,
          orderType,
          createTimeStartTime,
          createTimeEndTime,
          status,
          createName,
          submitTimeStartTime,
          submitTimeEndTime,
        },
      })
      .then(() => {
        this.setState(() => {
          return {
            loading: false,
          };
        });
      });
  };

  // 用Redux信息搜索模板
  searchTemplateForRedux = (pageNumber: any, pageSize: any) => {
    this.setState(
      {
        idList: [],
        loading: true,
      },
      () => {
        const { searchParam } = this.props;
        const payload = update(searchParam, {
          $merge: {
            pageNumber: pageNumber || searchParam.pageNumber,
            pageSize: pageSize || searchParam.pageSize,
          },
        });
        this.props
          .dispatch({
            type: 'importBatchInfoList/getImportBatchList',
            payload,
          })
          .then(() => {
            this.setState(() => {
              return {
                loading: false,
              };
            });
          });
      }
    );
  };

  operationCallback = (result: any) => {
    if (result.status > 0) {
      message.success(result.message);
      this.searchTemplateForRedux('1', 10);
    } else {
      message.error(result.message);
    }
  };

  downloadTemplate = () => {
    utils.downloadTemplate('carrierImportTransportIn');
  };

  renderPagination() {
    const { rowsCount } = this.props;
    if (!rowsCount) {
      return;
    }
    return (
      <PaginationComponent
        className="impexp-pagination-style"
        defaultCurrent={1}
        total={rowsCount}
        onChange={this.onPageChange}
        onPageSizeChange={this.onPageSizeChange}
      />
    );
  }

  renderTable() {
    const { idList } = this.state;
    const orderTypeMap: any = {};
    Enum.orderType.forEach(orderTypeInfo => {
      orderTypeMap[orderTypeInfo.value] = orderTypeInfo.text;
    });
    const statusMap: any = {};
    Enum.importStatus.forEach(statusInfo => {
      statusMap[statusInfo.value] = statusInfo.text;
    });
    const importBatchList = this.props.importBatchList.map((info: any) => {
      return update(info, {
        $merge: {
          orderTypeTxt: orderTypeMap[info.orderType],
          statusTxt: statusMap[info.status],
        },
      });
    });
    const tableWidth: any = this.columns.reduce((previousValue: any, currentValue: any) => {
      return previousValue + currentValue.width; // 62是勾选框的宽度
    }, 0);
    return (
      <TableComponent
        // @ts-ignore
        tableWidth={tableWidth}
        tableData={importBatchList || []}
        tableColumns={this.columns}
        loading={this.state.loading}
        isSelectable
        onSelect={this.onCellSelect}
        selectedRowKeys={idList}
        rowKey="id"
      />
    );
  }

  queryMoreCondition = (queryCondition: any) => {
    if (queryCondition == 'none') {
      this.setState({
        queryCondition,
        queryMore: '',
        queryLess: 'none',
      });
    } else {
      this.setState({
        queryCondition,
        queryMore: 'none',
        queryLess: '',
      });
    }
  };

  renderControllerList = () => {
    const {
      importBatchNum,
      orderType,
      createTimeStartTime,
      createTimeEndTime,
      status,
      createName,
    } = this.state;
    const controllerList = [
      {
        label: '导入批次号',
        type: 'input',
        onChange: this.onImportBatchNumChange,
        value: importBatchNum,
      },
      {
        label: '订单类型',
        type: 'select',
        onChange: this.onOrderTypeChange,
        optionData: Enum.orderType,
        value: orderType,
      },
      {
        label: '创建时间从',
        type: 'input',
        onChange: this.onCreateTimeStartTimeChange,
        value: createTimeStartTime,
      },
      {
        label: '创建时间到',
        type: 'input',
        onChange: this.onCreateTimeEndTimeChange,
        value: createTimeEndTime,
      },
      {
        label: '状态',
        type: 'select',
        onChange: this.onStatusChange,
        optionData: Enum.importStatus,
        value: status,
      },
      {
        label: '操作人',
        type: 'input',
        onChange: this.onCreateNameChange,
        value: createName,
      },
    ];
    const renderControllerList = controllerList.map(info => {
      return (
        <LabelWithController
          type={info.type}
          label={info.label}
          key={info.label}
          onChange={info.onChange}
          optionData={info.optionData}
          value={info.value}
        />
      );
    });
    return renderControllerList;
  };

  renderControllerMoreList = () => {
    const { submitTimeStartTime, submitTimeEndTime } = this.state;
    const controllerList = [
      {
        label: '提交时间从',
        type: 'input',
        onChange: this.onSubmitTimeStartTimeChange,
        value: submitTimeStartTime,
      },
      {
        label: '提交时间到',
        type: 'input',
        onChange: this.onSubmitTimeEndTimeChange,
        value: submitTimeEndTime,
      },
    ];
    const renderControllerList = controllerList.map((info: any) => {
      return (
        <LabelWithController
          type={info.type}
          label={info.label}
          key={info.label}
          onChange={info.onChange}
          optionData={info.optionData}
          value={info.value}
        />
      );
    });
    return renderControllerList;
  };

  render() {
    const topButtonList = [
      { text: '搜索', onClick: this.searchTemplateForState, type: 'primary' },
      { text: '重置', onClick: this.onResetClick },
    ];
    const middleButtonList = [{ text: '下载模板', onClick: this.downloadTemplate }];
    return (
      <div className="impexp-controller-style">
        <div>
          <label
            style={{
              float: 'left',
              fontSize: '20px',
              fontWeight: 400,
              borderLeft: '4px solid #0078d6',
              paddingLeft: '10px',
            }}
          >
            导入列表
          </label>
        </div>
        <div className="impexp-search-view">
          <div className="impexp-search-controller">
            {this.renderControllerList()}

            <div style={{ display: this.state.queryCondition }}>
              {this.renderControllerMoreList()}
            </div>
          </div>
          <div className="impexp-search-btn-group" style={{ flexDirection: 'column' }}>
            <div>{buttonGroup(topButtonList)}</div>
            <div style={{ marginTop: '20px', marginLeft: '12px' }}>
              <a
                style={{ display: this.state.queryMore }}
                onClick={() => this.queryMoreCondition('')}
              >
                更多
                <Icon type="down" />
              </a>
              <a
                style={{ display: this.state.queryLess }}
                onClick={() => this.queryMoreCondition('none')}
              >
                收起
                <Icon type="up" />
              </a>
            </div>
          </div>
        </div>
        <div className="impexp-btn-group">
          {buttonGroup(middleButtonList)}
          <ImportExcel templateId="carrierImportTransportIn" />
        </div>
        <div className="impexp-table-style">{this.renderTable()}</div>
        {this.renderPagination()}
      </div>
    );
  }
}
function mapStateToProps(state: any) {
  const { searchParam, importBatchList, rowsCount } = state.importBatchInfoList;
  return { searchParam, importBatchList, rowsCount };
}
export default connect(mapStateToProps)(ImportBatchInfoList);
