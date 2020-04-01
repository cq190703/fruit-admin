// 提交>支付>发货>收货>运送中>完成
export default {
  // 已取消
  CANCELED: -1,
  // 已提交、待付款
  SUBMIT: 0,
  // 已付款、代发货
  PAID: 1,
  // 已发货、待收货
  SENDED: 2,
  // 已收货、已完成
  FINISH: 3,
}

// // 已收货
// REVED: 3,