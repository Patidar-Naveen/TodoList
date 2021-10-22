import './App.css';
import Login from './component/Login';
import Registration from './component/Registration';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Home from './component/Home';

function App() {
  return (
    <>
   <Router>
     <Switch>
       <Route exact path="/home" component={Home}/>
       <Route exact path="/" component={Login}/>
       <Route exact path="/registration" component={Registration}/>
       
     </Switch>
   </Router>
    
    </>
  );
}

export default App;
