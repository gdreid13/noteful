import React, { Component } from 'react';
import config from '../config'
import DisplayContext from '../DisplayContext'

export default class AddFolder extends Component {

  static contextType = DisplayContext;

  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  handleSubmit = e => {
    e.preventDefault();
    const newFolder = {
      name: e.target['folder_name'].value,
    }

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      body: JSON.stringify(newFolder),
      headers: {
        'content-type': 'application/json'
      },
    }).then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    }).then(folder => {
      this.context.addFolder(folder)
      this.props.history.push(`/folder/${folder.id}`); 
    }).catch(err => {
      console.err({err})
    });
  }

  render () {
    return (
      <form className="add_folder" onSubmit={this.handleSubmit}>
        <h2>Add folder</h2>  
        <div className="form_field">
          <label htmlFor="folder_name_input">Folder name:</label>
          <input type="text" className="folder_name_control"
            name="folder_name" id="folder_name_input"
          />
        </div>
        <div className="button">
         <button type="submit" className="folder_button">
             Submit
         </button>
        </div>
      </form>
    )
  }
}