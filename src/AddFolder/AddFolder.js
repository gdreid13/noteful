import React, { Component } from 'react';
import config from '../config'
import DisplayContext from '../DisplayContext'
import ValidationError from '../ValidationError/ValidationError'
import GenericError from '../GenericError/GenericError'
import PropTypes from 'prop-types'

export default class AddFolder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newFolder: {
        name: '',
        touched: false
      },
    }
  }

  static contextType = DisplayContext;

  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  updateNewFolder(name) {
    this.setState({
      newFolder: {
        name: name,
        touched: true
      }
    })
  }

  validateName() {
    const name = this.state.newFolder.name.trim();
    if (name.length === 0) {
      return "Name is required";
    }
    for (let i=0; i < this.context.folders.length; i++) {
      if (name === this.context.folders[i].name) {
        return "Name cannot be the same as another folder";
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { newFolder } = this.state;
    console.log('New folder: ', newFolder);

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
      console.error({err})
    });
  }

  render () {
    const nameError = this.validateName();
    return (
      <form className="add_folder" onSubmit={this.handleSubmit}>
        <h2>Add folder</h2>  
        <div className="form_field">
          <GenericError>
            <label htmlFor="folder_name_input">Folder name:</label>
            <input
              type="text"
              className="folder_name_control"
              name="folder_name"
              id="folder_name_input"
              onChange={e => this.updateNewFolder(e.target.value)}
            />
          </GenericError>
          <ValidationError message={nameError} />
        </div>
        <div className="button">
         <button
            type="submit"
            className="folder_button"
            disabled={
              this.validateName()
            }
          >
             Submit
         </button>
        </div>
      </form>
    )
  }
}

AddFolder.propTypes = {
  history: {
    push: PropTypes.func
  }
};