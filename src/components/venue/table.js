import _ from 'lodash'
import { getDate, getDescription, getArtists } from '@/src/utils/venue'

export const VenueTable = ({ venues, onClick }) => (
  <table>
    <thead>
      <tr>
        <td>Datum</td>
        <td>Bezeichnung</td>
        <td>Artist</td>
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
