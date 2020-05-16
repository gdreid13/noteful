import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import DisplayContext from '../DisplayContext'
import { getNotesForFolder } from '../NotesFunctions'
import './MainMain.css'
import GenericError from '../GenericError/GenericError'
import PropTypes from 'prop-types'

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
        <GenericError>
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
        </GenericError>
        <div className='MainMain__button-wrapper'>
          <GenericError>
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
          </GenericError>
        </div>
      </section>
    )
  }
}

MainMain.propTypes = {
  match: PropTypes.object
}
