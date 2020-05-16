import React from 'react'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import DisplayContext from '../DisplayContext'
import config from '../config'
import './Note.css'
import PropTypes from 'prop-types';

export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  }
  static contextType = DisplayContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified } = this.props
    console.log('This is modified:', modified);
    console.log('This is parseISO modified:', parseISO(modified));
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(parseISO(modified), 'd MMM yyyy')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  onDeleteNote: PropTypes.func
};