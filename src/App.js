import React from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import GoodList from "./pages/Goods/GoodsList";
import GoodsChoice from "./pages/Goods/GoodsChoice";
import GoodsAdd from "./pages/Goods/GoodsAdd";
import GoodsUpdate from "./pages/Goods/GoodsUpdate";
import Administrator from './pages/Root/Administrator';
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/login' component={Login}></Route>
        <Route path="/admin" render={() => {
          return (
            <Admin>
              <Route path="/admin/home" component={Home}/>
              <Route path="/admin/goods/list" component={GoodList}/>
              <Route path="/admin/goods/choice" component={GoodsChoice}/>
              <Route path="/admin/add" component={GoodsAdd}/>
              <Route path="/admin/update/:id" component={GoodsUpdate}/>
              <Route path="/admin/root/administrator" component={Administrator}></Route>
            </Admin>
          )
        }}>
        </Route>
      </Router>
    </div>
  );
}

export default App;
