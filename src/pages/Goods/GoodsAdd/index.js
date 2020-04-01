import React, {Component} from 'react';
import {Card,message} from 'antd'
import goodsApi from '../../../api/goods'
import style from './index.module.less'

class GoodsAdd extends Component {
  state = {
    "title":"进口新奇士美国脐橙 6个装 单个重200-250g",
    "name":'橙子',
    "desc":'http://img.weiye.me/zcimgdir/image/20170314164738_57779.jpg',
    "img":"http://img.weiye.me/zcimgdir/album/file_58c7ae18b0a08.jpg",
    "putaway":0,
    "originalPrice":0,
    "presentPrice":0,
    "sales":0,
    "unit":"斤"
  }
  submit=async()=>{
    let {err,msg}=await goodsApi.add(this.state)
    if(err!==0){return message.error(msg)}
    this.props.history.replace('/admin/goods/list')
   }
  render() {
    let {title,name,desc,img,putaway,originalPrice,presentPrice,sales,unit} = this.state
    return (
      <div className={style.box}>
        <Card title='商品添加'>
        名称:<input type='text' value={name} onChange={(e)=>{
          this.setState({name:e.target.value})
        }}/><br/>
        更多:<input type='text' value={title} onChange={(e)=>{
          this.setState({title:e.target.value})
        }}/><br/>
        原价:<input type='number' value={originalPrice} onChange={(e)=>{
          this.setState({originalPrice:e.target.value})
        }}/><br/>
        现价:<input type='number' value={presentPrice} onChange={(e)=>{
          this.setState({presentPrice:e.target.value})
        }}/><br/>
        销量:<input type='number' value={sales} onChange={(e)=>{
          this.setState({sales:e.target.value})
        }}/><br/>
        单位:<input type='text' value={unit} onChange={(e)=>{
          this.setState({unit:e.target.value})
        }}/><br/>
        图片:<input type='text' value={img} onChange={(e)=>{
          this.setState({img:e.target.value})
        }}/><br/>
        详情:<input type='text' value={desc} onChange={(e)=>{
          this.setState({desc:e.target.value})
        }}/><br/>
        状态:<select value={putaway} onChange={(e)=>{
              this.setState({putaway:Number(e.target.value)})
            }}>
              <option value={-1}>下架</option>
              <option value={0}>未上架</option>
              <option value={1}>上架</option>
            </select><br/>
            <button onClick={this.submit}>添加</button>
        </Card>
      </div>
    );
  }
}

export default GoodsAdd;