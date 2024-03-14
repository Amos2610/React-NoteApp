import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]); // [ノート1, ノート2, ...
  const [selectedNote, setSelectedNote] = useState(null); // 選択されたノート
  const [editedText, setEditedText] = useState(''); // 編集中のテキスト
  

  const handleNoteAdd = () => {
    const newNote = {
      id: Date.now(),
      text: '新規ノート📝',
    };
    console.log(newNote);
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    setEditedText(newNote.text);
  };

  const handleSelect = (note) => {
    setSelectedNote(note);
    setEditedText(note.text);
  };

  const handleDelete = (noteId) => {
    const fillterNotes = notes.filter((note) => note.id !== noteId);
    setNotes(fillterNotes);

    if (fillterNotes.length > 0) {
      const lastNote = fillterNotes[fillterNotes.length - 1];
      setSelectedNote(lastNote);
    }
    else {
      setSelectedNote(null);
    }
  };

  const handleChange = (event) => {
    // ユーザーが入力したテキスト(event.target.value)を編集中のテキストにセット
    setEditedText(event.target.value);
  };

  const handleSave = () => {
    const updatedNotes = notes.map((note) => {
      if (note.id === selectedNote.id) {
        return {  
          ...note,
          text: editedText,
        };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      {/* サイドバー */}
      <div className="sidebar">
        <button id='create' onClick={handleNoteAdd}>ノート追加</button>
        <ul>
          {notes.map((note) => (
            <li key={note.id} className={selectedNote.id === note.id ? 'selected' : ''}>
              <button onClick={() => handleDelete(note.id)} className='delete'>削除</button>
              <span onClick={() => handleSelect(note)}>{note.text}</span>
            </li>
          ))}
          
        </ul>
      </div>

      {/* メイン */}
      <div className="main">
        {selectedNote ? (
          <>
          <h2>内容</h2>
          <textarea value={editedText} onChange={handleChange} />
          <button className='save' onClick={handleSave}>保存</button>
          </>
        ) : (
          <div>ノートを選択してください</div>
        )}
        
        
      </div>


    </div>
  );
}

export default App;
