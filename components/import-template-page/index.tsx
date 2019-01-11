import Button from '../button';
import Card from '../card';
import Dropdown from '../dropdown';
import Icon from '../icon';
import Input from '../input';
import Menu from '../menu';
import message from '../message';
import Modal from '../modal';
import Popconfirm from '../popconfirm';
import Progress from '../progress';
import Table from '../table';
import Upload from '../upload';
import buttonGroup from '../button-group';
import PaginationComponent from '../pagination-component';
// import {
//   Button,
//   Card,
//   Dropdown,
//   Icon,
//   Input,
//   Menu,
//   message,
//   Modal,
//   Popconfirm,
//   Progress,
//   Table,
//   Upload,
//   buttonGroup,
//   PaginationComponent,
// } from 'jltd';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import update from 'immutability-helper';
import * as queryString from 'query-string';
import * as React from 'react';
import * as fetch from 'dva/fetch';
import * as qs from 'qs';//{ parse, stringify }

type PropsType = {
  templateId: string | null;
  importBatchNum: string | null;
  history:any;
  dispatch: any;
  onEdit: any
};

const EditableCell = ({ editable, value, status, onChange }:any) => (
  <div>
    {editable ? (
      <Input style={{ margin: '-5px 0' }} value={value} onChange={(e:any) => onChange(e.target.value)} />
    ) : status === '10' ? (
      <span>{value == null ? '' : value}</span>
    ) : (
      <div className={'error-table-info'}>{value == null ? '' : value}</div>
    )}
  </div>
);

// 学生规则模板
class ImportTemplate extends React.Component<any,any> {
  props: PropsType;
  constructor(props: PropsType) {
    super(props);
    this.state = {
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
      searchParam: {
        pageNumber: 1,
        pageSize: 10,
      },
    };
    //@ts-ignore
    this.columns = [];
  }

  componentDidMount() {
    const { templateId, importBatchNum } = qs.parse(this.props.history.location.search.split('?')[1]);
    //@ts-ignore
    this.state.templateId = templateId;
    //@ts-ignore
    this.state.importBatchNum = importBatchNum;
    this.initData();
    this.queryTableInit();
    this.searchTemplateForState();
  }

  initData = () => {
    const { templateId, importBatchNum } = this.state;
    fetch(
      `../importExportTemplate/findImportTemplate?templateId=${templateId}&importBatchNum=${importBatchNum}`
    )
      .then((res:any)=> res.json())
      .then((data:any) => {
        if(data.code==22){
          return
        }
        this.setState({
          backUrl: data.backUrl,
          moduleTypeName: data.moduleTypeName,
        });
        if (data.batchStatus === '10') {
          this.setState({
            promptInfo: `当前导入批次号：${data.importBatchNum}，请选择导入模板文件`,
          });
        } else {
          this.setState({
            promptInfo: `当前导入批次号：${data.importBatchNum}，获取文件原始记录数为${
              data.originalRecordNum
            }`,
          });
        }

        const importType = data.importType;
        const currentImportFlag = data.currentImportFlag;
        if (importType === 'submit') {
          this.setState({
            progressMask: '',
          });
          this.showSubmitProgress();
        } else if (currentImportFlag === 'true') {
          this.checkExistImport(data);
        }
        this.initButtonStatus(data.batchStatus);
      });
  };

  initButtonStatus = (importBatchStatus:any) => {
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
    const { templateId } = this.state;
    fetch(`../importExportTemplate/findColumn?${qs.stringify({ templateId })}`)
      .then(res => res.json())
      .then(data => {
        if(data.code==22){
          return
        }
        this.queryColumnInit(data);
      });
  };

