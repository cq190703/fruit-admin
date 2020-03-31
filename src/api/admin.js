import axios from '../utils/axios'

class Admin {
  login(payload) {
    let url = 'mall/admin/login'
    return axios.post(url,payload)
    // .then((data)=>{console.log(data)})
  }
  list() {
    let url = 'mall/admin/find'
    return axios.get(url)
  }
  add(payload) {
    let url = 'mall/admin/create'
    return axios.post(url,payload)
  }
  del(_id) {
    console.log(_id)
    let url = 'mall/admin/del'
    return axios.post(url,{_id:_id})
  }

}




export default new Admin()