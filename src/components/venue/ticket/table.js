import _ from 'lodash'

const categoryColors = ['#5985c1', '#80c3e8', '#59afc1', '#94b1ee']

const calcBackground = ticket => {
  if (ticket.state == 'FREE') return categoryColors[ticket.category.id % categoryColors.length]
  if (ticket.state == 'RESERVED') return '#666666'
  if (ticket.state == 'SOLD') return '#bf1932'
}

const Row = ({ row, rows, onClick }) => (
  <tr key={`row-${row}`}>
    {_(rows[row])
      .sortBy(ticket => ticket.x)
      .map(ticket => (
        <td key={ticket.id}>
          <button
            onClick={() => onClick && onClick(ticket)}
            style={{ backgroundColor: calcBackground(ticket) }}
          >{`${ticket.y}/${ticket.x}`}</button>
        </td>
      ))
      .value()}
  </tr>
)

const Categories = ({ categories }) => {
  return (
    <div>
      {_.map(categories, c => (
        <p key={c.id}>
          <span
            style={{
              backgroundColor: categoryColors[c.id % categoryColors.length],
              marginRight: '5px'
            }}
          >
            {c.id}:
          </span>
          {c.price}
        </p>
      ))}
    </div>
  )
}

const Legend = ({ categories }) => {
  return (
    <div>
      <Categories categories={categories} />
      <div>
        <p>
          <span
            style={{
              backgroundColor: '#bf1932',
              marginRight: '5px'
            }}
          >
            S
          </span>
          Verkauft
        </p>
        <p>
          <span
            style={{
              backgroundColor: '#666666',
              marginRight: '5px'
            }}
          >
            R
          </span>
          Reserviert
        </p>
      </div>
    </div>
  )
}

const TicketTable = ({ tickets, onClick }) => {
  const rows = _.reduce(
    tickets,
    (rows, ticket) =>
      _.set(rows, ticket.y, [..._.get(rows, ticket.y, []), ticket]),
    {}
  )

  const categories = _(tickets)
    .map(t => t.category)
    .uniqBy('id')
    .value()

  return (
    <div>
      <h1>TicketTable</h1>
      <table>
        <tbody>
          {_(_.keys(rows))
            .sort()
            .map((row, i) => (
              <Row key={`row-${i}`} row={row} rows={rows} onClick={onClick} />
            ))
            .value()}
        </tbody>
      </table>
      <Legend categories={categories} />
    </div>
  )
}

export default TicketTable
