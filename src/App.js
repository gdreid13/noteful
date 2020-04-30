import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MainMain from './MainMain/MainMain';
import MainSide from './MainSide/MainSide';
import NotesMain from './NotesMain/NotesMain';
import NotesSide from './NotesSide/NotesSide';
import dummyStore from './dummy-store';
import DisplayContext from './DisplayContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
    }
  }
  

  componentDidMount() {
    this.setState(dummyStore);
  }

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
        <Route
          path="/note/:noteId"
          component={NotesSide}
        />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
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
      </>
    )
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
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

    );
  }
}

