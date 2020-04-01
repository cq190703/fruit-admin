import axios from '../utils/axios'

export default {

  // 查询所有订单
  getOrder() {
    return axios.get("mall/order/")
  },

  // 删除订单
  delOrder(_id) {
    return axios.get("mall/order/delOrderById?_id=" + _id)
  },

  //查询详情
  getOrderById(_id) {
    return axios.get("mall/order/getOrderById?_id=" + _id)
  },

  //改变订单状态
  changeStatus({_id, status}) {
    return axios.post("mall/order/changeStatus", {_id, status})
  }
}