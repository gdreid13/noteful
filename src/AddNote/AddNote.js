import React, { Component } from 'react'
import config from '../config'
import DisplayContext from '../DisplayContext'

export default class AddNote extends Component {

  static contextType = DisplayContext;

  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  handleSubmit = e => {
    e.preventDefault();
    const newNote = {
      name: e.target['note_name'].value,
      content: e.target['note_content'].value,
      folderId: e.target['note_folder_id'].value,
      modified: new Date(),
    }

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'content-type': 'application/json'
      },
    }).then( res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    }).then(note => {
      this.context.addNote(note)
      this.props.history.push(`/folder/${note.folderId}`)
    }).catch(err => {
      console.err({err})
    });
  }

  render () {
    const { folders =[] } = this.context;
    return (
      <form className="add_note" onSubmit={this.handleSubmit}>
        <h2>Add note</h2>
        <div className="form_field">
          <label htmlFor="note_name_input">Note name:</label>
          <input type="text" name="note_name" id="note_name_input"/>
        </div>
        <div className="form_field">
          <label htmlFor="note_content_input">Content:</label>
          <textarea id="note_content_input" name="note_content" />
        </div>
        <div className="form_field">
          <label htmlFor="note_folder_select">
            Folder:
          </label>
          <select id="note_folder_select" name="note_folder_id">
            <option value={null}>
              ...
            </option>
            {folders.map(folder =>
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            )}
          </select>
        </div>
        <div className="button">
          <button type="submit" className="note_submit_button">
            Submit
          </button>
        </div>
      </form>
    )
  }
}
