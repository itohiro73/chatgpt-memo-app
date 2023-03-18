import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [memos, setMemos] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newMemoTitle, setNewMemoTitle] = useState('');
  const [newMemoContent, setNewMemoContent] = useState('');

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

  const handleNewMemoSubmit = () => {
    const newMemo = {
      title: newMemoTitle,
      content: newMemoContent,
    };

    fetch('http://localhost:3000/memos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMemo),
    })
      .then((response) => response.json())
      .then((data) => {
        setMemos([...memos, data]);
        setNewMemoTitle('');
        setNewMemoContent('');
      });
  };

  const handleMemoUpdateSubmit = () => {
    const updatedMemo = {
      ...selectedMemo,
      title: newMemoTitle,
      content: newMemoContent,
    };

    fetch(`http://localhost:3000/memos/${updatedMemo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMemo),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedMemos = memos.map((memo) =>
          memo.id === data.id ? data : memo
        );
        setMemos(updatedMemos);
        setSelectedMemo(data);
        setEditing(false);
      });
  };

  const startEditing = () => {
    setNewMemoTitle(selectedMemo.title);
    setNewMemoContent(selectedMemo.content);
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  if (selectedMemo) {
    if (editing) {
      return (
        <div className="container">
          <h1>Edit Memo</h1>
          <input
            type="text"
            placeholder="Title"
            value={newMemoTitle}
            onChange={(e) => setNewMemoTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={newMemoContent}
            onChange={(e) => setNewMemoContent(e.target.value)}
          />
          <button onClick={handleMemoUpdateSubmit}>Update</button>
          <button onClick={cancelEditing}>Cancel</button>
        </div>
      );
    } else {
      return (
        <div className="container">
          <a href="#" onClick={handleBackToList} className="back-to-list">
            Back to list
          </a>
          <div className="memo">
            <h2>{selectedMemo.title}</h2>
            <p>{selectedMemo.content}</p>
          </div>
          <button onClick={startEditing}>Edit</button>
        </div>
      );
    }
  } else {
    return (
      <div className="container">
        <h1>Memo List</h1>
        <ul>
          {memos.map((memo) => (
            <li key={memo.id}>
              <a href="#" onClick={() => handleClickMemo(memo)}>
                {memo.title}
              </a>
            </li>
          ))}
        </ul>
        <h2>Create a new memo</h2>
        <input
          type="text"
          placeholder="Title"
          value={newMemoTitle}
          onChange={(e) => setNewMemoTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={newMemoContent}
          onChange={(e) => setNewMemoContent(e.target.value)}
        />
        <button onClick={handleNewMemoSubmit}>Create</button>
      </div>
    );
  }
}

export default App;

