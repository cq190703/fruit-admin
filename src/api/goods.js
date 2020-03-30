import axios from '../utils/axios'
class Goods{
    list(page=1,pageSize=3){
        let url='api/goods/'
        return axios.get(url,{params:{page,pageSize}})
    }
}


export default new Goods()