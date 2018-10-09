import { BrowserRouter, Link, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { UserDemo } from './pages/userDemo';
import AuthDemo from './pages/authDemo';
import UtilsDemo from './pages/utilsDemo';
import './index.scss';

const App = () => (
  <div>
    <nav>
      <Link to="/utilsDemo">Utils Demo</Link>
      <Link to="/userDemo">User Demo</Link>
      <Link to="/authDemo">Auth Demo</Link>
    </nav>
    <div>
      <Route path="/userDemo" exact component={UserDemo} />
      <Route path="/authDemo" exact component={AuthDemo} />
      <Route path="/utilsDemo" exact component={UtilsDemo} />
    </div>
  </div>
);

ReactDOM.render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'),
);

