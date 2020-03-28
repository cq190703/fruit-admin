import React, {Component} from 'react';
import {Menu} from "antd";
import navData from "./navData";
import {withRouter} from "react-router-dom"

const {SubMenu} = Menu;

class Nav extends Component {

  // 渲染导航
  renderNav(data) {
    return data.map((value, index) => {
      // 如果有children渲染一级
      if (value.children) {
        return (
          <SubMenu key={value.key} title={
            <span>
              {value.icon}
              <span>{value.title}</span>
            </span>
          }>
            {this.renderNav(value.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={value.key} path={value.path}>
            {value.icon}
            <span>{value.title}</span>
          </Menu.Item>
        )
      }
    })
  }
  // 点击跳转路由
  handelClick(e){
    let {path} = e.item.props
    this.props.history.push(path)
  }

  render() {
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{minHeight: '100%', borderRight: 0}}
        theme="dark"
        onClick={this.handelClick.bind(this)}
      >
        {this.renderNav(navData)}
      </Menu>
    );
  }
}

export default withRouter(Nav);