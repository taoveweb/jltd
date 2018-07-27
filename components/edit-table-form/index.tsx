import { Form, Table } from 'antd';
import * as React from 'react';
/**
 * 可编辑Table的表单
 */
interface EditTableProps {
  getRefForm: any;
  columns: any;
  dataSource: any;
  loading: any;
  onClickRow: any;
  pagination: any;
  rowSelection: any;
  tableWidth: any;
  form: any;
}

class EditTable extends React.Component<EditTableProps, {}> {
  componentDidMount() {
    if (this.props.getRefForm) {
      this.props.getRefForm(this.props.form);
    }
  }
  render() {
    const {
      columns,
      dataSource,
      loading,
      onClickRow,
      pagination,
      rowSelection,
      tableWidth = 1300,
    } = this.props;
    return (
      <Form>
        <Table
          bordered
          columns={columns}
          dataSource={dataSource || []}
          loading={loading || false}
          pagination={pagination || false}
          rowSelection={rowSelection || null}
          scroll={{ x: tableWidth }}
          onRow={record => ({
            onClick: () => {
              if (rowSelection && onClickRow) {
                onClickRow(record);
              }
            },
          })}
        />
      </Form>
    );
  }
}
const EditTableForm = Form.create()(EditTable);
export default EditTableForm;
