import React, {Component} from 'react';
import {Badge, Button, Table} from "antd";
import api from "../../../api/order.js"
import OrderStatusEnum from "../OrderStatusEnum";

// 订单列表
class OrderList extends Component {
  state = {
    columns: [
      {title: '订单号', dataIndex: '_id', key: '_id',},
      {
        title: '订单状态', dataIndex: 'order_status', key: 'order_status', render: (order_status) => {
          let temp = {
            [OrderStatusEnum.CANCELED]: {status: "default", msg: "已取消"},
            [OrderStatusEnum.SUBMIT]: {status: "error", msg: "待付款"},
            [OrderStatusEnum.PAID]: {status: "warning", msg: "待发货"},
            [OrderStatusEnum.SENDED]: {status: "processing", msg: "待收货"},
            [OrderStatusEnum.FINISH]: {status: "default", msg: "已完成"}
          }
          return (<Badge status={temp[order_status].status} text={temp[order_status].msg}/>)
        }
      },
      {
        title: '创建日期', dataIndex: 'create_time', key: 'create_time', render: (create_time) => {
          return new Date(create_time).toLocaleString()
        }
      },
      {title: '用户账号', dataIndex: 'user_id', key: 'user_id', render: user_id => user_id.username},
      {
        title: '订单总价', dataIndex: 'price', key: 'price', render: (price) => {
          return "￥" + price
        }
      },
      {title: '收货人', dataIndex: 'consignee', key: 'consignee',},
      {title: '收货人电话', dataIndex: 'tel', key: 'tel',},
      {title: '收货地址', dataIndex: 'address', key: 'address',},
      {
        title: '操作', key: 'action', render: (data) => {
          return (
            <div>
              <Button type='' onClick={() => {
                let {_id} = data
                this.props.history.push("/admin/orderDetail/" + _id)
              }}>订单详情</Button>
              <Button type='danger' onClick={() => {
                this.del(data)
              }}>删除</Button>
            </div>
          )
        }
      },
    ],
    list: []
  }

  // 删除
  del = (data) => {
    let {_id} = data
    api.delOrder(_id).then(data => {
      this.refreshData();
    })
  }

  // 刷新数据
  refreshData = () => {
    api.getOrder().then(data => {
      this.setState({list: data.data})
      console.log(this.state.list)
    })
  }

  componentDidMount() {
    this.refreshData();
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