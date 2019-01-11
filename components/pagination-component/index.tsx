import * as React from 'react';
import { Pagination } from 'antd';
import classnames from 'classnames';
// 分页 props 可选: defaultCurrent 当前分页默认是1 pageSize 分页条数 默认为全局配置的PageSize
// onPageSizeChange  pageSize 变化的回调 className 必须: onChange 页码改变的回调 total 总数
function showTotal(total: any) {
  return `总共 ${total} 个项目`;
}
type PaginationComponentState = {
  current: any;
  pageSize: any;
};

interface PaginationComponentProps {
  defaultCurrent?: number;
  current?: number;
  pageSize?: number;
  className?: any;
  pageSizeOptions?: any;
  total: number;
  onChange: (a?: number, b?: number) => void;
  onPageSizeChange?: (a?: number) => void;
}
class Paginationcomponent extends React.Component<
  PaginationComponentProps,
  PaginationComponentState
  > {
  constructor(props: PaginationComponentProps) {
    super(props);
    const { defaultCurrent, pageSize } = props;
    this.state = {
      current: defaultCurrent || 1,
      pageSize: pageSize || 10,
    };
  }

  componentWillReceiveProps(nextProps: PaginationComponentProps) {
    if (nextProps.current && nextProps.current !== this.state.current) {
      this.setState({ current: nextProps.current });
    }
  }

  onChange = (page: number, pageSize: number) => {
    this.setState(
      {
        current: page,
      },
      () => {
        const { onChange } = this.props;
        onChange(page, pageSize);
      }
    );
  };

  onPageSizeChange = (current: number, size: number) => {
    this.setState(
      {
        pageSize: size,
        current,
      },
      () => {
        const { onPageSizeChange } = this.props;
        const { pageSize } = this.state;
        if (onPageSizeChange) {
          onPageSizeChange(pageSize);
        }
      }
    );
  };

  render() {
    const { className, total } = this.props;
    const { current, pageSize } = this.state;
    // const pageSize = Math.ceil(total /);
    return (
      <div className={classnames(className, 'self-pagination-style')}>
        <Pagination
          current={current}
          total={total}
          pageSize={pageSize}
          onChange={this.onChange}
          showSizeChanger
          showQuickJumper
          showTotal={showTotal}
          onShowSizeChange={this.onPageSizeChange}
          pageSizeOptions={this.props.pageSizeOptions || ['10', '20', '30', '40']}
        />
      </div>
    );
  }
}
export default Paginationcomponent;
