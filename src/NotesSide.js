import React from 'react'
import './NotesSide.css'

export default function NotesSide(props) {
  return (
    <div className='NotesSide'>
      <button
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NotesSide__back-button'
      >
        <br />
        Back
      </button>
      {props.folder && (
        <h3 className='NotesSide__folder-name'>
          {props.folder.name}
        </h3>
      )}
    </div>
  )
}

NotesSide.defaultProps = {
  history: {
    goBack: () => {}
  }
}