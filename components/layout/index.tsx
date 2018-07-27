import * as React from 'react';
import { Layout } from 'antd';
 
 const Header =Layout.Header;
 const Content=Layout.Content;
 const Sider =Layout.Sider;
 const Footer=Layout.Footer;
 class JltLayout extends React.Component{
    static Header: typeof Header;
    static Content: typeof Content;
    static Sider: typeof Sider;
    static Footer: typeof Footer;
    render() {
        return (
            <Layout {...this.props}/>
        )
    }
}

JltLayout.Header = Header;
JltLayout.Content = Content;
JltLayout.Sider = Sider;
JltLayout.Footer = Footer;

export default JltLayout;