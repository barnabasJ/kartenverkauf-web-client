import _ from 'lodash'
import { getDate, getDescription, getArtists } from '@/src/utils/venue'

const thStyle= {
  backgroundColor: '#2196f3',
  color:'white'
};

const tableStyle= {
  width: '100%'
};

export const VenueTable = ({ venues, onClick }) => (
  <table style={tableStyle}>
    <thead>
      <tr>
        <th style={thStyle}>Datum</th>
        <th style={thStyle}>Bezeichnung</th>
        <th style={thStyle}>Artist</th>
      </tr>
    </thead>
    <tbody>
      {_.map(venues, venue => (
        <tr key={_.get(venue, 'id')} onClick={() => onClick && onClick(venue)}>
          <td>{getDate(venue)}</td>
          <td>{getDescription(venue)}</td>
          <td>{getArtists(venue)}</td>
        </tr>
      ))}
    </tbody>
  </table>
)
