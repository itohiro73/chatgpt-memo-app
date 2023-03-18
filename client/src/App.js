import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [memos, setMemos] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/memos')
      .then((response) => response.json())
      .then((data) => setMemos(data));
  }, []);

  const handleClickMemo = (memo) => {
    setSelectedMemo(memo);
  };

  const handleBackToList = () => {
    setSelectedMemo(null);
  };

  if (selectedMemo) {
    return (
      <div className="container">
        <a href="#" onClick={handleBackToList} className="back-to-list">
          Back to list
        </a>
        <div className="memo">
          <h2>{selectedMemo.title}</h2>
          <p>{selectedMemo.content}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Memo List</h1>
        <ul className="memo-list">
          {memos.map((memo) => (
            <li
              key={memo.id}
              className="memo-item"
              onClick={() => handleClickMemo(memo)}
            >
              {memo.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
