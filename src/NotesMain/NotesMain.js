import React from 'react'
import Note from './Note'
import './NotesMain.css'

export default function NotesMain(props) {
  return (
    <section className='NotesMain'>
      <Note
        id={props.note.id}
        name={props.note.name}
        modified={props.note.modified}
      />
      <div className='NotesMain__content'>
        {props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}

NotesMain.defaultProps = {
  note: {
    content: '',
  }
}