import React, {Component} from 'react';
import {Card,message,Table,Tag,Button,Popconfirm,Pagination} from 'antd'
import goodsApi from '../../../api/goods'
import style from './index.module.less'

class GoodsList extends Component {
  state={
    page:1,
    pageSize:3,
    list:[],
    count:0,
    columns:[
      {title: '_id',dataIndex: '_id',key: '_id',width:120,fixed:'left'},
      {title: '名称',dataIndex: 'name',key: 'name',width:100},
      {title: '更多信息',dataIndex: 'title',key: 'title',width:200},
      {title: '原价',dataIndex: 'originalPrice',key: 'originalPrice',width:100},
      {title: '现价',dataIndex: 'presentPrice',key: 'presentPrice',width:100},
      {title: '销量',dataIndex: 'sales',key: 'sales',width:100},
      {title: '单位',dataIndex: 'unit',key: 'unit',width:60},
      {title: '图片',dataIndex: 'img',key: 'img',width:150,render(img){
          return(
            <img src={img}/>
          )
      }},
      {title: '详情',dataIndex: 'desc',key: 'desc',width:150,render(desc){
        return(
          <img src={desc}/>
        )
    }},
      {title: '状态',dataIndex: 'putaway',key: 'putaway',width:120,render(putaway){
        let obj={'-1':{color:'red',msg:'已下架'},'0':{color:'yellow',msg:'未上架'},'1':{color:'green',msg:'已上架'}}
        return(<Tag color={obj[putaway].color}>{obj[putaway].msg}</Tag>
        )
      }},
      {title: '操作',key: 'action',width:80,fixed:'right',render:(recode)=>{
        return(
          <div className={style.action}>
            <Popconfirm title='你确定要删除该商品嘛?'
            onConfirm={()=>{this.delGoods(recode._id)}}
            >
              <Button type='danger' size='small'>删除</Button>
            </Popconfirm>
            <Popconfirm title='你确定要修改该商品的状态吗?'
            onConfirm={()=>{this.putAwayGoods(recode._id,recode.putaway)}}
            >
              <Button type='warn' size='small'>上架</Button>
            </Popconfirm>
            <Button type='primary' size='small' onClick={()=>{
              // 跳转到修改页面 传递要修改的id 
              this.props.history.replace('/admin/update/'+recode._id)
            }}>修改</Button>
          </div>
        )
      }}
    ]
  }
  componentDidMount(){
    this.getListData()
  }
  //删除商品
  delGoods=async(_id)=>{
    let {err,msg}=await goodsApi.del(_id)
    if(err!==0){return message.error(msg)}
    this.getListData()
  }
  //获取商品信息
  getListData=async()=>{
    let {page,pageSize}=this.state
    let {err,msg,list,count}=await goodsApi.list(page,pageSize)
    if(err!==0){return message.error(msg)}
    this.setState({list,count})
  }
  //更改状态信息
  putAwayGoods=async(_id,putaway)=>{
    console.log(putaway)
    if(putaway ===0||putaway === -1){
      putaway = 1
    }else{
      putaway = 0
    }
    let {err,msg}=await goodsApi.putaway(_id,putaway)
    if(err!==0){return message.error(msg)}
    this.getListData()
  }
  render() {
    let {columns,list,count,pageSize}=this.state
    return (
      <div className={style.box}>
        <Card title='商品列表' className={style.card}>
        <Button type='primary' onClick={()=>{
             this.props.history.push('/admin/add')
           }}>商品添加</Button>
          <Table scroll={ {y:500,x:840} } pagination={false} columns={columns} dataSource={list} rowKey='_id' className={style.table}></Table>
          <Pagination 
              total={count} 
              showQuickJumper 
              pageSize={pageSize}
              onChange={(page,pageSize)=>{
                //只要页码数发生改变就会触发   
                console.log(page)       
                this.setState({page},()=>{
                  this.getListData()
                })   
              }}
              />
        </Card>
      </div>
    );
  }
}

export default GoodsList;