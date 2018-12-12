import { Button, Card, Dropdown, Icon, Input, Menu, message, Modal, Popconfirm, Progress, Table, Upload } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import update from 'immutability-helper';
// @ts-ignore
import queryString from 'query-string';
// @ts-ignore
import React, { Component } from 'react';


import buttonGroup from '../button-group';
import PaginationComponent from '../pagination-component';

const host="../";
const importExportTemplate="importExportTemplate";
const url={
  importExportTemplate: {
    downloadTemplate(templateId:any) {
      return (
        `${host}${importExportTemplate}/downloadTemplate?templateId=` +
        templateId
      );
    },
    exportTemplate(templateId:any) {
      return (
        `${host}${importExportTemplate}/exportTemplate?templateId=` + templateId
      );
    },
    exportTemplateThread(templateId:any) {
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
    }
  }
}

const utils={
  downloadTemplate(templateId:any) {
    const url=`${host}${importExportTemplate}/downloadTemplate?templateId=${templateId}`;
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
  },
}


let tmptemplateList = {};
const EditableCell = ({ editable, value, status, onChange }: any) => (
  <div>
    {editable ? (
      <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    ) : status === '10' ? (
      <span>{value == null ? '' : value}</span>
    ) : (
      <div className={'impexp-error-table-info'}>{value == null ? '' : value}</div>
    )}
  </div>
);


// 学生规则模板
class ImportTemplate extends Component<any, any> {
  columns: any;
  props:any;
  constructor(props: any) {
    super(props);
    this.state = {
      clickCheck: false,
      defaultCurrent: 1,
      current: 1,
      percent: 0,
      tableRow: {},
      templateId: '',
      importBatchNum: '',
      batchStatus: '',
      showStatus: '00',
      pmCodeList: [],
      templateList: [],
      cacheTemplateData: [],
      promptInfo: '',
      progressMask: 'none',
      backUrl: '',
      moduleTypeName: '',
      loading: false,
      isImportClick: false,
      isCheckClick: false,
      isSubmitClick: false,
      isDisplayClick: false,
      isDownloadTemplate: false,
      // 导入模板按钮禁用标志
      isDisabledImportButton: false,
    };
    this.columns = [];
  }

  componentWillMount() {
    this.initData();
    this.queryTableInit();
    this.searchTemplateForState();
  }

  componentWillReceiveProps(nextProps:any) {
    const { templateId, importBatchNum, templateList } = nextProps;
    // 判断是否是校验的数据是否不变
    if (
      JSON.stringify(templateList) !== JSON.stringify(this.state.templateList)
      && this.state.clickCheck
    ) {
      this.setState({
        clickCheck: false,
        templateList,
      });
    }
    if (JSON.stringify(tmptemplateList) !== JSON.stringify(templateList)) {
      tmptemplateList = templateList;
      this.setState({
        templateList,
        cacheTemplateData: templateList,
      });
    }
    if (templateId !== this.state.templateId || importBatchNum !== this.state.importBatchNum) {
      this.setState({
        templateId,
        importBatchNum,
      });
    }
  }

  initData = () => {
    const { templateId, importBatchNum } = this.props;
    const self = this;
    $.ajax({
      url: url.importExportTemplate.findImportTemplate,
      data: { templateId, importBatchNum },
      cache: false,
      async: false,
      type: 'GET',
      dataType: 'json',
      success(data) {
        self.setState({
          backUrl: data.backUrl,
          moduleTypeName: data.moduleTypeName,
        });
        if (data.batchStatus === '10') {
          const promptInfo = `当前导入批次号：${data.importBatchNum}，请选择导入模板文件`;
          self.setState({
            promptInfo,
          });
        } else {
          const promptInfo = `当前导入批次号：${data.importBatchNum}，获取文件原始记录数为${
            data.originalRecordNum == null ? 0 : data.originalRecordNum
          }条，请执行数据校验。`;
          self.setState({
            promptInfo,
          });
        }
        const importType = data.importType;
        const currentImportFlag = data.currentImportFlag;
        if (importType === 'submit') {
          self.setState({
            progressMask: '',
          });
          self.showSubmitProgress();
        } else if (currentImportFlag === 'true') {
          self.checkExistImport(data);
        }
        self.initButtonStatus(data.batchStatus);
      },
    });
  };

