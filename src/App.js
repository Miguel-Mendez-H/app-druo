import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LayoutPrincipal from '../src/layout/layout';

function App() {
  return (
    <Router>
    <div className="App">
      <LayoutPrincipal>
        {/* <Switch>
          <Route exact path="/create-business" component={CreateBusiness} />
          <Route exact path="/list-business" component={ListBusiness} />
        </Switch> */}
        <h1>2123123</h1>
      </LayoutPrincipal>
    </div>
  </Router>
  );
}

export default App;
