import {useCallback, useState} from 'react'
import {useRouter} from 'next/router'
import {makeGetRequest, makePostRequest} from '@/src/utils/request'
import {CurrentVenue} from '@/src/components/venue/current'
import TicketTable from '@/src/components/venue/ticket/table'
import SelectedTickets from '@/src/components/venue/ticket/selected-tickets'
import _ from 'lodash'
import CheckOutForm from '@/src/components/checkout-form'

const Buy = ({venue}) => {

    const router = useRouter()

    const [currentVenue, setCurrentVenue] = useState(venue)

    const [selectedTickets, setSelectedTickets] = useState([])

    const addTicket = useCallback(
        ticket =>
            _.get(ticket, 'state') == 'FREE' &&
            setSelectedTickets(tickets =>
                _.sortBy(
                    _.uniqBy(
                        _.concat(tickets, ticket), 'id'), ['x', 'y'])
            ),
        [setSelectedTickets]
    )

    const removeTicket = useCallback(
        ticket =>
            setSelectedTickets(tickets =>
                _.sortBy(
                    _.filter(tickets, t => t.id != ticket.id),
                    ['x', 'y']
                )
            ),
        [setSelectedTickets]
    )

    const buy = useCallback(
        async formData => {
            if (_.isEmpty(selectedTickets))
                return alert('Keine Karten ausgewaehlt')
            try {
                const failedTickets = await makePostRequest(
                    '/venue/ticket/buy',
                    _.map(selectedTickets, t => t.id)
                )
                if (_.isEmpty(failedTickets)) {
                    alert('Ihre Tickets wurden gekauft, weiter Information zur Zahlung und Abholung erhalten sie per Email')
                    router.push('/')
                } else {
                    const refreshedVenue = await makeGetRequest(`/venue/${query.id}`)
                    alert(
                        'Nicht alle Tickets konnten gekauft werden, bitte versuchen sie es erneut'
                    )
                    setCurrentVenue(refreshedVenue)
                    setSelectedTickets([])
                }
            } catch {
                alert(
                    'Etwas ist schief gelaufen, bitte laden sie die Seite und probieren es nochmal'
                )
            }
        },
        [setCurrentVenue, setCurrentVenue, router, selectedTickets]
    )

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <CurrentVenue venue={currentVenue}/>
                </div>
                <div className='col'>
                    <TicketTable tickets={currentVenue.tickets} onClick={addTicket}/>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <SelectedTickets tickets={selectedTickets} onClick={removeTicket}/>
                </div>
                <div className='col'>
                    <CheckOutForm onSubmit={buy}/>
                </div>
            </div>
        </div>
    )
}

Buy.getInitialProps = async ({query}) => {
    const venue = await makeGetRequest(`/venue/${query.id}`)
    return {venue}
}

export default Buy
