//这里是大臣
import { CHANGE_TOKEN_MODAL } from './actionType'
export default {
  changeTokenModal(boolean) {
    return {
      type:CHANGE_TOKEN_MODAL,
      payload:boolean
    }
  }
}