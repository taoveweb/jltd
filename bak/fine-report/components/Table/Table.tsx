import { Table } from 'antd';
import * as React from 'react';

class TableComponents extends React.Component {
  render() {
    const { columns = [], rowSelection, expandedRowRender }:any = this.props;

    const columnsTemp = [...columns];

    // 勾选框固定
    if (rowSelection && !expandedRowRender) {
      rowSelection.fixed = true;
    }

    const tableWidth = columnsTemp.reduce((previousValue, currentValue) => {
      return previousValue + (currentValue.width || 0); // 62是勾选框的宽度
    }, 62);

    if (tableWidth !== 0 && tableWidth < 1018) {
      console.error('表格宽度错误');
    }

    // 在结尾 或者 操作列前面增加一列不定宽的列，用于动态伸缩
    {
      // 最后一列之后增加一列拉升列
      let addIndex = columnsTemp.length;

      // 没数据
      if (columnsTemp.length === 0) {
        addIndex = 0;
      }

      // 最后一列是浮动的情况
      if (
        columnsTemp[columnsTemp.length - 1] !== null &&
        !!columnsTemp[columnsTemp.length - 1].fixed
      ) {
        addIndex = addIndex - 1;
      }

      columnsTemp.splice(addIndex, 0, [
        [
          {
            title: '',
            dataIndex: 'flex-column',
            key: 'flex-column',
          },
        ],
      ]);
    }

    return (
      <Table
        {...this.props}
        columns={columnsTemp}
        scroll={{ x: tableWidth }}
        rowSelection={rowSelection}
      />
    );
  }
}

export default TableComponents;
