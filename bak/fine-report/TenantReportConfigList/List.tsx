import { message, Modal } from 'antd';
import classnames from 'classnames';
import { connect } from 'dva';
import update from 'immutability-helper';
import * as React from 'react';

import { buttonGroup, LabelWithController, Table } from '../components';
import DetailModal from './DetailModal';

//import { buttonGroup, LabelWithController, Table } from 'components';
require('./List.less');

const List = ({
  customCommon,
  loading,
  dispatch,
  form,
}: any) => {
  const { customDetailPage, selectedRowKeys }: any = customCommon;

  const onChange = (text: string, definedId: string, key: string) => {
    let index = null;
    customDetailPage.some((item: any, indexTemp: any) => {
      if (item.definedId !== definedId) {
        return false;
      }

      index = indexTemp;
      return true;
    });

    if (index === null) {
      message.error('数据异常，请刷新重试');
      return;
    }

    const info = customDetailPage[index];
    const newInfo = update(info, {
      $merge: {
        [key]: text,
      },
    });
    const detail = update(customDetailPage, {
      $splice: [[index, 1, newInfo]],
    });

    dispatch({
      type: 'customCommon/updateState',
      payload: { customDetailPage: detail },
    });
  };

  const onCancel = () => {
    dispatch({
      type: 'customColumnInfo/updateState',
      payload: {
        visible: false,
      },
    });
  };

  const onOk = (list: any) => {
    const data = list.map((info: { id: string }) => {
      return update(info, {
        $merge: {
          definedId: info.id,
        },
      });
    });
    const newCustomDetailPage = update(customDetailPage, {
      $push: data,
    });

    dispatch({
      type: 'customColumnInfo/updateState',
      payload: {
        visible: false,
      },
    });
    dispatch({
      type: 'customCommon/updateState',
      payload: {
        customDetailPage: newCustomDetailPage,
      },
    });
  };

  const renderInput = (
    title: any,
    text: any,
    definedId: any,
    key: any,
    rules: any,
  ) => {
    const info = {
      id: `${definedId}-${key}`,
      label: title,
      type: 'input',
      value: text,
      onChange: (value: any) => {
        onChange(value, definedId, key);
      },
      rules,
    };
    return <LabelWithController key={info.id} {...info} form={form} />;
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'listCode',
      key: 'listCode',
      width: 300,
      // @ts-ignore
      render: (text, record, index: any) => {
        return index + 1;
      },
    },
    {
      title: '字段名',
      dataIndex: 'propertyName',
      key: 'propertyName',
      width: 250,
    },
    {
      title: '标题名称',
      dataIndex: 'columnName',
      key: 'columnName',
      width: 250,
    },
    {
      title: '自定义扩展属性(JSON格式)',
      dataIndex: 'extendProperty',
      key: 'extendProperty',
      width: 250,
      render: (text: any, rowData: any) =>
        renderInput(
          '自定义扩展属性(JSON格式)',
          text,
          rowData.definedId,
          'extendProperty',
          [{ max: 800 }],
        ),
    },
  ];

  const getIndex = (list: any, value: any) => {
    let selectIndex;
    list.some((info: any, index: Number) => {
      if (info.id === value) {
        selectIndex = index;
        return true;
      }
      return false;
    });
    return selectIndex;
  };

  const operateButton: any = [
    {
      text: '新增',
      type: 'ghost',
      onClick: () => {
        dispatch({
          type: 'customColumnInfo/updateState',
          payload: {
            visible: true,
          },
        });
      },
    },
    {
      text: '删除',
      type: 'ghost',
      onClick: () => {
        if (!selectedRowKeys.length) {
          message.error('请至少选择一条记录!');
          return;
        }

        Modal.confirm({
          title: `确定要删除${selectedRowKeys.length} 条记录吗？`,
          cancelText: '取消',
          okText: '删除',
          iconType: 'exclamation-circle',
          onOk: () => {
            const newCustomDetailPage = customDetailPage.filter((info: any) => {
              return !selectedRowKeys.includes(info.id); // todo key
            });

            dispatch({
              type: 'customCommon/updateState',
              payload: { customDetailPage: newCustomDetailPage },
            });

            // 删除勾选状态
            dispatch({
              type: 'customCommon/updateState',
              payload: {
                selectedRowKeys: [],
              },
            });
          },
        });
      },
    },
    {
      text: '上升',
      type: 'ghost',
      onClick: () => {
        if (!selectedRowKeys[0]) {
          message.error('请至少选择一条记录');
          return;
        }

        const firstKey = selectedRowKeys[0];
        const firstIndex = getIndex(customDetailPage, firstKey);

        if (!firstIndex) {
          message.error('第一条数据不能上升，请重新选择数据');
          return;
        }

        let newCustomDetailPage = customDetailPage;
        selectedRowKeys.forEach((selectKey: any) => {
          const selectIndex: any = getIndex(newCustomDetailPage, selectKey);
          const deleteDetail = update(newCustomDetailPage, {
            $splice: [[selectIndex, 1]],
          });
          newCustomDetailPage = update(deleteDetail, {
            $splice: [[selectIndex - 1, 0, newCustomDetailPage[selectIndex]]],
          });
        });
        // if (newCustomDetailPage === 0) {
        //   message.error('第一条数据不能上升，请重新选择数据');
        //   return;
        // }
        // debugger;
        dispatch({
          type: 'customCommon/updateState',
          payload: { customDetailPage: newCustomDetailPage },
        });
      },
    },
    {
      text: '下降',
      type: 'ghost',
      onClick: () => {
        if (!selectedRowKeys[0]) {
          message.error('请至少选择一条记录');
          return;
        }

        const lastKey = selectedRowKeys[selectedRowKeys.length - 1];
        const lastIndex = getIndex(customDetailPage, lastKey);

        if (lastIndex === customDetailPage.length - 1) {
          message.error('最后一条数据不能下降，请重新选择数据');
          return;
        }

        selectedRowKeys.reverse();
        let newCustomDetailPage = customDetailPage.reverse();
        selectedRowKeys.forEach((selectKey: any) => {
          const selectIndex: any = getIndex(newCustomDetailPage, selectKey);
          const deleteDetail = update(newCustomDetailPage, {
            $splice: [[selectIndex, 1]],
          });
          newCustomDetailPage = update(deleteDetail, {
            $splice: [[selectIndex - 1, 0, newCustomDetailPage[selectIndex]]],
          });
        });
        // debugger;
        selectedRowKeys.reverse();
        dispatch({
          type: 'customCommon/updateState',
          payload: { customDetailPage: newCustomDetailPage.reverse() },
        });
      },
    },
  ];

  const idList = customDetailPage.map((info: any) => info.definedId || info.id);

  return (
    <div>
      <div className="menu-btn-group">{buttonGroup(operateButton)}</div>
      <Table
        // @ts-ignore
        dataSource={customDetailPage}
        pagination={false}
        loading={loading.effects['customCommon/getCustomDetailPage']}
        className={classnames('jlt-mt-20')}
        columns={columns}
        rowKey={(record: any) => record.id}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: any) => {
            const sortKeys: any = [];
            customDetailPage.forEach((info: any) => {
              if (keys.includes(info.id)) {
                sortKeys.push(info.id);
              }
            });
            dispatch({
              type: 'customCommon/updateState',
              payload: {
                selectedRowKeys: sortKeys,
              },
            });
          },
        }}
      />
      <DetailModal onCancel={onCancel} onOk={onOk} idList={idList} />
    </div>
  );
};

export default connect(({ loading, customCommon }: any) => ({
  customCommon,
  loading,
}))(List);
