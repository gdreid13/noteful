import React from 'react'
import Note from '../Note/Note'
import DisplayContext from '../DisplayContext'
import { findNote } from '../NotesFunctions'
import './NotesMain.css'
import GenericError from '../GenericError/GenericError'
import PropTypes from 'prop-types'

export default class NotesMain extends React.Component {

  static defaultProps = {
    match: {
      params: {},
    }
  }
  
  static contextType = DisplayContext;

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }


  
  render () {

    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: '' };
  
    return (
      <section className='NotesMain'>
        <GenericError>
          <Note
            id={note.id}
            name={note.name}
            modified={note.modified}
            onDeleteNote={this.handleDeleteNote}
          />
          <div className='NotesMain__content'>
            {note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
          </div>
        </GenericError>
      </section>
    )
  }
}

NotesMain.propTypes = {
  match: {
    params: PropTypes.array
  }
}