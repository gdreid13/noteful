import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import DisplayContext from '../DisplayContext'
import { getNotesForFolder } from '../NotesFunctions'
import './MainMain.css'

export default class MainMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = DisplayContext
  
  render () {

    const { folderId } = this.props.match.params
    const { notes = [] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)

    return (
      <section className='MainMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='MainMain__button-wrapper'>
          <Link to='/add-note'>
            <button
              tag={Link}
              type='button'
              className='MainMain__add-note-button'
            >
              <br />
            Add note
            </button>
          </Link>
        </div>
      </section>
    )
  }
}

