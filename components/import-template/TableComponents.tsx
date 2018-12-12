// @ts-ignore
import React, { Component } from 'react';
import update from 'immutability-helper';
import { Table, Input, Popconfirm, Icon } from 'antd';

const EditableCell = ({ editable, value, onChange }: any) => {
  return (
    <div>
      {editable ? (
        <Input
          style={{ margin: '-5px 0' }}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        value
      )}
    </div>
  );
};

class TableComponents extends Component<any, any> {
  columns: any;

  cacheData: any;

  constructor(props: any) {
    super(props);
    this.columns = props.tableColumns.map((column: any) => {
      if (column.render != null) {
        return column;
      }
      return update(column, {
        $merge: {
          render: (text: any, record: any) => {
            const textTemp = column.valueChange ? column.valueChange(text) : text;
            let type = '';
            if (this.props.labelTypes) {
              this.props.labelTypes.map((data: any) => {
                if (data.keyName == column.dataIndex) {
                  type = data.type;
                }
              });
            }
            if (type === 'a') {
              return this.renderAColumns(textTemp, record, column);
            }
            return this.renderColumns(textTemp, record, column.dataIndex);
          },
        },
      });
    });
    const { isEditable, isDeleteable, isAddable } = props;
    if (isEditable || isDeleteable || isAddable) {
      const renderSave = (index: any) => {
        return (
          <a onClick={() => this.save(index)}>
            <Icon type="save" />
          </a>
        );
      };
      const renderClose = (record: any, index: any) => {
        if (record.isLast) {
          return;
        }
        return (
          <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(index)}>
            <a>
              <Icon type="close" />
            </a>
          </Popconfirm>
        );
      };
      this.columns.push({
        title: '操作',
        dataIndex: 'operation',
        width: 100,
        render: (text: any, record: any, index: any) => {
          const { editable } = record;
          return (
            <div title={text} className="editable-row-operations">
              {editable ? (
                <span>
                  {renderSave(index)}
                  {renderClose(record, index)}
                </span>
              ) : (
                <span>
                  {isEditable && (
                    <a className="impexp-icon-style" onClick={() => this.edit(index)}>
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
      tableDataSource: this.getTableDataSource(props.tableData, props.isAddable),
    };
    this.cacheData = props.tableData.map((item: any) => ({ ...item }));
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.tableData && nextProps.tableData !== this.props.tableData) {
      const tableDataSource = this.getTableDataSource(nextProps.tableData, nextProps.isAddable);
      // tableDataSource = tableDataSource.map((info, index) => {
      //   return update(info, {
      //     $merge: { key: index },
      //   });
      // });
      this.setState(
        {
          tableDataSource,
        },
        () => {}
      );
    }
  }

  onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(selectedRowKeys, selectedRows);
    }
  };

  getTableDataSource(tableData: Array<any> = [], isAddable: boolean = false) {
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
    const tableDataSource = update(this.state.tableDataSource, {
      $splice: [[index, 1]],
    });
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
    const tableDataSource = update(this.state.tableDataSource, {
      $splice: [[index, 1, target]],
    });
    this.setState({ tableDataSource });
  }

  save(index: any) {
    const newData = [...this.state.tableDataSource];
    const target = update(this.state.tableDataSource[index], {
      $merge: { editable: false, isLast: false },
    });
    const tableDataSource = update(this.state.tableDataSource, {
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
    const tableDataSource = update(this.state.tableDataSource, {
      $splice: [[index, 1, this.cacheData[index]]],
    });
    this.setState({ tableDataSource });
  }

  renderColumns = (text: any, record: any, column: any) => {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={(value: any) => this.handleChange(value, record, column)}
      />
    );
  };

  renderAColumns = (text: any, record: any, column: any) => {
    return (
      <a
        href="javascript:void(0);"
        onClick={() => {
          column.onClick(record);
        }}
      >
        {text}
      </a>
    );
  };

  render() {
    const { tableDataSource } = this.state;
    const { selectedRowKeys, rowKey, loading = false } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const width = (1920 - 278) / this.columns.length;
    const columns = this.columns.map((item: any) => {
      const newItem = { ...item };
      newItem.width = width;
      return newItem;
    });
    const tableWidth1 = 1920 - 278;
    return (
      <Table
        loading={loading}
        rowKey={rowKey}
        scroll={{ x: tableWidth1 }}
        rowSelection={rowSelection}
        bordered
        dataSource={tableDataSource}
        columns={columns}
        onChange={this.props.onChange} // 分页、排序、筛选变化时触发
        pagination={this.props.pagination || false}
      />
    );
  }
}
export default TableComponents;
