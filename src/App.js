import React from 'react';
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import GoodList from "./pages/GoodsList";
import Administrator from './pages/Root/Administrator';
function App() {
  return (
    <div className="App">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
