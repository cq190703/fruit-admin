import React, {Component} from 'react';
import {Alert, Button, message, Descriptions, Spin, Steps, Table} from 'antd';
import api from "../../../api/order"
import style from "./index.module.less"
import {TagFilled, WarningTwoTone} from '@ant-design/icons';
import OrderStatusEnum from "../OrderStatusEnum";

const {Step} = Steps;

class OrderDetail extends Component {
  state = {
    isLoading: true,

    // 订单信息
    order_status: 0,
    _id: "",
    user_id: {
      username: ""
    },
    price: 0,
    consignee: "",
    tel: 0,
    address: "",
    items: [],
    create_time: "",
    updatedAt: "",

    goodsColumns: [
      {
        title: '商品标题', dataIndex: ['goods_id'], key: 'title', render: (goods_id) => {
          return goods_id ? goods_id.title : <p><WarningTwoTone/>无此商品或商品已被删除</p>
        }
      },
      {title: '商品名称', dataIndex: ['goods_id', 'name'], key: 'name',},
      {
        title: '商品图片', dataIndex: ['goods_id', 'img'], key: 'img', render: (img) => {
          return (<img src={img} alt="" style={{width: 100}}/>)
        }
      },
      {title: '购买数量', dataIndex: ['buy_count'], key: 'buy_count',},
      {title: '单价', dataIndex: ['buy_count'], key: 'buy_count',},
    ]
  }

  // 时间格式化
  dateFormat(date) {
    return new Date(date).toLocaleString('chinese', {hour12: false})
  }

  // 删除订单
  del() {
    let {_id} = this.state
    api.delOrder(_id).then(data => {
      message.success('删除成功');
      this.props.history.replace("/admin/order")
    })
  }

  // 改变订单状态
  changeStatus(status) {
    let {_id} = this.state
    api.changeStatus({_id, status}).then(data => {
      if (data.code === 0) {
        this.refresh();
      }
    })
  }

  refresh() {
    this.setState({isLoading: true})
    let {id} = this.props.match.params
    api.getOrderById(id).then(data => {
      this.setState({...data.data})
      this.setState({isLoading: false})
    })
  }

  componentDidMount() {
    this.refresh()
  }

  render() {
    let {isLoading, order_status, _id, user_id, price, tel, address, items, create_time, consignee} = this.state
    let orderStatus = {
      [OrderStatusEnum.CANCELED]: {status: "warning", msg: "已取消"},
      [OrderStatusEnum.SUBMIT]: {status: "warning", msg: "待付款"},
      [OrderStatusEnum.PAID]: {status: "warning", msg: "待发货"},
      [OrderStatusEnum.SENDED]: {status: "info", msg: "待收货"},
      [OrderStatusEnum.FINISH]: {status: "success", msg: "已完成"}
    }
    return (
      <div className={style.OrderDetail}>
        <Spin spinning={isLoading} size="large">
          <Steps current={order_status > 0 ? order_status + 1 : order_status} labelPlacement="vertical" size="small">
            <Step title="提交订单" description={this.dateFormat(create_time)}/>
            <Step title="支付订单"/>
            <Step title="发货"/>
            <Step title="收货"/>
          </Steps>

          <Alert type={orderStatus[order_status].status} className={style.statusAlert} showIcon message={
            <div>
              <p>当前订单状态：{orderStatus[order_status].msg}</p>
              <div className={style.btns}>
                <div className={style.leftBtn}>
                  {/*如果状态在 代发货才显示*/}
                  {order_status === OrderStatusEnum.PAID ? <Button onClick={() => {
                    this.changeStatus(2)
                  }}>订单发货</Button> : ''}
                  <Button onClick={() => {
                    this.changeStatus(-1)
                  }}>取消订单</Button>
                </div>
                <div className={style.rightBtn}>
                  <Button type="primary" danger onClick={() => this.del()}>删除订单</Button>
                </div>
              </div>
            </div>
          }>
          </Alert>
          <h3 className={style.columnTitle}><TagFilled className={style.icon}/>基本信息</h3>
          <Descriptions layout="vertical" bordered column={10}>
            <Descriptions.Item label="订单编号">{_id}</Descriptions.Item>
            <Descriptions.Item label="用户账号">{user_id.username}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{create_time}</Descriptions.Item>
            <Descriptions.Item label="订单金额">{price}</Descriptions.Item>
            <Descriptions.Item label="备注">暂无</Descriptions.Item>
          </Descriptions>

          <h3 className={style.columnTitle}><TagFilled className={style.icon}/>收货人信息</h3>
          <Descriptions layout="vertical" bordered column={4}>
            <Descriptions.Item label="收货人">{consignee}</Descriptions.Item>
            <Descriptions.Item label="手机号码">{tel}</Descriptions.Item>
            <Descriptions.Item label="收货地址">{address}</Descriptions.Item>
          </Descriptions>

          <h3 className={style.columnTitle}><TagFilled className={style.icon}/>商品信息</h3>
          <Table dataSource={items} columns={this.state.goodsColumns} rowKey="_id" bordered
                 pagination={false}/>
        </Spin>
      </div>
    );
  }
}

export default OrderDetail;