import React from 'react'
import { Link } from 'react-router-dom'
import Note from './Note'
import './MainMain.css'

export default function MainMain(props) {
  return (
    <section className='MainMain'>
      <ul>
        {props.notes.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
          </li>
        )}
      </ul>
      <div className='MainMain__button-container'>
        <button
          tag={Link}
          to='/add-note'
          type='button'
          className='MainMain__add-note-button'
        >
          <br />
          Add note
        </button>
      </div>
    </section>
  )
}

MainMain.defaultProps = {
  notes: [],
}
