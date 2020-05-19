import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MainMain from './MainMain/MainMain';
import MainSide from './MainSide/MainSide';
import NotesMain from './NotesMain/NotesMain';
import NotesSide from './NotesSide/NotesSide';
import DisplayContext from './displayContext';
import config from './config';
import './App.css';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';

export default class App extends Component {
  state = {
    notes: [],
    folders: [],
  }
  

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ]).then(([notesRes, foldersRes]) => {
      if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
      if (!foldersRes.ok)
          return foldersRes.json().then(e => 
            Promise.reject(e));
          return Promise.all([notesRes.json(), foldersRes.json()]);
        })
        .then(([notes, folders]) => {
            this.setState({notes, folders});
        })
        .catch(error => {
            console.error({error});
        });
  }
  
  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={MainSide}
          />
        ))}
        <Route path="/note/:noteId" component={NotesSide}/>
        <Route path="/add-folder" component={NotesSide} />
        <Route path="/add-note" component={NotesSide} />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={MainMain}
          />
        ))}
        <Route
          path="/note/:noteId"
          component={NotesMain}
        />
        <Route
          path="/add-folder"
          component={AddFolder}
        />
        <Route
          path="/add-note"
          component={AddNote}
        />
      </>
    )
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    }
    return (
      <DisplayContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </DisplayContext.Provider>

    )
  }
}