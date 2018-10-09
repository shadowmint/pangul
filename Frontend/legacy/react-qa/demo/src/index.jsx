import { BrowserRouter, Link, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { QuestionsDemo } from './pages/questionsDemo';
import SearchDemo from './pages/searchDemo';
import GlyphDemo from './pages/glyphDemo';
import './index.scss';


const App = () => (
  <div>
    <nav>
      <Link to="/questionsDemo">Questions Demo</Link>
      <Link to="/searchDemo">Search Demo</Link>
      <Link to="/glyphDemo">Glyph Demo</Link>
    </nav>
    <div>
      <Route path="/questionsDemo" component={QuestionsDemo} />
      <Route path="/searchDemo" component={SearchDemo} />
      <Route path="/glyphDemo" component={GlyphDemo} />
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
