import React from 'react';
import {HashRouter as Router, Route,} from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import GoodList from "./pages/GoodsList";
import Administrator from './pages/Root/Administrator';
import Login from './pages/Login'
import TokenModal from './component/TokenModal/index'
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


              <Route path="/admin/root/administrator" component={Administrator}></Route>
            </Admin>
          )
        }}>
        </Route>
        <TokenModal></TokenModal>
      </Router>
    </div>
  );
}

export default App;
