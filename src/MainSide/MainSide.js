import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { countNotesForFolder } from '../NotesFunctions'
import DisplayContext from '../displayContext'
import './MainSide.css'
import GenericError from '../GenericError/GenericError'

export default class MainSide extends React.Component {

  static contextType = DisplayContext;

  render () {
    const { folders = [], notes = [] } = this.context;

    return (
      <div className='MainSide'>
        <GenericError>
          <ul className='MainSide__list'>
            {folders.map(folder =>
              <li key={folder.id}>
                <NavLink
                  className='MainSide__folder-link'
                  to={`/folder/${folder.id}`}
                >
                  <span className='MainSide__num-notes'>
                    {countNotesForFolder(notes, folder.id)} -- 
                  </span>
                  {folder.name}
                </NavLink>
              </li>
            )}
          </ul>
        </GenericError>
        <div className='MainSide__button-wrapper'>
          <GenericError>
            <Link to='/add-folder'>
              <button
                tag={Link}
                type='button'
                className='MainSide__add-folder-button'
              >
                <br />
              Add folder
              </button>
            </Link>
          </GenericError>
        </div>
      </div>
    )
  }
}
