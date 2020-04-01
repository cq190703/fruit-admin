import React, {Component} from 'react';
import {Button, Table, Tag} from "antd";
import api from "../../api/order.js"

// 订单列表
class OrderList extends Component {
  state = {
    columns: [
      {title: '订单号', dataIndex: '_id', key: '_id',},
      {
        title: '订单状态', dataIndex: 'order_status', key: 'order_status', render: (order_status) => {
          let temp = {
            0: {tagColor: "warning", msg: "待付款"},
            1: {tagColor: "error", msg: "待发货"},
            2: {tagColor: "processing", msg: "待收货"},
            3: {tagColor: "", msg: "已完成"}
          }
          return (
            <Tag color={temp[order_status].tagColor}>{temp[order_status].msg}</Tag>)
        }
      },
      {
        title: '创建日期', dataIndex: 'create_time', key: 'create_time', render: (create_time) => {
          return new Date(create_time).toLocaleString()
        }
      },
      {title: '用户账号', dataIndex: 'user_id', key: 'user_id',},
      {
        title: '订单总价', dataIndex: 'price', key: 'price', render: (price) => {
          return "￥" + price
        }
      },
      {title: '收货人电话', dataIndex: 'tel', key: 'tel',},
      {title: '收货地址', dataIndex: 'address', key: 'address',},
      {
        title: '操作', key: 'action', render: () => {
          return (
            <div>
              <Button type=''>订单详情</Button>
              <Button type='danger'>删除</Button>
            </div>
          )
        }
      },
    ],
    list: []
  }

  componentDidMount() {
    api.getOrder().then(data => {
      this.setState({list: data.data})
      console.log(this.state.list)
    })
  }

  render() {
    return (
      <div>
        <Table columns={this.state.columns} dataSource={this.state.list} rowKey="_id" bordered/>
      </div>
    );
  }
}

export default OrderList;