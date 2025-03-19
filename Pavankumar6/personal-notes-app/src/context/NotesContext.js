import React, { createContext, useState, useEffect } from 'react';

// Create the NotesContext to share notes state across components
export const NotesContext = createContext();

// Provider component to wrap around components that need access to notes state
export const NotesProvider = ({ children }) => {
  // Initialize notes state from LocalStorage or set to an empty array
  const [notes, setNotes] = useState(() => {
    const localData = localStorage.getItem('notes');
    return localData ? JSON.parse(localData) : [];
  });

  // Persist notes to LocalStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Function to add a new note
  const addNote = (title, content) => {
    const newNote = { id: Date.now(), title, content };
    setNotes([newNote, ...notes]);
  };

  // Function to edit an existing note
  const editNote = (id, updatedTitle, updatedContent) => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, title: updatedTitle, content: updatedContent } : note
      )
    );
  };

  // Function to delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};
