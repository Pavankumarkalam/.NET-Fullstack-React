import React, { useState, useContext } from 'react';
import { NotesContext } from '../context/NotesContext';

// Component to display an individual note with edit and delete functionality
const NoteItem = ({ note }) => {
  const { editNote, deleteNote } = useContext(NotesContext);
  const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  // Handle switching to edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save updated note and exit edit mode
  const handleSave = () => {
    editNote(note.id, title, content);
    setIsEditing(false);
  };

  // Cancel editing and revert to original note values
  const handleCancel = () => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        // Render edit form if in editing mode
        <div className="card-body">
          <input
            type="text"
            className="form-control mb-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Note Title"
          />
          <textarea
            className="form-control mb-2"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Note Content"
          />
          <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        // Render note display mode
        <>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.content}</p>
          </div>
          <div className="card-footer text-end">
            <button className="btn btn-primary btn-sm me-2" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteItem;
