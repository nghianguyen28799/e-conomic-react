import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './component/join';
import Chat from './component/chat';
function App() {
  return (
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" exact component={Chat} />
    </Router>
  );
}

export default App;
