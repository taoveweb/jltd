import * as React from "react";
import { TableProps, TableRowSelection } from "antd/es/table/interface";
import Table from "../table";
// import { FormattedMessage } from "react-intl";

interface Iprops<T> extends TableProps<T> {
  isRowSelect?: boolean;
  scrollWidth?: number | string;
  scrollHeight?: number | string;
  showPagination?: boolean;
  singleExanded?: boolean;
  total?: number;
  rowKey?: string;
  rowSelection?: TableRowSelection<T>;
  onPageChange?: (currentPage: number, size: number) => void;
}
interface IState {
  expandedRowKeys?: string[] | number[];
  selectedRowKeys: string[];
  selectedRows: Object[];
  page: number | string;
  pageSize: number | string;
}
export default class MyTable<T> extends React.Component<Iprops<T>, IState> {
  static defaultProps = {
    isRowSelect: false,
    rowKey: "id",
    scrollWidth: 0,
    scrollHeight: 0,
    showPagination: true,
    singleExanded: false
  };
  constructor(props: Iprops<T>) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      page: 1,
      pageSize: 10,
      expandedRowKeys: []
    };
  }

  // 重组props
  buildPorps = () => {
    const { selectedRowKeys, selectedRows, expandedRowKeys = [] } = this.state;
    const {
      scrollWidth,
      scrollHeight,
      singleExanded,
      showPagination,
      isRowSelect,
      onExpandedRowsChange
    } = this.props;
    return {
      selectedRowKeys,
      selectedRows,
      ...(isRowSelect && this.buildRowSelection()),
      scroll: { x: scrollWidth, y: scrollHeight },
      ...this.props,
      pagination:false,
      ...(showPagination && this.buildPagination()),
      expandedRowKeys,
      onExpandedRowsChange: (rows: any) => {
        let resultList;
        if (singleExanded) {
          resultList = rows.filter((item: any) => item !== expandedRowKeys[0]);
        }
        onExpandedRowsChange && onExpandedRowsChange(rows);
        this.setState({ expandedRowKeys: resultList || rows });
      }
    };
  };

  render() {
    let props = this.buildPorps();
    //@ts-ignore
    return <Table {...props} />;
  }

  // 构建 RowSelection对象
  buildRowSelection = () => {
    const { selectedRowKeys } = this.state;
    const { rowSelection } = this.props;
    return {
      rowSelection: {
        ...rowSelection,
        selectedRowKeys,
        onChange: (selectedRowKeys: any, selectedRows: any) => {
          this.setSelectRows(selectedRows);
          // this.setSelectedRowKeys(selectedRowKeys);
          rowSelection &&
            rowSelection.onChange &&
            rowSelection.onChange(selectedRowKeys, selectedRows);
        },
        onSelect: (
          record: any,
          selected: any,
          selectedRows: any,
          nativeEvent: any
        ) => {
          this.setSelectRows(selectedRows);
          rowSelection &&
            rowSelection.onSelect &&
            rowSelection.onSelect(record, selected, selectedRows, nativeEvent);
        },
        onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
          this.setSelectRows(selectedRows);
          rowSelection &&
            rowSelection.onSelectAll &&
            rowSelection.onSelectAll(selected, selectedRows, changeRows);
        },
        onSelectInvert: (selectedRows: any) => {
          this.setSelectRows(selectedRows);
          rowSelection &&
            rowSelection.onSelectInvert &&
            rowSelection.onSelectInvert(selectedRows);
        }
      }
    };
  };

  //设置选中keys
  setSelectedRowKeys = (selectedRowKeys = []) => {
    let { rowKey = "id", dataSource=[] } = this.props;
    let selectedRows = dataSource.filter(
      //@ts-ignore
      (item: never) => selectedRowKeys.indexOf(item[rowKey]) >= 0
    );
    this.setState({ selectedRowKeys, selectedRows });
  };

  //设置选中rows
  setSelectRows = (selectedRows: Array<any> = []) => {
    let { rowKey = "id" } = this.props;
    let selectedRowKeys = selectedRows.map(item => item[rowKey]);
    this.setState({ selectedRows, selectedRowKeys });
  };

  //清除选择项
  clearSelectRowKeys = () => {
    this.setState({
      selectedRowKeys: [],
      selectedRows: []
    });
  };

  //重置分页器
  resetPagination = (params: any) => {
    this.setState({
      page: 1,
      pageSize: 10,
      ...params
    });
  };

  //重置展开项
  resetExpanded = (expandedRowKeys = []) => {
    this.setState({ expandedRowKeys });
  };

  //重组pagination的数据
  buildPagination = () => {
    const { total = 100, onPageChange, pagination } = this.props;
    const { page, pageSize } = this.state;
    return {
      pagination: {
        total,
        showTotal: (total: any) => ( `总共 ${total} 个项目`),
        showSizeChanger: true,
        showQuickJumper: true,
        current: Number(page),
        pageSize: Number(pageSize),
        ...pagination,
        onChange: (page: any, pageSize: any) => {
          this.setState({
            page,
            pageSize
          });
          onPageChange && onPageChange(page, pageSize);
        },
        onShowSizeChange: (currentPage: any, size: any) => {
          this.setState({
            page,
            pageSize: size
          });
          onPageChange && onPageChange(currentPage, size);
        }
      }
    };
  };
}
