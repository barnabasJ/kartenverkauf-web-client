import { useRouter } from 'next/router'
import { makeGetRequest } from '@/src/components/request'
import { CurrentVenue } from '../../src/components/venue/current'
import TicketTable from '../../src/components/venue/ticket/table'

const Buy = ({ venue }) => {
  const router = useRouter()
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <CurrentVenue venue={venue} />
        </div>
        <div className='col'>
          <TicketTable tickets={venue.tickets} />
        </div>
      </div>
    </div>
  )
}

Buy.getInitialProps = async ({ query }) => {
  const venue = await makeGetRequest(`/venue/${query.id}`)
  console.log(venue)
  return { venue }
}

export default Buy
