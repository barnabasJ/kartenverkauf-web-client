import _ from 'lodash'

const TicketTable = ({ tickets }) => {
  const rows = _.reduce(
    tickets,
    (rows, ticket) =>
      _.set(rows, ticket.y, [..._.get(rows, ticket.y, []), ticket]),
    {}
  )

  console.log(rows)
  return (
    <div>
      <h1>TicketTable</h1>
      <table>
        {_(_.keys(rows))
          .sort()
          .map(row => (
            <tr key={row}>
              {_(rows[row])
                .sortBy(ticket => ticket.x)
                .map(ticket => (
                  <td key={ticket.id}>
                    <button>{`${ticket.y}/${ticket.x}`}</button>
                  </td>
                ))
                .value()}
            </tr>
          ))
          .value()}
      </table>
    </div>
  )
}

export default TicketTable