  queryColumnInit = (data:any) => {
    const self = this;
    //@ts-ignore
    this.columns = [
      {
        title: '操作',
        dataIndex: 'emptyValue',
        width: 100,
        render: (_value:any, row:any, index:any) => {
          const { batchStatus } = self.state;
          if (batchStatus == null || batchStatus != '40') {
            const { editable } = row;
            return (
              <div className="editable-row-operations">
                {editable ? (
                  <span style={{ fontSize: '14px', display: 'block', marginTop: '-10px' }}>
                    <a onClick={() => this.save(index)}>确定</a>
                    <Popconfirm title={'确定取消编辑?'} onConfirm={() => this.cancel(index)}>
                      <a style={{ marginLeft: '10px' }}>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <a onClick={() => this.edit(index)}>
                    <Icon type="edit" className={'inline-operate-icon'} />
                  </a>
                )}
              </div>
            );
          } else {
            return <div />;
          }
        },
      },
      {
        title: '行号',
        dataIndex: 'execlNum',
        width: 80,
        render: (val:any, item:any) => {
          if (item.status == '10') {
            return (
              <div>
                <span>{val == null ? '' : val}</span>
              </div>
            );
          } else {
            return (
              <div className={'error-table-info'}>
                <span>{val == null ? '' : val}</span>
              </div>
            );
          }
        },
      },
      {
        title: '错误原因',
        dataIndex: 'errorMessage',
        width: 150,
        render: (val:any, item:any) => {
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
          } else {
            return (
              <span title={msgTitle}>
                <div
                  className={'error-table-info'}
                  dangerouslySetInnerHTML={{ __html: msg }}
                />
              </span>
            );
          }
        },
      },
    ];

