import { message } from 'antd';
import urls from './url';
import Enum from './enum';
import EmptyUtils from './emptyUtils';
/**
 * 
 * 配置自定义方法
 */
const initColumns = (listCode:any, self:any) => {
	// 跟具listCode获取data
	var dataList:any = [];
	$.ajax({
		url : urls.nav.initColumns,
		data : {"listCode" : listCode},
		cache : false, 
		async : false,
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			if (data.result) {
				for (var i = 0; i < data.data.length; i++) {
					dataList.push({
						"dataIndex" : data.data[i].propertyName,
						"title" : escapeString(data.data[i].columnName),
						"extAttr" : data.data[i].extendProperty
					});
				}
			} else {
				message.error("没有找到列表配置信息");
				return;
			}

		},
		error : function() {
			
		}
	});
	
	var data = dataList;
	var columns:any = [];
	$.each(data, (i, item) => {
		console.log(i);
		var column:any = {
			dataIndex : item.dataIndex,
			title : item.title
		};
		if (item.extAttr) {
			var extAttr = $.parseJSON(item.extAttr);
			for ( var m in extAttr) {
				column[m] = calculateObjectValue(m,extAttr[m], self);
			}
		}
		columns.push(column);
	});
	return columns;
}

const escapeString = (text:any) => {
	if (text == null)
		text = "";
	text = text.replace(/\&lt;/g, "\<");
	text = text.replace(/\&gt;/g, "\>");
	return text;
}

// @ts-ignore
const calculateObjectValue = (key:any,value:any,self:any) => {
	var func:any = value;
	var columnCommon:any
	if (typeof func === 'string') {
		func = self[value];
		
		if(func == null){
			func = columnCommon[value];
		}
	}
	if (typeof func === 'object') {
		return func;
	}
	if (typeof func === 'function') {
		return func;
	}
	if (typeof func === 'boolean') {
		return func;
	}
	return value;
}

const defaultPageParam = () =>{
	const param= [];
	param.push({
		name : 'pageNumber',
		value : Enum.DEFAULT_PAGE_NUMBER
	})
	param.push({
		name : 'pageSize',
		value : Enum.DEFAULT_PAGE_SIZE
	})
	return param;
}
const pageParam = (pageNumber:any,pageSize:any) =>{
	const param= [];
	param.push({
		name : 'pageNumber',
		value : pageNumber
	})
	param.push({
		name : 'pageSize',
		value : pageSize
	})
	return param;
}

const pagination=()=>{
return{
		showQuickJumper:true,
		defaultCurrent:1,
		showSizeChanger:true,
		showTotal:(total:any)=>`总共 ${total} 个项目`
	}
		
}
/**
 * 格式化数字
 */
const formatNum = (value:any, point:any) => {
	let result:any = "";
	if (!EmptyUtils.isNotEmpty(value)) {
		return result;
	}
	result = Number(value).toFixed(point);
	if (isNaN(result)) {
		return result;
	}
	return result;
}

export default {
	initColumns,
	escapeString,
	calculateObjectValue,
	defaultPageParam,
	pageParam,
	pagination,
	formatNum,
};