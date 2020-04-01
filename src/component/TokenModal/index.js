import React, { Component, Fragment } from 'react'
import { Modal } from 'antd'
import actionCreator from '../../store/actionCreator'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

 class TokenModal extends Component {
   stata={
    visible:true
   }
  
    handleOk=()=>{
      this.props.changeTokenModal(false)
      this.props.history.replace('/login')
    }
    render() {
      let {tokenModal} = this.props

    return (
    <Fragment>
      {!tokenModal||
        <Modal
          title="token失效，请重新登陆"
          visible={true}
          onOk={this.handleOk}
        >
          <p>傻逼，请重新登陆</p>
          <p>傻逼，请重新登陆</p>
          <p>傻逼，请重新登陆</p>
        </Modal>
      }
    </Fragment>
    )
  }
}

export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionCreator,dispatch)
})(withRouter(TokenModal))

