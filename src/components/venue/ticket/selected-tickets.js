import _ from 'lodash'
import Price from '@/src/components/price'

const Ticket = ({ ticket, onClick }) => {
  return (
    <div>
      <span style={{ marginRight: '5px' }}>{`${ticket.y}/${ticket.x}`}</span>
      <Price price={_.get(ticket, 'category.price')} />
      <button onClick={() => onClick && onClick(ticket)}>Entfernen</button>
    </div>
  )
}

const calculateTotal = tickets =>
  _.reduce(
    _.compact(_.map(tickets, t => _.get(t, 'category.price'))),
    (total, p) => total + p,
    0
  )

const SelectedTickets = ({ tickets, onClick }) => {
  return (
    <div>
      <h4>Ausgewaehlte Tickets</h4>
      <div>
        {_.map(tickets, ticket => (
          <Ticket key={ticket.id} ticket={ticket} onClick={onClick} />
        ))}
      </div>
      <div>
        <span style={{ marginRight: '5px' }}>Total</span>
        <Price price={calculateTotal(tickets)} />
      </div>
    </div>
  )
}

export default SelectedTickets
