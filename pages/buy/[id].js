import { useState, useCallback } from 'react'
import { makeGetRequest } from '@/src/components/request'
import { CurrentVenue } from '@/src/components/venue/current'
import TicketTable from '@/src/components/venue/ticket/table'
import SelectedTickets from '@/src/components/venue/ticket/selected-tickets'
import _ from 'lodash'

const Buy = ({ venue }) => {
  const [selectedTickets, setSelectedTickets] = useState([])
  console.log(selectedTickets)

  const addTicket = useCallback(
    ticket =>
      _.get(ticket, 'state') == 'FREE' &&
      setSelectedTickets(tickets =>
        _.sortBy(_.concat(tickets, ticket), ['x', 'y'])
      )
  )

  const removeTicket = useCallback(ticket =>
    setSelectedTickets(tickets =>
      _.sortBy(
        _.filter(tickets, t => t.id != ticket.id),
        ['x', 'y']
      )
    )
  )

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <CurrentVenue venue={venue} />
        </div>
        <div className='col'>
          <TicketTable tickets={venue.tickets} onClick={addTicket} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <SelectedTickets tickets={selectedTickets} onClick={removeTicket} />
        </div>
        <div className='col'>Checkout</div>
      </div>
    </div>
  )
}

Buy.getInitialProps = async ({ query }) => {
  const venue = await makeGetRequest(`/venue/${query.id}`)
  return { venue }
}

export default Buy
