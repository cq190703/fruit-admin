import React, {Component} from 'react';
import {Layout} from 'antd';
import {MenuUnfoldOutlined, MenuFoldOutlined,} from '@ant-design/icons';
import Nav from "../../component/Nav";
import style from "./index.module.less"

const {Header, Sider, Content} = Layout;

class Admin extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className={style.main}>
        {/* 侧边栏 */}
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={style.logo}/>
          {/* 导航 */}
          <Nav/>
        </Sider>

        <Layout className={style.siteLayout}>
          <Header className={style.siteLayoutBackground} style={{padding: 0}}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: style.trigger,
              onClick: this.toggle,
            })}
          </Header>

          {/* 内容 */}
          <Content
            className={style.siteLayoutBackground}
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>

        </Layout>
      </Layout>
    );
  }
}

export default Admin;