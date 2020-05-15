import React from 'react'
import DisplayContext from '../DisplayContext'
import { findNote, findFolder } from '../NotesFunctions'
import './NotesSide.css'
import GenericError from '../GenericError/GenericError'

export default class NotesSide extends React.Component {

  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = DisplayContext;

  render () {
    const { notes, folders } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className='NotesSide'>
          <GenericError>
          <button
            tag='button'
            role='link'
            onClick={() => this.props.history.goBack()}
            className='NotesSide__back-button'
          >
            <br />
            Back
          </button>
          {folder && (
            <h3 className='NotesSide__folder-name'>
              {folder.name}
            </h3>
          )}
        </GenericError>
      </div>
    )
  }
}

NotesSide.defaultProps = {
  history: {
    goBack: () => {}
  }
}