    let extendCount = 1;
    const length = data.length;
    for (var i = 0; i < length; i++) {
      if (data[i].porpertyName != '' && data[i].porpertyName != null) {
        const porpertyName = data[i].porpertyName;
      //@ts-ignore
      this.columns.push({
          title: data[i].columnName,
          dataIndex: porpertyName,
          width: 150,
          render: (text:any, record:any) => this.renderColumns(text, record, porpertyName),
        });
      } else {
        if (data[i].extendMap == null) {
            //@ts-ignore
            this.columns.push({
            title: data[i].columnName,
            dataIndex: `emptyValue${i}`,
            width: 150,
            render: (text:any, record:any) => this.renderColumns(text, record, `emptyValue${i}`),
          });
        } else {
            //@ts-ignore
            this.columns.push({
            title: data[i].columnName,
            dataIndex: `extendMap.extend${extendCount}`,
            width: 150,
            render: (text:any, record:any) =>
              this.renderColumns(text, record, `extendMap.extend${extendCount}`),
          });
        }
        extendCount++;
      }
    }
  };

  checkExistImport = (data:any) => {
    Modal.confirm({
      title: '您还有未提交的数据，是否继续跳转提交？',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        if (data.currentUrl != null && data.currentUrl !== '') {
          this.props.dispatch(
            routerRedux.push({
              pathname: data.currentUrl,
            })
          );
        } else if (data.currentTemplateId != null && data.currentTemplateId !== '') {
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
        } else {
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
        let formData = new FormData();
        formData.append('importBatchNum', importBatchNum);
        formData.append('templateId', templateId);
        fetch(`../importExportTemplate/importTemplateCheck`, {
          method: 'post',
          // body:JSON.stringify({importBatchNum,templateId})
          body: formData,
        })
          .then(res => res.json())
          .then(data => {
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
                  isImportClick: false, // modify 2018.5.25  没有数据之后应该为可导行状态所能应为 false
                  isSubmitClick: true,
                  isCheckClick: true,
                });
              }
            } else {
              self.showCheckProgress();
            }
          });
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
      let formData = new FormData();
      formData.append('importBatchNum', importBatchNum);
      fetch(`../importExportTemplate/getImportProgress`, {
        method: 'post',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.result) {
            const totalNum = data.data.totalNum;
            const currentNum = data.data.currentNum;
            const importStatus = data.data.importStatus;
            const importMsg = data.data.importMsg;
            // const successCount = data.data.successCount;
            // const failCount = data.data.failCount;
            // const repeatCount = data.data.repeatCount;
            let percent = 0;
            if (parseInt(totalNum) !== 0) {
              percent = Math.floor((parseInt(currentNum) / parseInt(totalNum)) * 100);
            }
            if (percent >= 90) {
              this.setState({
                percent: 90,
              });
            } else {
              this.setState({
                percent,
              });
            }
            if (importStatus === '') {
              this.showCheckProgress();
            } else {
              this.setState({
                progressMask: 'none',
                isCheckClick: false,
                isSubmitClick: false,
              });
              if (importStatus === 'true') {
                if (data.data.failCount > 0 || data.data.repeatCount > 0) {
                  this.setState({
                    promptInfo: `当前导入批次号：${
                      data.data.importBatchNum
                    }，数据校验完成，可导入记录数为${data.data.successCount}条，重复数据为${
                      data.data.repeatCount
                    }条，错误且不可导入记录数为${
                      data.data.failCount
                    }条，请重新导入模板或编辑错误数据后重新进行数据校验。`,
                  });
                } else {
                  this.setState({
                    promptInfo: `当前导入批次号：${
                      data.data.importBatchNum
                    }，数据校验成功，请全部提交数据。`,
                  });
                }
              }
              if (importMsg == '校验完成。') {
                message.success(importMsg);
              } else if (importMsg == '校验异常。') {
                message.error(importMsg);
              }
              this.displayShow('00');
            }
          }
        });
    }, 3000);
  };

  // 提交
  onSubmitClick = () => {
    const { importBatchNum, templateId } = this.state;
    const self = this;

    Modal.confirm({
      title: '确定提交数据？',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        self.setState({
          progressMask: 'block',
          percent: 0,
          isImportClick: true,
          isSubmitClick: true,
          isCheckClick: true,
        });

        let formData = new FormData();
        formData.append('importBatchNum', importBatchNum);
        formData.append('templateId', templateId);

        fetch(`../importExportTemplate/importTemplateSumbit`, {
          method: 'post',
          body: formData,
        })
          .then(res => res.json())
          .then(data => {
            if (!data.result) {
              this.setState({
                progressMask: 'none',
                percent: 100,
              });
              if (data.data != null) {
                this.checkExistImport(data.data);
              } else if (data.msg === '数据正在提交中，请稍等！') {
                // PUI.MessageBox.alert(data.msg);
                message.error(data.msg);
                this.setState({
                  isImportClick: true,
                  isSubmitClick: true,
                  isCheckClick: true,
                });
              } else {
                message.error(data.msg);
                this.setState({
                  isImportClick: false,
                });
              }
            } else {
              this.showSubmitProgress();
            }
          });
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
      let formData = new FormData();
      formData.append('importBatchNum', importBatchNum);
      fetch(`../importExportTemplate/getImportProgress`, {
        method: 'post',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.result) {
            const totalNum = data.data.totalNum;
            const currentNum = data.data.currentNum;
            const importStatus = data.data.importStatus;
            const importMsg = data.data.importMsg;
            const successCount = data.data.successCount;
            const allCount = data.data.allCount;
            // const failCount = data.data.failCount;
            // const repeatCount = data.data.repeatCount;
            let percent = 0;
            if (parseInt(totalNum) !== 0) {
              percent = Math.floor((parseInt(currentNum) / parseInt(totalNum)) * 100);
            }
            if (percent >= 90) {
              this.setState({
                percent: 90,
              });
            } else {
              this.setState({
                percent,
              });
            }
            if (importStatus === '') {
              this.showSubmitProgress();
            } else {
              this.setState({
                progressMask: 'none',
                isImportClick: true,
                isCheckClick: true,
                isSubmitClick: true,
                isDisabledImportButton: true,
                batchStatus: '40',
              });
              if (importStatus === 'true') {
                this.setState({
                  promptInfo: `当前导入批次号：${importBatchNum}，获取文件原始记录数为${allCount}条，已导入成功${successCount}条。`,
                });
                this.displayShow('30');
              }
              if (importMsg == '数据提交失败!') {
                message.error(importMsg);
              } else {
                message.success(importMsg);
              }
            }
          }
        });
    }, 3000);
  };

  // 列表过滤
  onDisplayClick = (val:any) => {
    const showStatus = val == null ? '00' : val.key;
    this.displayShow(showStatus);
  };

  displayShow = (val:any) => {
    const { importBatchNum } = this.state;
    const showStatus = val == null ? '00' : val;
    this.setState({
      showStatus,
    });

    this.searchTemplate(showStatus, importBatchNum);
  };

  downloadTemplate = () => {
    const { templateId } = this.state;
    if (document.getElementById('download-iframe') != null) {
      //@ts-ignore
      document.getElementById('download-iframe').remove();
    }
    var iframe = document.createElement('iframe');
    iframe = document.createElement('iframe');
    iframe.id = 'download-iframe';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    iframe.style.height = '0px';
    iframe.src = `../importExportTemplate/downloadTemplate?templateId=${templateId}`;
    document.body.appendChild(iframe);
  };

  beforeUpload = (file:any) => {
    const isExcel =
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel';
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
    //@ts-ignore
    this.cacheTemplateData = newData.map(item => ({ ...item }));
    }
  }

  updateTemplate(row:any) {
    let formData = new FormData();
    for(let key in row){
      if(row[key]){
        formData.append(key,row[key])
      }
    }
    fetch(`../importExportTemplate/updateMongoDB`,{
      method:'post',
      body:formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          const { editedNum, surplusNum } = data.data;
          message.success(data.msg);
          row.errorMessage = data.data.errorMessage;
          row.batchStatus = data.data.status;
          this.setState({
            isSubmitClick: true,
            isCheckClick: false,
            promptInfo: `当前导入批次号：${
              this.state.importBatchNum
            }，已编辑${editedNum}条数据，错误且不可导入记录数剩余${surplusNum}条，请重新进行数据校验。`,
          });
        } else {
          message.error(data.msg);
          this.setState({ isSubmitClick: true, isCheckClick: false });
        }
      });
  }

  cancel(index:any) {
    const templateList = update(this.state.templateList, {
      $splice: [[index, 1, this.state.cacheTemplateData[index]]],
    });
    this.setState({ templateList });
  }

  back = () => {
    const backUrl = this.state.backUrl;
    if (backUrl != null && backUrl != '') {
      this.props.dispatch(
        routerRedux.push({
          pathname: '/import',
          search: queryString.stringify({
            templateId: this.state.currentTemplateId,
            importBatchNum: this.state.importBatchNum,
            importBatchStatus: this.state.status,
          }),
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
    this.setState({current:page, pageSize})
    this.searchTemplateForRedux(page, pageSize);
  };

  // 每页条数变化
  onPageSizeChange = (pageSize:any) => {
    this.searchTemplateForRedux('1', pageSize);
  };

  // 用state信息搜索模板
  searchTemplateForState = () => {
    const { showStatus, importBatchNum } = this.state;

    this.searchTemplate(showStatus, importBatchNum);
  };

  searchTemplate = (showStatus:any, importBatchNum:any) => {
    this.setState({
      loading: true,
    });

    fetch(
      `../importExportTemplate/importPage?${qs.stringify({
        pageNumber: 1,
        pageSize: 10,
        importBatchNum,
        showStatus,
      })}`
    )
      .then(res => res.json())
      .then(res => {
        if(res.code==22){
          return
        }
        this.setState({
          templateList: res.data,
          cacheTemplateData: JSON.parse(JSON.stringify(res.data)),
          rowsCount: res.rowsCount,
          loading: false,
          current: 1,
        });
      });

    // this.props
    //   .dispatch({
    //     type: 'importTemplate/importPage',
    //     payload: {
    //       importBatchNum,
    //       showStatus,
    //     },
    //   })
    //   .then(() => {
    //     this.setState(() => {
    //       return {
    //         loading: false,
    //         current: 1,
    //       };
    //     });
    //   });
  };

  // 用Redux信息搜索模板
  searchTemplateForRedux = (pageNumber:any, pageSize:any) => {
    this.setState(
      {
        loading: true,
      },
      () => {
        const { searchParam, showStatus, importBatchNum } = this.state;
        const payload = update(searchParam, {
          $merge: {
            pageNumber: pageNumber || searchParam.pageNumber,
            pageSize: pageSize || searchParam.pageSize,
          },
        });
        //@ts-ignore
        this.state.searchParam = payload;
        fetch(
          `../importExportTemplate/importPage?${qs.stringify({
            ...payload,
            importBatchNum,
            showStatus,
          })}`
        )
          .then(res => res.json())
          .then(res => {
            if(res.code==22){
              return 
            }
            this.setState({
              templateList: res.data,
          cacheTemplateData: JSON.parse(JSON.stringify(res.data)),
          rowsCount: res.rowsCount,
              loading: false,
            });
          });

        // this.props
        //   .dispatch({
        //     type: 'importTemplate/importPage',
        //     payload,
        //   })
        //   .then(() => {
        //     this.setState(() => {
        //       return {
        //         loading: false,
        //         current: pageNumber,
        //       };
        //     });
        //   });
      }
    );
  };

  operationCallback = (result:any= {}) => {
    if (result.status > 0) {
      message.success(result.message);
      this.searchTemplateForRedux('1',null);
    } else {
      message.error(result.message);
    }
  };

  renderPagination() {
    const { rowsCount } = this.state;
    if (!rowsCount) {
      return;
    }
    return (
      <PaginationComponent
        className={'pagination-style'}
        // defaultCurrent={this.state.defaultCurrent}
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
    const templateList = this.state.templateList.map((info:any,index:any) => {
      return {...info,rowKey:index};
    });
    //@ts-ignore
    const tableWidth = this.columns.reduce((previousValue:any, currentValue:any) => {
      return previousValue + (currentValue.width == null ? 150 : currentValue.width); // 62是勾选框的宽度
    }, 0);

    return (
      <Table
        rowKey='rowKey'
        pagination={false}
        scroll={{ x: tableWidth }}
        dataSource={templateList || []}
        //@ts-ignore
        columns={this.columns}
        loading={this.state.loading}
        bordered={false}
      />
    );
  }

  render() {
    const self = this;
    const options = {
      name: 'file',
      action: '../importExportTemplate/importTemplate',
      headers: {
        authorization: 'authorization-text',
      },
      data: {
        templateId: this.state.templateId,
        importBatchNum: this.state.importBatchNum,
      },
      showUploadList: false,
      beforeUpload: this.beforeUpload,
      disabled: this.state.isImportClick,
      onChange(info:any) {
        const fileList = info.file;
        if (fileList && fileList.error && fileList.error.status === 401) {
          // window.location.href = `../rest/redirect?url=${encodeURIComponent(window.location.href)}`;
          return;
        }
        if (info.file.status === 'done') {
          var result = info.file.response;
          if (result != null && result.result) {
            self.setState({
              promptInfo: `当前导入批次号：${result.data.importBatchNum}，获取文件原始记录数为${
                result.data.originalImportNum
              }条，请执行数据校验。`,
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
        <Menu.Item key="00"> 显示全部记录</Menu.Item>
        <Menu.Item key="30">显示失败记录</Menu.Item>
        <Menu.Item key="10">显示正确记录</Menu.Item>
        <Menu.Item key="20">显示重复记录</Menu.Item>
      </Menu>
    );

    const borderLine = (
      <div style={{fontWeight:'bold'}}>
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

        {`${this.state.moduleTypeName}导入结果列表`}
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

    return (
      <Card title={borderLine} bordered={false} extra={gobackButton} className={'body_import'}>
        <div className={'controller-style'}>
          <div className={'btn-group'}>
            <Upload {...options} className={'btn-group'}>
              <Button disabled={this.state.isDisabledImportButton}>导入模板</Button>
            </Upload>

            {buttonGroup(middleButtonList)}

            <Dropdown overlay={menu} placement="bottomCenter">
              <Button>列表过滤</Button>
            </Dropdown>
          </div>
          <div className={'btn-group'}>
            <h2 className={'h2-font-size'}>{this.state.promptInfo}</h2>
          </div>
          {/* <div className={'table-style'}></div>*/}
          {this.renderTable()}
          {this.renderPagination()}
          {/* <div className={styles.loadingBg} style={{ display: his.state.progressMask }}>
            <div className={styles.loading_gif}>
              <Progress percent={this.state.percent} />
            </div>
          </div> */}
          <Progressjlt visible={this.state.progressMask === 'block'} percent={this.state.percent} />
        </div>
      </Card>
    );
  }
}

class Progressjlt extends React.Component<any,any> {
  constructor(props:any){
    super(props)
  }
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


export default connect(()=>({}))(ImportTemplate);

