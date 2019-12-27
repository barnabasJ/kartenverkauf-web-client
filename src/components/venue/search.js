import { useState, useCallback, memo } from 'react'
import _ from 'lodash'

const VenueSearch = memo(({ genres, onSubmit }) => {
  const [formState, setFormState] = useState({})
  const onChange = useCallback(
    key => e => {
      setFormState(_.set(formState, key, e.target.value))
    },
    [setFormState]
  )
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        return onSubmit && onSubmit(formState, e)
      }}
    >
      <div className='form-group'>
        <label htmlFor='description'>Bezeichnung</label>
        <input
          type='text'
          className='form-control'
          id='description'
          aria-describedby='description'
          onChange={onChange('description')}
          value={formState.description}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='artist'>Kuenstler</label>
        <input
          type='text'
          className='form-control'
          id='artist'
          aria-describedby='artist'
          onChange={onChange('artist')}
          value={formState.artist}
        />
      </div>
      {genres && (
        <div className='form-group'>
          <label htmlFor='genre'>Genre</label>
          <select
            value={formState.genre}
            onChange={onChange('genre')}
            defaultValue={''}
            className='custom-select'
            id='genre'
          >
            <option value=''>Auswaehlen...</option>
            {_.map(genres, genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className='form-group'>
        <label htmlFor='from'>Von</label>
        <input
          type='date'
          className='form-control'
          id='from'
          aria-describedby='from'
          value='2019-12-24'
          onChange={onChange('localDateTimeStart')}
          value={formState.localDateTimeStart}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='to'>Bis</label>
        <input
          type='date'
          className='form-control'
          id='to'
          aria-describedby='to'
          value='2019-12-12'
          onChange={onChange('localDateTimeEnd')}
          value={formState.localDateTimeEnd}
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Suchen
      </button>
    </form>
  )
})

export default VenueSearch
