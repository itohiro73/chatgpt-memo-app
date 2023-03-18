import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MemoList from './pages/MemoList';
import CreateMemo from './pages/CreateMemo';
import UpdateMemo from './pages/UpdateMemo';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact component={MemoList} />
          <Route path="/create" component={CreateMemo} />
          <Route path="/update/:id" component={UpdateMemo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
