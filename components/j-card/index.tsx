import * as React from 'react';
import classNames from 'classnames';


const PureComponent= React.PureComponent;
export interface JCardProps{
  title:String,
  children:any,
  viewStyle?:String,
  viewsunStyle?:String
}
export default class Jcard extends PureComponent<JCardProps> {
    render() {
        const { title, children } = this.props;

        return (
            <div className={this.props.viewStyle || classNames('card-view')}>
                <div className={this.props.viewsunStyle ||classNames('title-div')}>{title}</div>
                {children}
            </div>
        );
    }
}
