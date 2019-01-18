---
order: 0
title:
  zh-CN: 基本用法
---

## zh-CN



````jsx
import { TableComponents } from 'jltd';


const tableColumns = [
      {
        title: '货主',
        dataIndex: 'ownerName',
        key: 'ownerName',
        width: 155,
      },
      {
        title: '商品编码',
        dataIndex: 'wiqrSkuCode',
        key: 'wiqrSkuCode',
        width: 155,
      },
      {
        title: '商品名称',
        dataIndex: 'wiqrSkuName',
        key: 'wiqrSkuName',
        width: 155,
      },
      {
        title: '源头供应商编码',
        dataIndex: 'wiqrSourceSupplierCode',
        key: 'wiqrSourceSupplierCode',
        width: 155,
      },
      {
        title: '源头供应商名称',
        dataIndex: 'wiqrSourceSupplierName',
        key: 'wiqrSourceSupplierName',
        width: 155,
      },
      {
        title: '生产日期',
        dataIndex: 'wiqrProductTime',
        key: 'wiqrProductTime',
        width: 155,
      },
      {
        title: '上传时间',
        dataIndex: 'wiqrUploadTime',
        key: 'wiqrUploadTime',
        isRenderColumn: true,
        width: 155,
      },
      {
        title: '报告来源',
        dataIndex: 'reportSource',
        key: 'reportSource',
        isRenderColumn: true,
        width: 155,
      },
      {
        title: '附件查看',
        dataIndex: 'd',
        key: 'd',
        isRenderColumn: true,
        width: 155,
      },
    ];

const tableData = [];

ReactDOM.render(
  <TableComponents
    tableData={[]}
    tableColumns={tableColumns}
    isEditable={true} 
    isDeleteable={true}
    isAddable={true}
    isSave={true} 
    isCancel={true} 
    onDelete={()=>{}} 
    onSelect={()=>{}} 
    onEdit={()=>{}}
    onAdd={()=>{}}
    onChange={()=>{}}
    selectedRowKeys={"3"}
    tableWidth={1111}
    rowKey={"3"}
    loading={false}
    pagination={false}
   />,
  mountNode
);
````
 