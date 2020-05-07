import React from 'react';

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFolderName: {
        value: ''
      }
    }
  }
  static defaultProps = {
    onAddNote: () => {},
  }

  handleAddFolder = e => {
    e.preventDefault();
    this.setState({newFolderName: {value: newFolderName}})
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