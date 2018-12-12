import * as React from 'react';
import {Form, Modal,Row, Col, Table, Input,message} from 'antd';
const FormItem = Form.Item;
const styles = require('./style/index.less');
import buttonGroup from '../button-group';
import EmptyUtils from '../_util/emptyUtils';
import update from 'immutability-helper';
export interface ModalSearchComponentControllerProps {
  visible:boolean,
  onCancel:(e?:any)=>void, 
  onChangeVisible:Function, 
  queryList:Function,
  dataSource:any,
  columns:any,
  moadlObject:any,
  //searchParam:any
  modalTitle:String,
  //dispatch?:any,
  //url:String,
  //hiddenField?:any,
  type?:String,
  //async?:boolean,
  form:any
}
export interface ModalSearchComponentControllerState {
  categoryCurrent:Number,
  selectCategoryRow:Array<any>,
  selectedRowKeys:Array<any>,
  categoryDataSource:Array<any>,
  selectOwnerRow:Array<any>,
  ownerRecord:Array<any>
}
class ModalSearchComponent extends React.Component<ModalSearchComponentControllerProps,ModalSearchComponentControllerState> {
    constructor(props:ModalSearchComponentControllerProps){
        super(props)
        this.state={
            categoryCurrent: 1,
            selectCategoryRow: [],
            selectedRowKeys: [], 
            categoryDataSource: [],
            selectOwnerRow:[],
            ownerRecord:[],
        }
    }
    componentWillReceiveProps(nextProps:any){
      
      if(nextProps.visible!=this.props.visible){
        // debugger
        //this.queryCategoryList();
        this.setState({
          selectedRowKeys:[],
          selectCategoryRow:[],
          categoryCurrent: 1,
        })
      }
    }
    categoryCurrentChangePage = (page:any) => {
  
        this.setState({ categoryCurrent: page });
    }
    resetCategoryForm = () => {
        this.props.form.resetFields();
    }
    onSelectCategoryChange = (record:any, selected:any) => {
      this.setState({
        selectCategoryRow: selected,
        selectedRowKeys: record
      });
    }
    onClickRow = (record:any) => {
      const recordId = record.id;
      const isCheck = this.props.type;
      if(isCheck=='checkbox'){
        let recordUpdate:any=[];
        let selectedRowKeysUpdate:any=[];
      //判断是否为第一次点击。
      if(this.state.selectedRowKeys.length==0){
        recordUpdate=update(this.state.selectCategoryRow,{
          $push: [record]
        });
        selectedRowKeysUpdate=update(this.state.selectedRowKeys,{
          $push: [recordId],
        });
      }else{
        //判断是否取消复选框。 isCheckedSelectCategoryRow
        const isCheckedSelectedRowKeys = this.state.selectedRowKeys.filter(selectedRowKeys=>selectedRowKeys==recordId);
        // const isCheckedSelectCategoryRow = this.state.selectCategoryRow.filter(selectCategoryRow=>selectCategoryRow.id==recordId);
        if(isCheckedSelectedRowKeys.length==0){
          recordUpdate=update(this.state.selectCategoryRow,{
            $push: [record]
          });
          selectedRowKeysUpdate=update(this.state.selectedRowKeys,{
            $push: [recordId],
          });
        }else{
          //查找在数组里面相同的索引。
          let idx = this.state.selectedRowKeys.findIndex(function(value) {
            return value == recordId;
          });
          // debugger
          //删除在数组里面相同的key值。
          recordUpdate=update(this.state.selectCategoryRow,{
            $splice: [[idx,1]]
          });
          selectedRowKeysUpdate=update(this.state.selectedRowKeys,{
            $splice: [[idx,1]] 
          });
        }
      }
      
        this.setState({
          selectCategoryRow: recordUpdate,
          selectedRowKeys: selectedRowKeysUpdate
        },function(){
          // debugger
          this.onSelectCategoryChange(this.state.selectedRowKeys,this.state.selectCategoryRow);
        });
      }else{

        let selectedRowKeys = [];
        let selectedRows = [];
        selectedRowKeys.push(record.id);
        selectedRows.push(record);

        this.onSelectCategoryChange(selectedRowKeys, selectedRows);
      }
      
    };
    //双击回填
    onDoubleRow = (record:any) =>{
      const recordId = record.id;
      const isCheck = this.props.type;
      if(isCheck=='checkbox'){
        debugger
        let recordUpdate:any=[];
        let selectedRowKeysUpdate:any=[];
        const isCheckedSelectedRowKeys = this.state.selectedRowKeys.filter(selectedRowKeys=>selectedRowKeys==recordId);
        // const isCheckedSelectCategoryRow = this.state.selectCategoryRow.filter(selectCategoryRow=>selectCategoryRow.id==recordId);
        if(isCheckedSelectedRowKeys.length==0){
          recordUpdate=update(this.state.selectCategoryRow,{
            $push: [record]
          });
          selectedRowKeysUpdate=update(this.state.selectedRowKeys,{
            $push: [recordId],
          });
        }else if(isCheckedSelectedRowKeys.length==1){
          recordUpdate=this.state.selectCategoryRow;
          selectedRowKeysUpdate=this.state.selectedRowKeys;
        }

        this.setState({
          selectCategoryRow: recordUpdate,
          selectedRowKeys: selectedRowKeysUpdate
        },function(){
          // debugger
          this.onSelectCategoryChange(this.state.selectedRowKeys,this.state.selectCategoryRow);
          this.categoryFormCreate();
        });
      }else{
        let selectedRowKeys = [];
        let selectedRows = [];
        selectedRowKeys.push(record.id);
        selectedRows.push(record);

        this.onSelectCategoryChange(selectedRowKeys, selectedRows);
        this.categoryFormCreate();
      }
      
    }
    categoryFormCreate = () => {
      debugger
      const selectedRows = this.state.selectCategoryRow;
      if (EmptyUtils.isEmpty(selectedRows)) {
        message.error("请先选择一条数据");
        return;
      }
      if (0 === selectedRows.length) {
        message.error("请先选择一条数据");
        return;
      }
      if (1 < selectedRows.length) {
        message.error("只能选择一条数据");
        return;
      }
      this.setState({
        selectCategoryRow: [],
        selectedRowKeys: [], 
      });
      const { onChangeVisible } = this.props;
      onChangeVisible(selectedRows[0]);
    }
    categoryFormHide = () => {
 
      this.setState({
        selectCategoryRow: []
      })
    }
    queryCategoryList = () => {
      const { queryList } = this.props;
      queryList(this.props.form.getFieldsValue());
    }
    render() {
      const { 
          visible,
          form, 
          onCancel,
          moadlObject,
          modalTitle
      } = this.props;
      
      const rowSelect:any = {
        selectedRowKeys: this.state.selectedRowKeys,
        onChange: this.onSelectCategoryChange,
        type:this.props.type||'checkbox'
      };
      const pagination:any ={
        showQuickJumper: true,
        defaultCurrent: 1,
        current: this.state.categoryCurrent,
        onChange: this.categoryCurrentChangePage,
        showSizeChanger: true,
        showTotal: (total:any) => `总共 ${total} 个项目`
      }
      const { getFieldDecorator } = form;

      const topButtonList = [
        { text: '搜索', onClick: this.queryCategoryList, type: 'primary' },
        { text: '重置', onClick: this.resetCategoryForm },
      ];
      return (
        <Modal title={modalTitle} visible={visible} onOk={this.categoryFormCreate}
          onCancel={onCancel} destroyOnClose={true} width={800} className={'ant-modal-search-component'}>
          <Row className={styles['display-flex']}>
            <Col className={styles['serach-form-row3']}> {
              <Form>
                {
                  moadlObject.map((moadlObject:any)=>{

                    return(
                      <Col span={12} key={moadlObject.label}>
                        <FormItem label={moadlObject.label} colon={moadlObject.colon}>
                          {getFieldDecorator(moadlObject.getFieldDecorator,{initialValue: moadlObject.initialValue})(<Input autoComplete={'off'} />)}
                        </FormItem>
                      </Col>
                    )                    
                  })
                }
              </Form>
            } </Col>
            <Col className={styles['serach-form-row2-button']}>
              <div className={styles['search-btn-group']}>
                <div> {buttonGroup(topButtonList)} </div>
              </div>
            </Col>
          </Row>
          <Table 
            rowSelection={rowSelect} 
            rowKey={(record:any) => record.id} 
            dataSource={this.props.dataSource} 
            bordered 
            columns={this.props.columns} 
            pagination={pagination}
            onRow={(record) => {
              
              return {
                onDoubleClick: () => {
                  this.onDoubleRow(record);
                },
                onClick: ()=>{  

                  this.onClickRow(record);
                },                    
              };
            }} 
          />
        </Modal>
      )
    }
  }
  export default Form.create({})(ModalSearchComponent);
  