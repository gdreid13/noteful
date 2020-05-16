import React, { Component } from 'react'
import config from '../config'
import DisplayContext from '../DisplayContext'
import ValidationError from '../ValidationError/ValidationError'
import GenericError from '../GenericError/GenericError'
import PropTypes from 'prop-types'

export default class AddNote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newNote: {
        name: '',
        content: '',
        folderId: '',
        modified: '',
        touched: false,
      },
    }
  }

  static contextType = DisplayContext;

  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  updateNewNoteName(name) {
    this.setState({
      newNote: {
        ...this.state.newNote,
        name: name,
        modified: new Date(),
        touched: true,
      }
    })
  }

  updateNewNoteContent(content) {
    this.setState({
      newNote: {
        ...this.state.newNote,
        content: content,
        modified: new Date(),
        touched: true,
      }
    })
  }

  updateNewNoteFolderId(folderId) {
    this.setState({
      newNote: {
        ...this.state.newNote,
        folderId: folderId,
        modified: new Date(),
        touched: true,
      }
    })
  }

  validateNoteName() {
    const name = this.state.newNote.name.trim();
    const folder = this.state.newNote.folderId;

    if (name.length === 0) {
      return "Name is required";
    }
    for (let i=0; i < this.context.notes.length; i++) {
      if (name === this.context.notes.name && folder === this.context.notes.folderId) {
        return "Note cannot have the same name as another note in the same folder";
      }
    }
  }

  validateNoteContent() {
    const content = this.state.newNote.content;
    if (content.length === 0) {
      return "Your note has no content";
    }
  }

  validateNoteFolderId() {
    const folderId = this.state.newNote.folderId;

    if (!folderId) {
      return "Your note needs to be attached to a folder";
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { newNote } = this.state;
    console.log('New note: ', newNote);

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'content-type': 'application/json'
      },
    }).then( res => {
      console.log('The json res is:', res)
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    }).then(note => {
      this.context.addNote(note)
      this.props.history.push(`/folder/${note.folderId}`)
    }).catch(err => {
      console.error({err})
    });
  }

  render () {
    const { folders } = this.context;
    const nameError = this.validateNoteName();
    const contentError = this.validateNoteContent();
    const folderIdError = this.validateNoteFolderId();

    console.log('The state at the start of the render is:', this.state);

    return (
      <form className="add_note" onSubmit={this.handleSubmit}>
        <h2>Add note</h2>
        <div className="form_field">
          <GenericError>
            <label htmlFor="note_name_input">Note name:</label>
            <input
              type="text"
              className="note_name_control"
              name="note_name"
              id="note_name_input"
              onChange={e => this.updateNewNoteName(e.target.value)}
            />
          </GenericError>
          <ValidationError message={nameError} />
        </div>
        <div className="form_field">
          <GenericError>
            <label htmlFor="note_content_input">Content:</label>
            <textarea
              id="note_content_input"
              name="note_content"
              onChange={e => this.updateNewNoteContent(e.target.value)}
            />
          </GenericError>
          <ValidationError message={contentError} />
        </div>
        <div className="form_field">
          <GenericError>
            <label htmlFor="note_folder_select">
              Folder:
            </label>
            <select
              id="note_folder_select"
              name="note_folder_id"
              onChange={e => this.updateNewNoteFolderId(e.target.value)}
            >
              <option value={null}>
                ...
              </option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </GenericError>
          <ValidationError message={folderIdError} />
        </div>
        <div className="button">
          <button
            type="submit"
            className="note_submit_button"
            disabled = {
              this.validateNoteName() ||
              this.validateNoteContent() ||
              this.validateNoteFolderId
            }>
            Submit
          </button>
        </div>
      </form>
    )
  }
}

AddNote.propTypes = {
  history: {
    push: PropTypes.func
  }
};