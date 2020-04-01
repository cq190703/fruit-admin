import React, { Component } from 'react'
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './index.module.less'
import api from '../../api/admin'

 class Login extends Component {
  onFinish(e){
    let { userName,passWord } = e;
    api.login({userName,passWord})
    .then((data)=>{
      console.log(data)
      if(data.code===0){
        localStorage.setItem('token',data.token)
        message.success('登陆成功，3秒钟后跳转首页',3,()=>{
          this.props.history.replace('/admin')
        })
      }else{
        message.error('用户名或者密码错误，请重新输入')
      }
    })
    
    // console.log(e)
  }
  // componentDidMount() {
    // console.log(this)
  // }
  render() {
    return (
      <div className={style.body}>
        <div className={style.box}>
            <h1>欢迎光临，皇上</h1>
            <Form
            name="normal_login"
            className="style.login_form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish.bind(this)}
          >
            <Form.Item
              name="userName"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="passWord"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="style.login_form_forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="style.login_form_button">
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login
