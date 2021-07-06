import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/Routes/PrivateRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Pages
import Home from './pages/home/';


const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
        <Switch>
          <Route>
            <PrivateRoute exact path="/" component={Home} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;