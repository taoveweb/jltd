import * as React from 'react';
import update from 'immutability-helper';
import { DatePicker, Table, Input, Popconfirm, Icon } from 'antd';
import * as moment from 'moment';
const styles = require('./style/index.less');

const EditableCell = (arr: {
  editable: any;
  value: any;
  onChange: any;
  datable: any;
}) => {
  return (
    <div>
      {arr.editable ? (
        arr.datable ? (
          <DatePicker
            style={{ margin: '-5px 0' }}
            onChange={(moments, dateStrings) => {
              arr.onChange(dateStrings, moments);
            }}
            value={arr.value || moment(arr.value)}
          />
        ) : (
          <Input
            style={{ margin: '-5px 0' }}
            value={arr.value}
            onChange={e => arr.onChange(e.target.value)}
          />
        )
      ) : (
        arr.value
      )}
    </div>
  );
};
type TableComponentsState = {
  tableDataSource: any[];
};
interface TableComponents {
  tableColumns: any[];
  isEditable: any;
  isDeleteable: any;
  isAddable: any;
  isSave: any;
  isCancel: any;
  tableData: any;
  onDelete: any;
  onSelect: any;
  onEdit: any;
  onAdd: any;
  selectedRowKeys: any;
  tableWidth: number;
  rowKey: any;
  loading: boolean;
  onChange: any;
  pagination: object | false;
}
class TableComponents extends React.Component<
  TableComponents,
  TableComponentsState
