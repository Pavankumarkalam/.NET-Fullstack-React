import React, { useState, useContext } from 'react';
import { NotesContext } from '../context/NotesContext';

// Component for adding a new note via a simple form
const AddNote = () => {
  const { addNote } = useContext(NotesContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Handle form submission to add a new note
  const handleSubmit = e => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') return;
    addNote(title, content);
    // Clear form inputs after submission
    setTitle('');
    setContent('');
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Add a New Note</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Title input */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Note Title"
            />
          </div>
          {/* Content input */}
          <div className="mb-3">
            <textarea
              className="form-control"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Note Content"
            />
          </div>
          <button type="submit" className="btn btn-success">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
