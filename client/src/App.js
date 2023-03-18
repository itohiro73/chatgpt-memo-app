import React, { useState, useEffect } from 'react';
import api from './api';

function App() {
  const [memos, setMemos] = useState([]);
  const [newMemoTitle, setNewMemoTitle] = useState('');
  const [newMemoContent, setNewMemoContent] = useState('');

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    const response = await api.get('/memos');
    setMemos(response.data);
  };

  const addMemo = async () => {
    const response = await api.post('/memos', {
      title: newMemoTitle,
      content: newMemoContent,
    });

    setMemos([...memos, response.data]);
    setNewMemoTitle('');
    setNewMemoContent('');
  };

  return (
    <div>
      <h1>Memo App</h1>
      <input
        type="text"
        placeholder="Memo title"
        value={newMemoTitle}
        onChange={(e) => setNewMemoTitle(e.target.value)}
      />
      <textarea
        placeholder="Memo content"
        value={newMemoContent}
        onChange={(e) => setNewMemoContent(e.target.value)}
      />
      <button onClick={addMemo}>Add Memo</button>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <h2>{memo.title}</h2>
            <p>{memo.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

