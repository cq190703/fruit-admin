import React from 'react';
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import GoodList from "./pages/Goods/GoodsList";
import GoodsChoice from "./pages/Goods/GoodsChoice";
import GoodsAdd from "./pages/Goods/GoodsAdd";
import GoodsUpdate from "./pages/Goods/GoodsUpdate";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/admin" render={() => {
          return (
            <Admin>
              <Route path="/admin/home" component={Home}/>
              <Route path="/admin/goods/list" component={GoodList}/>
              <Route path="/admin/goods/choice" component={GoodsChoice}/>
              <Route path="/admin/goods/add" component={GoodsAdd}/>
              <Route path="/admin/goods/update" component={GoodsUpdate}/>
            </Admin>
          )
        }}>
        </Route>
      </Router>
    </div>
  );
}

export default App;