  initButtonStatus = (importBatchStatus: any) => {
    if (importBatchStatus == '30') {
      this.setState({
        isSubmitClick: true,
      });
    } else if (importBatchStatus == '40') {
      this.setState({
        isImportClick: true,
        isCheckClick: true,
        isSubmitClick: true,
      });
    }
  };

  queryTableInit = () => {
    const { templateId } = this.props;
    const self = this;
    $.ajax({
      url: url.importExportTemplate.findColumn,
      data: { templateId },
      cache: false,
      async: false,
      type: 'POST',
      dataType: 'json',
      success(data) {
        self.queryColumnInit(data);
      },
    });
  };

  queryColumnInit = (data: any) => {
    const self = this;
    this.columns = [
      {
        title: '操作',
        dataIndex: 'emptyValue',
        width: 100,
        // @ts-ignore
        render: (value, row: any, index: any) => {
          const { batchStatus } = self.state;
          if (batchStatus == null || batchStatus != '40') {
            const { editable } = row;
            return (
              <div className="editable-row-operations">
                {editable ? (
                  <span
                    style={{
                      fontSize: '14px',
                      display: 'block',
                      marginTop: '-10px',
                    }}
                  >
                    <a onClick={() => this.save(index)}>确定</a>
                    <Popconfirm title="确定取消编辑?" onConfirm={() => this.cancel(index)}>
                      <a style={{ marginLeft: '10px' }}>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <a onClick={() => this.edit(index)}>
                    <Icon type="edit" className={'impexp-inline-operate-icon'} />
                  </a>
                )}
              </div>
            );
          }
          return <div />;
        },
      },
      {
        title: '行号',
        dataIndex: 'execlNum',
        width: 80,
        render: (val: any, item: any) => {
          if (item.status == '10') {
            return (
              <div>
                <span>{val == null ? '' : val}</span>
              </div>
            );
          }
          return (
            <div className={'impexp-error-table-info'}>
              <span>{val == null ? '' : val}</span>
            </div>
          );
        },
      },
      {
        title: '错误原因',
        dataIndex: 'errorMessage',
        width: 150,
        render: (val: any, item: any) => {
          if (val == null) {
            return '';
          }
          const msgTitle = val;
          const msg = val.replace(/;/g, ';<br >');
          if (item.status === '10') {
            return (
              <span title="{msgTitle}">
                <div dangerouslySetInnerHTML={{ __html: msg }} />
              </span>
            );
          }
          return (
            <span title={msgTitle}>
              <div
                className={'impexp-error-table-info'}
                dangerouslySetInnerHTML={{ __html: msg }}
              />
            </span>
          );
        },
      },
    ];
    let extendCount = 1;
    const length = data.length;
    for (var i = 0; i < length; i++) {
      if (data[i].porpertyName != '' && data[i].porpertyName != null) {
        const porpertyName = data[i].porpertyName;
        this.columns.push({
          title: data[i].columnName,
          dataIndex: porpertyName,
          width: 150,
          render: (text: any, record: any) => this.renderColumns(text, record, porpertyName),
        });
      } else {
        if (data[i].extendMap == null) {
          this.columns.push({
            title: data[i].columnName,
            dataIndex: `emptyValue${i}`,
            width: 150,
            render: (text: any, record: any) => this.renderColumns(text, record, `emptyValue${i}`),
          });
        } else {
          this.columns.push({
            title: data[i].columnName,
            dataIndex: `extendMap.extend${extendCount}`,
            width: 150,
            render: (text: any, record: any) => this.renderColumns(text, record, `extendMap.extend${extendCount}`),
          });
        }
        extendCount++;
      }
    }
  };

