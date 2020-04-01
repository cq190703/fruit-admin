import axios from 'axios'
import store from '../store/store'
import actionCreator from '../store/actionCreator';


axios.interceptors.request.use(function (config) {
  // console.log(config)
  let token = localStorage.getItem('token')||'no token';
  config.headers.authorization = 'Bearer ' + token
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  let{ err,msg } = response.data
  console.log(err,msg)
  if(err===402){
    let action = actionCreator.changeTokenModal(true)
    store.dispatch(action)
  }
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axios



