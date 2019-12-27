import { useState, useCallback } from 'react'

const CheckOutForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState({})
  const onChange = useCallback(
    key => e => {
      setFormState(_.set(formState, key, e.target.value))
    },
    [setFormState]
  )
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          return onSubmit && onSubmit(formState, e)
        }}
      >
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            aria-describedby='email'
            onChange={onChange('email')}
            value={formState.email}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Kaufen
        </button>
      </form>
    </div>
  )
}
export default CheckOutForm