  checkExistImport = (data: any) => {
    Modal.confirm({
      title: `${data.currentModuleTypeName}您还有未提交的数据，是否继续跳转提交？`,
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        if (data.currentUrl != null && data.currentUrl !== '') {
          this.props.dispatch(
            routerRedux.push({
              pathname: data.currentUrl,
            })
          );
        } /* else if (currentTemplateId != null && currentTemplateId !== '') {
          this.props.dispatch(
            routerRedux.push({
              pathname: '/importTemplate',
              search: queryString.stringify({
                templateId: data.currentTemplateId,
                importBatchNum: data.importBatchNum,
                importBatchStatus: data.status,
              }),
            })
          );
        } */ else {
          this.props.history.goBack();
        }
      },
      onCancel: () => {
        this.props.history.goBack();
      },
    });
  };

  // 数据校验
  onCheckClick = () => {
    const { importBatchNum, templateId } = this.state;
    const self = this;
    this.setState({ clickCheck: true });
    Modal.confirm({
      title: '确定校验数据？',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        self.setState({
          progressMask: 'block',
          percent: 0,
          isCheckClick: true,
        });
        const params = [];
        params.push({
          name: 'importBatchNum',
          value: importBatchNum,
        });
        params.push({
          name: 'templateId',
          value: templateId,
        });
        $.post(
          url.importExportTemplate.importTemplateCheck,
          params,
          data => {
            if (!data.result) {
              self.setState({
                progressMask: 'none',
                isCheckClick: false,
                percent: 100,
              });
              if (data.data != null) {
                self.checkExistImport(data.data);
              } else if (data.msg === '数据正在校验中，请稍等！') {
                message.error(data.msg);
              } else {
                message.error(data.msg);
                self.setState({
                  isImportClick: false,
                  isSubmitClick: true,
                  isCheckClick: true,
                });
              }
            } else {
              self.showCheckProgress();
            }
          },
          'json'
        );
      },
    });
  };

  showCheckProgress = () => {
    const { importBatchNum } = this.state;
    const self = this;
    setTimeout(() => {
      if (self.state.progressMask == 'none') {
        return;
      }
      $.post(
        url.importExportTemplate.getImportProgress,
        {
          importBatchNum,
        },
        data => {
          if (data.result) {
            const totalNum = data.data.totalNum;
            const currentNum = data.data.currentNum;
            const importStatus = data.data.importStatus;
            const importMsg = data.data.importMsg;
    
            let percent = 0;
            if (parseInt(totalNum) !== 0) {
              percent = Math.floor((parseInt(currentNum) / parseInt(totalNum)) * 100);
            }
            // @ts-ignore
            if (parseInt(percent) >= 90) {
              self.setState({
                percent: 90,
              });
            } else {
              self.setState({
                percent,
              });
            }
            if (importStatus === '') {
              self.showCheckProgress();
            } else {
              self.setState({
                progressMask: 'none',
                isCheckClick: false,
                isSubmitClick: false,
              });
              if (importStatus === 'true') {
                if (data.data.failCount > 0 || data.data.repeatCount > 0) {
                  var promptInfo = `当前导入批次号：${importBatchNum}，数据校验完成，可导入记录数为${
                    data.data.successCount
                  }条，重复数据为${data.data.repeatCount}条，错误且不可导入记录数为${
                    data.data.failCount
                  }条，请重新导入模板或编辑错误数据后重新进行数据校验。`;
                  self.setState({
                    promptInfo,
                  });
                } else {
                  var promptInfo = `当前导入批次号：${importBatchNum}，数据校验成功，请全部提交数据。`;
                  self.setState({
                    promptInfo,
                  });
                }
              }
              if (importMsg == '校验完成。') {
                message.success(importMsg);
              } else if (importMsg == '校验异常。') {
                message.error(importMsg);
              }
              self.displayShow('00');
            }
          }
        },
        'json'
      );
    }, 3000);
  };

  // 提交
  onSubmitClick = () => {
    const { importBatchNum, templateId } = this.props;
    const self = this;
    Modal.confirm({
      title: '确定提交数据？',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        self.setState({
          progressMask: '',
          percent: 0,
          isImportClick: true,
          isSubmitClick: true,
          isCheckClick: true,
        });
        const params = [];
        params.push({
          name: 'importBatchNum',
          value: importBatchNum,
        });
        params.push({
          name: 'templateId',
          value: templateId,
        });
        $.post(
          url.importExportTemplate.importTemplateSumbit,
          params,
          data => {
            if (!data.result) {
              self.setState({
                progressMask: 'none',
              });
              if (data.data != null) {
                self.checkExistImport(data.data);
              } else if (data.msg === '数据正在提交中，请稍等！') {
                // @ts-ignore
                PUI.MessageBox.alert(data.msg);
                self.setState({
                  isImportClick: true,
                  isSubmitClick: true,
                  isCheckClick: true,
                });
              } else {
                message.error(data.msg);
                self.setState({
                  isImportClick: false,
                });
              }
            } else {
              self.showSubmitProgress();
            }
          },
          'json'
        );
      },
    });
  };

  showSubmitProgress = () => {
    const { importBatchNum } = this.state;
    const self = this;
    setTimeout(() => {
      if (self.state.progressMask == 'none') {
        return;
      }
      $.post(
        url.importExportTemplate.getImportProgress,
        {
          importBatchNum,
        },
        data => {
          if (data.result) {
            const totalNum = data.data.totalNum;
            const currentNum = data.data.currentNum;
            const importStatus = data.data.importStatus;
            const importMsg = data.data.importMsg;
            let percent = 0;
            if (parseInt(totalNum) !== 0) {
              percent = Math.floor((parseInt(currentNum) / parseInt(totalNum)) * 100);
            }
            // @ts-ignore
            if (parseInt(percent) >= 90) {
              self.setState({
                percent: 90,
              });
            } else {
              self.setState({
                percent,
              });
            }
            if (importStatus === '') {
              self.showSubmitProgress();
            } else {
              self.setState({
                progressMask: 'none',
                isImportClick: true,
                isCheckClick: true,
                isSubmitClick: true,
                isDisabledImportButton: true,
                batchStatus: '40',
              });
              if (importStatus === 'true') {
                const promptInfo = `当前导入批次号：${importBatchNum}，获取文件原始记录数为${
                  data.data.allCount
                }条，已导入成功${data.data.successCount}条。`;
                self.setState({
                  promptInfo,
                });
                self.displayShow('30');
              }
              if (importMsg.match('失败')) {
                message.error(importMsg);
              } else {
                message.success(importMsg);
              }
            }
          }
        },
        'json'
      );
    }, 3000);
  };

  // 列表过滤
  onDisplayClick = (val:any) => {
    const showStatus = val == null ? '00' : val.key;
    this.displayShow(showStatus);
  };

  displayShow = (val:any) => {
    const { importBatchNum } = this.props;
    const showStatus = val == null ? '00' : val;
    this.setState({
      showStatus,
    });
    this.searchTemplate(showStatus, importBatchNum);
  };

  downloadTemplate = () => {
    const { templateId } = this.state;
    utils.downloadTemplate(templateId);
  };

  beforeUpload = (file:any) => {
    const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      || file.type === 'application/vnd.ms-excel';
    if (!isExcel) {
      message.error('请上传xls、xlsx文件!');
    }
    return true;
  };

  edit(index:any) {
    const target = update(this.state.templateList[index], {
      $merge: { editable: true },
    });
    const templateList = update(this.state.templateList, {
      $splice: [[index, 1, target]],
    });
    this.setState({ templateList });
  }

  save(index:any) {
    const newData = [...this.state.templateList];
    const target = update(this.state.templateList[index], {
      $merge: { editable: false },
    });
    const templateList = update(this.state.templateList, {
      $splice: [[index, 1, target]],
    });
    if (target) {
      this.updateTemplate(target);
      delete target.editable;
      this.setState({ templateList }, () => {
        const { onEdit } = this.props;
        if (onEdit) {
          onEdit(templateList[index], index, templateList);
        }
      });
      this.setState({ cacheTemplateData: newData.map(item => ({ ...item })) });
    }
  }

  updateTemplate(row:any) {
    const self = this;
    $.post(
      url.importExportTemplate.updateMongoDB,
      row,
      data => {
        if (data.result) {
          const promptInfo = `当前导入批次号：${data.data.importBatchNum}，已编辑${
            data.data.editedNum
          }条数据，错误且不可导入记录数剩余${data.data.surplusNum}条，请重新进行数据校验。`;
          message.success(data.msg);
          row.errorMessage = data.data.errorMessage;
          row.batchStatus = data.data.status;
          self.setState({
            isSubmitClick: true,
            isCheckClick: false,
            promptInfo,
          });
        } else {
          message.error(data.msg);
          self.setState({ isSubmitClick: true, isCheckClick: false });
        }
      },
      'json'
    );
  }

  cancel(index:any) {
    const cacheTemplateData = { ...this.state.cacheTemplateData[index] };
    cacheTemplateData.editable = false;
    const templateList = update(this.state.templateList, {
      $splice: [[index, 1, cacheTemplateData]],
    });
    this.setState({ templateList });
  }

  back = () => {
    this.props.dispatch({
      type: 'importTemplate/clear',
      payload: {
        templateList: [],
        rowsCount: 0,
      },
    });
    const backUrl = this.state.backUrl;
    if (backUrl != null && backUrl != '') {
      this.props.dispatch(
        routerRedux.push({
          pathname: '/import',
          /* search: queryString.stringify({
            templateId: data.currentTemplateId,
            importBatchNum: data.importBatchNum,
            importBatchStatus: data.status,
          }), */
        })
      );
    } else {
      this.props.history.goBack();
    }
  };

  // 选中行
  onCellSelect = (pmCodeList:any, selectedList:any) => {
    this.setState({
      pmCodeList,
      selectedList,
    });
  };

  // 分页变化
  onPageChange = (page:any, pageSize:any) => {
    this.searchTemplateForRedux(page, pageSize);
  };

  // 每页条数变化
  onPageSizeChange = (pageSize:any) => {
    this.searchTemplateForRedux('1', pageSize);
  };

  // 用state信息搜索模板
  searchTemplateForState = () => {
    const { showStatus } = this.state;
    const { importBatchNum } = this.props;
    this.searchTemplate(showStatus, importBatchNum);
  };

  searchTemplate = (showStatus:any, importBatchNum:any) => {
    this.setState({
      loading: true,
    });
    this.props
      .dispatch({
        type: 'importTemplate/importPage',
        payload: {
          importBatchNum,
          showStatus,
        },
      })
      .then(() => {
        this.setState(() => {
          return {
            loading: false,
            defaultCurrent: 1,
          };
        });
      });
  };

  // 用Redux信息搜索模板
  searchTemplateForRedux = (pageNumber:any, pageSize:any) => {
    this.setState(
      {
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
            type: 'importTemplate/importPage',
            payload,
          })
          .then(() => {
            this.setState(() => {
              return {
                loading: false,
                current: pageNumber,
              };
            });
          });
      }
    );
  };

  operationCallback = (result:any) => {
    if (result.status > 0) {
      message.success(result.message);
      this.searchTemplateForRedux('1',10);
    } else {
      message.error(result.message);
    }
  };

  renderPagination() {
    const { rowsCount } = this.props;
    if (!rowsCount) {
      return;
    }
    return (
      <PaginationComponent
        className={'impexp-pagination-style'}
        defaultCurrent={this.state.defaultCurrent}
        current={this.state.current}
        total={rowsCount}
        onChange={this.onPageChange}
        onPageSizeChange={this.onPageSizeChange}
      />
    );
  }

  renderColumns(text:any, record:any, column:any) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        status={record.status}
        onChange={(value:any) => this.handleChange(value, record, column)}
      />
    );
  }

  handleChange = (value:any, record:any, column:any) => {
    const newData = [...this.state.templateList];
    const target = newData.filter(
      item => record.execlNum + record.hashCode === item.execlNum + item.hashCode
    )[0];
    if (target) {
      target[column] = value;
      this.setState({ templateList: newData });
    }
  };

  renderTable() {
    const templateList = this.state.templateList.map((info:any) => {
      return info;
    });
    const tableWidth = this.columns.reduce((previousValue:any, currentValue:any) => {
      return previousValue + (currentValue.width == null ? 150 : currentValue.width); // 62是勾选框的宽度
    }, 0);
    return (
      <Table
        pagination={false}
        scroll={{ x: tableWidth }}
        dataSource={templateList || []}
        columns={this.columns}
        loading={this.state.loading}
        bordered
      />
    );
  }

  render() {
    const self = this;
    const options = {
      name: 'file',
      action: url.importExportTemplate.importTemplate,
      headers: {
        authorization: 'authorization-text',
      },
      data: {
        templateId: this.props.templateId,
        importBatchNum: this.props.importBatchNum,
      },
      showUploadList: false,
      beforeUpload: this.beforeUpload,
      disabled: this.state.isImportClick,
      onChange(info:any) {
        if (info.file.status === 'done') {
          var result = info.file.response;
          if (result != null && result.result) {
            const promptInfo = `当前导入批次号：${
              result.data.importBatchNum
            }，获取文件原始记录数为${result.data.originalImportNum}条，请执行数据校验。`;
            self.setState({
              promptInfo,
              isCheckClick: false,
              isSubmitClick: true,
            });
            message.success(result.msg);
            self.displayShow('00');
          } else {
            message.error(result.msg);
          }
        } else if (info.file.status === 'error') {
          message.error(result.msg);
        }
      },
    };
    const middleButtonList = [
      {
        text: '数据校验',
        onClick: this.onCheckClick,
        disabled: this.state.isCheckClick,
        style: { marginLeft: '10px' },
      },
      {
        text: '全部提交',
        onClick: this.onSubmitClick,
        disabled: this.state.isSubmitClick,
      },
      {
        text: '下载模板',
        onClick: this.downloadTemplate,
        disabled: this.state.isDownloadTemplate,
      },
    ];
    const menu = (
      <Menu onClick={this.onDisplayClick}>
        <Menu.Item key="00">显示全部记录</Menu.Item>
        <Menu.Item key="30">显示失败记录</Menu.Item>
        <Menu.Item key="10">显示正确记录</Menu.Item>
        <Menu.Item key="20">显示重复记录</Menu.Item>
      </Menu>
    );
    const borderLine = (
      <div>
        <span
          style={{
            width: '4px',
            height: '20px',
            background: '#0078d6',
            display: 'inline-block',
            top: '13px',
            marginTop: '2px',
            verticalAlign: 'sub',
            borderRadius: '2px',
            marginRight: '7px',
          }}
        />
        {this.state.moduleTypeName}导入结果列表
      </div>
    );
    const gobackButton = (
      <Button
        onClick={() => {
          this.back();
        }}
        style={{ float: 'right' }}
      >
        <Icon type="rollback" />
        返回
      </Button>
    );
    const renderProgressjlt=()=>{
      // @ts-ignore
      return  <Progressjlt visible={this.state.progressMask === 'block'} percent={this.state.percent} />;

    }
    return (
      <Card title={borderLine} bordered={false} extra={gobackButton}>
        <div className={'impexp-controller-style'} style={{ borderTop: '1px solid #e9e9e9' }}>
          <div className={'impexp-btn-group'}>
            <Upload {...options} className={'impexp-btn-group'}>
              <Button disabled={this.state.isDisabledImportButton}>导入模板</Button>
            </Upload>

            {buttonGroup(middleButtonList)}

            <Dropdown overlay={menu} placement="bottomCenter">
              <Button>列表过滤</Button>
            </Dropdown>
          </div>
          <div className={'impexp-btn-group'}>
            <h2 className={'impexp-h2-font-size'}>{this.state.promptInfo}</h2>
          </div>

          {this.renderTable()}
          {this.renderPagination()}
          {renderProgressjlt()}
        </div>
      </Card>
    );
  }
}
class Progressjlt extends React.Component<any, any> {
  props:any;
  render() {
    return (
      <Modal
        {...this.props}
        title=""
        mask={false}
        style={{ top: '50%', marginTop: -40 }}
        closable={false}
        footer={null}
      >
        <Progress percent={this.props.percent} />
      </Modal>
    );
  }
}
function mapStateToProps(state:any, props:any) {
  const locationSearch = queryString.parse(props.location.search || '');
  const { templateId, importBatchNum } = locationSearch;
  const { searchParam, templateList, rowsCount } = state.importTemplate;
  return {
    templateId,
    importBatchNum,
    searchParam,
    templateList,
    rowsCount,
  };
}
export default connect(mapStateToProps)(ImportTemplate);
