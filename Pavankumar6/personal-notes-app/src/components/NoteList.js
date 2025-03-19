import React, { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';
import NoteItem from './NoteItem';

// Component to display the list of notes
const NoteList = () => {
  // Get notes from context
  const { notes } = useContext(NotesContext);

  // If there are no notes, display a message
  if (notes.length === 0) {
    return <p className="text-center mt-3">No notes found. Please add a note.</p>;
  }

  return (
    <div className="row">
      {notes.map(note => (
        <div key={note.id} className="col-md-4 mb-3">
          <NoteItem note={note} />
        </div>
      ))}
    </div>
  );
};

export default NoteList;
