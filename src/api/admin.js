import axios from '../utils/axios'

class Admin {
  login(payload) {
    let url = 'mall/admin/login'
    return axios.post(url,payload)
    // .then((data)=>{console.log(data)})
  }




}




export default new Admin()