import * as React from 'react';
import { PageHeaderLayout, SearchView, FrTable, buttonGroup } from './components';
const menuCode = 'M011103';
// 报表模板列表
export default class ReportDemo extends React.Component {
    constructor(props) {
        super(props);
        this.onSearchClick = (v) => {
            this.printParam = JSON.stringify(v);
            if (this.frtable)
                this.frtable.onSearchClick(v);
        };
        //搜索按钮事件设置
        this.onSearchClick = this.onSearchClick.bind(this);
        //统计报表属性设置
        (this.frTableProps = {
            //统计报表编号
            reportCode: 'RPT20180902000001',
            //no_pageSize 排除分页数，校对偏差功能  mouseenter：鼠标悬停效果  mouseenter_gt ：鼠标悬停效果开始行 mouseenter_lt ：鼠标悬停效果结束行
            param: {
                no_pageSize: 1,
                mouseenter: true,
                mouseenter_gt: 0,
                mouseenter_lt: 100,
            },
        }),
            //打印报表设置
            (this.printCode = 'RPT20180902000002');
    }
    render() {
        const controllerList = [
            {
                id: 'skuName',
                label: '商品名称',
                type: 'input',
                value: '',
            },
        ];
        const operateButton = [
            {
                text: '打印',
                type: 'ghost',
                onClick: () => {
                    if (this.frtable)
                        FrTable.printReport(this.frtable, this.printCode, this.printParam);
                },
                menuCode,
                operateCode: 'BADD0001',
            },
        ];
        return (<PageHeaderLayout title="报表DEMO1">
        <SearchView onSearchClick={this.onSearchClick} searchViewList={controllerList}/>
        <div className="menu-btn-group">{buttonGroup(operateButton)}</div>
        <FrTable {...this.frTableProps} ref={table => (this.frtable = table)}/>
      </PageHeaderLayout>);
    }
}
