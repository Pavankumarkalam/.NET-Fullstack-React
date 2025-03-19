import React from 'react';
import AddNote from '../components/AddNote';
import NoteList from '../components/NoteList';

// Notes page component that shows the complete note functionality
const Notes = () => {
  return (
    <div className="container mt-4">
      {/* Component to add a note */}
      <AddNote />
      {/* Component to list all notes */}
      <NoteList />
    </div>
  );
};

export default Notes;
