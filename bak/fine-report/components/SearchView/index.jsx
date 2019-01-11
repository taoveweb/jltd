import * as React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from 'antd';
import classNames from 'classnames';
// @ts-ignore
import queryString from 'query-string';
// @ts-ignore
import moment from 'moment';
import "./index.less";
import { buttonGroup, LabelWithController } from "../../components";
class SearchView extends React.PureComponent {
    constructor(props) {
        super(props);
        // 预处理url数据
        this.changeType = (query) => {
            const { searchViewList } = this.props;
            const newQuery = Object.assign({}, query);
            searchViewList.forEach((item) => {
                // 下拉框，并且key是number类型的情况，转换为number作为value
                if (item.type === 'select' &&
                    !!newQuery[item.id] &&
                    item.optionData.every((temp) => typeof temp.key === 'number')) {
                    newQuery[item.id] = Number(newQuery[item.id]);
                }
                // 多级选择框，当只有1个值的时候，需要包裹一层数组
                if (item.type === 'cascader' &&
                    newQuery[item.id] !== undefined &&
                    !Array.isArray(newQuery[item.id])) {
                    newQuery[item.id] = [newQuery[item.id]];
                }
                // 月份控件
                if (item.type === 'monthPicker' && !!newQuery[item.id]) {
                    newQuery[item.id] = moment(newQuery[item.id]);
                }
            });
            return newQuery;
        };
        this.changeOpenOnClick = () => {
            this.setState({
                open: !this.state.open,
            });
        };
        this.onSearchClick = () => {
            const { onSearchClick, form: { getFieldsValue }, } = this.props;
            let fields = getFieldsValue();
            onSearchClick && onSearchClick(fields);
        };
        this.onResetClick = () => {
            const { notClear, onResetClick, form: { getFieldsValue, setFieldsValue, resetFields }, } = this.props;
            if (notClear) {
                resetFields();
                this.onSearchClick();
                return;
            }
            onResetClick && onResetClick();
            const fields = getFieldsValue();
            for (let item in fields) {
                if ({}.hasOwnProperty.call(fields, item)) {
                    if (fields[item] instanceof Array) {
                        fields[item] = [];
                    }
                    else {
                        fields[item] = undefined;
                    }
                }
            }
            setFieldsValue(fields);
            // this.onSearchClick();
        };
        this.state = {
            open: false,
        };
        this.lastSearch = null;
    }
    componentDidMount() {
        const { form: { setFieldsValue }, } = this.props;
        const { location } = this.context;
        location.query = queryString.parse(location.search);
        setTimeout(() => {
            setFieldsValue(this.changeType(location.query));
        }, 0);
    }
    componentWillReceiveProps() {
        const { location } = this.context;
        if (this.lastSearch !== location.search) {
            this.lastSearch = location.search;
            location.query = queryString.parse(location.search);
        }
    }
    render() {
        const { hiddenResetBtn = false, searchViewList = [], disableAutoWidth = false, form, } = this.props;
        const className = (searchViewList.length <= 2 || disableAutoWidth) &&
            'div-unauto-width';
        const renderControllerList = searchViewList.map((info) => {
            if (info.type === 'select') {
                info.getPopupContainer = (triggerNode) => triggerNode.parentNode;
            }
            return (<LabelWithController key={info.label} {...info} form={form} className={className}/>);
        });
        const topButtonList = [
            {
                text: '搜索',
                onClick: this.onSearchClick,
            },
            { text: '重置', type: 'default', onClick: this.onResetClick },
        ];
        if (hiddenResetBtn) {
            topButtonList.splice(1, 1);
        }
        const showMoreBtn = searchViewList.length > 6;
        let text = '更多';
        let iconType = 'down';
        if (this.state.open) {
            text = '收起';
            iconType = 'up';
        }
        const moreBtn = (<div className={'open-btn'} onClick={this.changeOpenOnClick}>
        {text}
        <Icon className={'icon'} type={iconType}/>
      </div>);
        return (<div className={classNames('jlt-search-view', (!showMoreBtn || this.state.open) && 'jlt-search-view-open')}>
        <div className={classNames(searchViewList.length > 2 &&
            !disableAutoWidth &&
            'search-controller')}>
          {renderControllerList}
        </div>
        <div className={'search-btn-group'}>
          <div className={'search-btn'}>
            {buttonGroup(topButtonList)}
          </div>
          {showMoreBtn && moreBtn}
        </div>
      </div>);
    }
}
SearchView.contextTypes = {
    location: PropTypes.object,
};
export default Form.create({
    validateMessages: require('../../utils/formValidatorMessage').messages,
})(SearchView);