> {
  private columns: any;
  private cacheData: any;

  constructor(props: TableComponents) {
    super(props);
    this.columns = props.tableColumns.map(column => {
      return column.isRenderColumn
        ? column
        : update(column, {
            $merge: {
              render: (text: any, record: any) => {
                const textTemp = column.valueChange
                  ? column.valueChange(text)
                  : text;
                return this.renderColumns(textTemp, record, column.dataIndex);
              },
            },
          });
    });
    const { isEditable, isDeleteable, isAddable, isSave, isCancel } = props;
    if (isEditable || isDeleteable || isAddable) {
      const renderSave = (index: number) => {
        return (
          <a
            onClick={() => this.save(index)}
            style={{ fontSize: '14px', color: '#595959' }}
          >
            {isSave ? '保存' : <Icon type="save" />}
          </a>
        );
      };
      const renderClose = (record: any, index: any) => {
        if (record.isLast) {
          return;
        }
        return (
          <Popconfirm
            title="真的要取消吗?"
            onConfirm={() => this.cancel(index)}
          >
            <a style={{ fontSize: '14px', color: '#595959' }}>
              {isCancel ? '取消' : <Icon type="close" />}
            </a>
          </Popconfirm>
        );
      };
      this.columns.push({
        title: '操作',
        dataIndex: 'operation',
        width: 100,
        fixed: 'right',
        align: 'center',
        render: (text: any, record: any, index: any) => {
          const { editable } = record;
          console.log(text);
          return (
            <div className="editable-row-operations">
              {editable ? (
                <span>
                  {renderSave(index)}
                  <span style={{ marginLeft: '5%' }} />
                  {renderClose(record, index)}
                </span>
              ) : (
                <span>
                  {isEditable && (
                    <a
                      className={styles['icon-style']}
                      onClick={() => this.edit(index)}
                    >
                      <Icon type="edit" />
                    </a>
                  )}
                  {isDeleteable && (
                    <a onClick={() => this.delete(index)}>
                      <Icon type="delete" />
                    </a>
                  )}
                </span>
              )}
            </div>
          );
        },
      });
    }
    this.state = {
      tableDataSource: this.getTableDataSource(
        props.tableData,
        props.isAddable
      ),
    };
    this.cacheData = props.tableData.map((item: any) => ({ ...item }));
  }
  componentWillReceiveProps(nextProps: TableComponents) {
    if (nextProps.tableData && nextProps.tableData !== this.props.tableData) {
      const tableDataSource = this.getTableDataSource(
        nextProps.tableData,
        nextProps.isAddable
      );
      this.cacheData = nextProps.tableData.map((item: any) => ({ ...item }));
      // tableDataSource = tableDataSource.map((info, index) => {
      //   return update(info, {
      //     $merge: { key: index },
      //   });
      // });
      this.setState(
        {
          tableDataSource,
        },
        () => {
          // let haveOperation;
          // this.columns.some(column => {
          //   if (column.dataIndex === 'operation') {
          //     haveOperation = true;
          //   }
          //   return haveOperation;
          // });
          // if (
          //   (this.props.isAddable ||
          //     this.props.isDeleteable ||
          //     this.props.isEditable) &&
          //   !haveOperation
          // ) {
          //   this.columns.push({
          //     title: '操作',
          //     dataIndex: 'operation',
          //     render: (text, record, index) => {
          //       const isLast = tableDataSource.length - 1 === index;
          //       const { editable } = record;
          //       const { isAddable, isEditable, isDeleteable } = this.props;
          //       return (
          //         <div className="editable-row-operations">
          //           {isLast ? (
          //             isAddable && (
          //               <a onClick={() => this.add(record.key)}>添加</a>
          //             )
          //           ) : editable ? (
          //             <span>
          //               <a onClick={() => this.save(record.key)}>保存</a>
          //               <Popconfirm
          //                 title="Sure to cancel?"
          //                 onConfirm={() => this.cancel(record.key)}
          //               >
          //                 <a>取消</a>
          //               </Popconfirm>
          //             </span>
          //           ) : (
          //             <span>
          //               {isEditable && (
          //                 <a onClick={() => this.edit(record.key)}>编辑</a>
          //               )}
          //               {isDeleteable && (
          //                 <a onClick={() => this.delete(record.key)}>删除</a>
          //               )}
          //             </span>
          //           )}
          //         </div>
          //       );
          //     },
          //   });
          // }
        }
      );
    }
  }
  onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(selectedRowKeys, selectedRows);
    }
  };
  getTableDataSource(tableData = [], isAddable = false) {
    let tableDataSource: any = tableData;
    if (isAddable) {
      tableDataSource = update(tableData, {
        $push: [this.getLastTableDataMap(tableData.length)],
      });
    }
    return tableDataSource;
  }
  getLastTableDataMap = (key: any) => {
    // 初始化table最后一行空数据
    const { tableData } = this.props;
    const tableDataInfo = tableData[0] || {};
    const tableDataKey = Object.keys(tableDataInfo);
    const tableDataMap: any = {};
    tableDataKey.forEach(info => {
      tableDataMap[info] = '';
    });
    tableDataMap.editable = true;
    tableDataMap.key = key;
    tableDataMap.isLast = true;
    return tableDataMap;
  };
  handleChange = (value: any, record: any, column: any) => {
    const newData = [...this.state.tableDataSource];
    const target = newData.filter(item => record.key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ tableDataSource: newData });
    }
  };
  delete(index: any) {
    /* const tableDataSource = update(this.state.tableDataSource, {
          $splice: [[index, 1]],
        }); */
    const tableDataSource = this.state.tableDataSource;
    this.setState({ tableDataSource }, () => {
      const { onDelete } = this.props;
      if (onDelete) {
        onDelete(tableDataSource[index], index, tableDataSource);
      }
    });
  }
  edit(index: any) {
    const target = update(this.state.tableDataSource[index], {
      $merge: { editable: true },
    });
    const tableDataSource: any = update(this.state.tableDataSource, {
      $splice: [[index, 1, target]],
    });
    this.setState({ tableDataSource });
  }
  save(index: any) {
    const newData = [...this.state.tableDataSource];
    const target = update(this.state.tableDataSource[index], {
      $merge: { editable: false, isLast: false },
    });
    const tableDataSource: any = update(this.state.tableDataSource, {
      $splice: [[index, 1, target]],
    });
    if (target) {
      delete target.editable;
      this.setState({ tableDataSource }, () => {
        const { onEdit } = this.props;
        if (onEdit) {
          onEdit(tableDataSource[index], index, tableDataSource);
        }
      });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  add(key: any) {
    const { tableDataSource } = this.state;
    const newData = [...this.state.tableDataSource];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      newData.push(this.getLastTableDataMap(tableDataSource.length));
      this.setState({ tableDataSource: newData }, () => {
        const { onAdd } = this.props;
        if (onAdd) {
          onAdd(tableDataSource, key);
        }
      });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(index: any) {
    const tableDataSource: any = update(this.state.tableDataSource, {
      $splice: [[index, 1, this.cacheData[index]]],
    });
    this.setState({ tableDataSource });
  }
  renderColumns = (text: any, record: any, column: any) => {
    return (
      <EditableCell
        editable={record.editable}
        datable={column === 'wiqrProductTime'}
        value={text}
        onChange={(value: any) => this.handleChange(value, record, column)}
      />
    );
  };
  render() {
    const { tableDataSource } = this.state;
    const { selectedRowKeys, rowKey, loading = false } = this.props;
    const rowSelection: object = {
      fixed: 'left',
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <Table
        loading={loading}
        rowKey={rowKey}
        scroll={{ x: 1400 }}
        rowSelection={rowSelection}
        dataSource={tableDataSource}
        columns={this.columns}
        onChange={this.props.onChange} // 分页、排序、筛选变化时触发
        pagination={this.props.pagination || false}
      />
    );
  }
}
export default TableComponents;
