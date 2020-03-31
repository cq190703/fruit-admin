import React, { Component } from 'react'
import { Card,Table,Button,Modal,Input,message,Popconfirm} from 'antd'
import api from '../../../api/admin'
import { UserOutlined,SmileOutlined,StarFilled } from '@ant-design/icons';
export default class Administrator extends Component {
  state={
    columns : [
      {title:'等级',dataIndex:'leavel',key:'leavel',},
      {title:'_id',dataIndex:'_id',key:'_id',},
      {title:'用户名',dataIndex:'userName',key:'userName',},
      {title:'密码',dataIndex:'passWord',key:'passWord', render:(record)=>{
        return(
          <div>**🐑🐷🐶🐭**</div>
        )
      }},
      {title:'操作',key:'action',render:(record)=>{
        console.log(record)
        return(
          <div>
            <Popconfirm
              title='你确认要删除这条信息吗'
              onConfirm = {()=>{
                this.del(record._id)
              }}
              onCancel = {this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type='danger' >删除</Button>
            </Popconfirm>
          </div>
        )
      }}
      // {title:'操作',dataIndex:'dd',key:'action',}
    ],
    dataSource:[],
    visible: false,
    confirmLoading: false,
  }
  cancel(){
    message.error('取消删除');
  }
  del= async (_id)=>{
    console.log(_id)
    let result = await api.del(_id)
    console.log(result)
    if(result.err===0){
      message.success('删除成功')
      this.getList()
    }
  }
  componentDidMount(){
    this.getList()
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = async () => {
    console.log(this)
    this.setState({
      confirmLoading: true,
    });
    let userName = this.refs.us.state.value
    let passWord = this.refs.ps.state.value
    let leavel = this.refs.lev.state.value
    console.log(userName,passWord,leavel)
    let result = await api.add({userName,passWord,leavel})
    if(result.err === 0){
      message.success('管理员添加成功')
      this.setState({
        confirmLoading: false,
        visible: false,
      });
      this.getList()
    }

  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  getList = async()=>{
    let result = await api.list()
    this.setState({dataSource:result.msg})
  }
  render() {
    let { columns,dataSource } = this.state
    let { visible,confirmLoading } = this.state
    console.log(columns)
    return (
      <div>
        <Card title='管理员列表'>
          <Button type="primary" onClick={()=>{
            this.showModal()
          }}>新增管理员</Button>
          <Modal
          title="管理员添加"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <div>
          {/* <Input size="large" placeholder="large size" prefix={<UserOutlined />} /> */}
            <Input size="large" placeholder='用户名'  prefix={< UserOutlined />} style={{marginBottom:'10px',}} ref='us' />
            <Input size="large" placeholder='密码'  prefix={< SmileOutlined />} style={{marginBottom:'10px',}} ref='ps' />
            <Input size="large" placeholder='等级'  prefix={< StarFilled />}  style={{marginBottom:'10px',}} ref='lev' />
          </div>
        </Modal>
          <Table dataSource={dataSource} columns={columns} rowKey='_id'/>
        </Card>
      </div>
    )
  }
}
