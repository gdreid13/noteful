import React from 'react';
import config from '../config'

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFolderName: {
        value: ''
      }
    }
  }

  static contextType = DisplayContext;
  
  static defaultProps = {
    onAddNote: () => {},
  }

  newFolder(newFolderName) {
    this.setState({newFolderName: {value: newFolderName}});
  }

  handleSubmit = e => {
    e.preventDefault();
    const newFolderName = this.state;

    fetch(`${config.API_ENDPOINT}` {
      method: 'POST',
      body: JSON.stringify(newFolderName),
      headers: {
        'content-type': 'application/json'
      },
    }).then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    }).then(() => {
      
    })
  }

  render () {
    return (
      <form className="add_folder">
        <h2>Add folder</h2>  
        <div className="form-group">
          <label htmlFor="name">Folder name:</label>
          <input type="text" className="folder_name_control"
            name="name" id="name"/>
        </div>
        <div className="folder_button_group">
         <button type="submit" className="folder_button">
             Submit
         </button>
        </div>
      </form>
    )
  }
}