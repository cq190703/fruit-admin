import axios from '../utils/axios'

export default {
  getOrder() {
    return axios.get("mall/order/")
  }
}