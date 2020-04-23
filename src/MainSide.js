import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { countNotesForFolder } from './NotesFunctions'
import './MainSide.css'

export default function MainSide(props) {
  return (
    <div className='MainSide'>
      <ul className='MainSide__list'>
        {props.folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='MainSide__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='MainSide__num-notes'>
                {countNotesForFolder(props.notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>
          </li>
        )}
      </ul>
      <div className='MainSide__button-wrapper'>
        <button
          tag={Link}
          to='/add-folder'
          type='button'
          className='MainSide__add-folder-button'
        >
          <br />
          Add folder
        </button>
      </div>
    </div>
  )
}

MainSide.defaultProps = {
  folders: []
}