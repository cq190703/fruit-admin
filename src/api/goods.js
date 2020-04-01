import axios from '../utils/axios'
class Goods{
    list(page=1,pageSize=3){
        let url='mall/goods/'
        return axios.get(url,{params:{page,pageSize}})
    }
    del(_id){
        let url='mall/goods/del'
        return axios.delete(url,{params:{_id}})
    }
    putaway(_id,putaway){
        let url='mall/goods/state'
        return axios.post(url,{_id:_id,putaway:putaway})
    }
    add(obj){
        let url='mall/goods/add'
        return axios.post(url,obj)
        
    }
    findOne(id){
        let url ='/mall/goods/find'
        return axios.get(url,{params:{id}})
    }
    update(_id,obj){
        let news={_id:_id,obj:obj}
        let url ='/mall/goods/update'
        return axios.post(url,news)
    }
}


export default new Goods()