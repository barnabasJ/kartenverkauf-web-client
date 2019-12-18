import {
  getArtists,
  getAddress,
  getGenre,
  getFreeTickets,
  getDescription,
  getDate,
  getEmail
} from '@/src/utils/venue'

export const CurrentVenue = ({ venue }) => {
  console.log(venue)
  return venue ? (
    <div>
      <h3>Current Venue</h3>
      <div>
        <p>Bezeichnung: {getDescription(venue)}</p>
        <p>Kuenstler: {getArtists(venue)}</p>
        <p>Ort: {getAddress(venue)}</p>
        <p>Datum: {getDate(venue)}</p>
        <p>Genre: {getGenre(venue)}</p>
        <p>Verfuegbarkeit: {getFreeTickets(venue).length}</p>
        <p>Email: {getEmail(venue)}</p>
      </div>
    </div>
  ) : (
    <h3>
      Keine Veranstaltung ausgewaehlt, bitte klicken Sie auf eine Veranstaltung
    </h3>
  )
}
