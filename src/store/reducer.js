import state from './state'
import { CHANGE_TOKEN_MODAL } from './actionType'
export default (prestate = state ,action)=>{
  let newData = JSON.parse(JSON.stringify(prestate))
  let { type,payload } = action
   switch (type) {
     case CHANGE_TOKEN_MODAL:
      newData.tokenModal = payload
      break;
      default:
        break;
   }  
   return newData
}