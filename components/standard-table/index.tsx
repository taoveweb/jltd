import * as React from 'react';
import { Table } from 'antd';
import classNames from 'classnames';

function initTotalList(columns: any) {
  const totalList: Array<any> = [];
  columns.forEach((column: any) => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}
type StandardTableState = {
  selectedRowKeys: undefined[];
  needTotalList: any[];
};

interface StandardTableProps {
  loading: any;
  rowKey: any;
  columns: any;
  selectedRows: any;
  onSelectRow: any;
  data: any;
  prefixCls?: string;
  className?: string;
  onChange: (a: any, b: any, c: any) => void;
}
class StandardTable extends React.PureComponent<StandardTableProps, StandardTableState> {
  constructor(props: StandardTableProps) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);
    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  componentWillReceiveProps(nextProps: StandardTableProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      this.setState({
        selectedRowKeys: [],
        needTotalList,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    let needTotalList = [...this.state.needTotalList];
    needTotalList = needTotalList.map(item => {
      return {
        ...item,
        total: selectedRows.reduce((sum: any, val: any) => {
          return sum + parseFloat(val[item.dataIndex]);
        }, 0),
      };
    });
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }
    this.setState({ selectedRowKeys });
  };

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    this.props.onChange(pagination, filters, sorter);
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { className, prefixCls = 'ant-standardTable' } = this.props;
    const { selectedRowKeys } = this.state;
    const {
      data: { list, pagination },
      loading,
      columns,
      rowKey,
    } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const rowSelection: object = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: (record: any) => ({
        disabled: record.disabled,
      }),
    };
    const classes = classNames(prefixCls, className);

    return (
      <div className={classes}>
        <Table
          loading={loading}
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection || null}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}
export default StandardTable;
