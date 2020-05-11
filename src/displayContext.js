import React from 'react';

const DisplayContext = React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

export default DisplayContext