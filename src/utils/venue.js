import { parse } from 'date-fns'
import _ from 'lodash'

export const getArtists = venue =>
  _.join(
    _.map(_.get(venue, 'program.artists'), artist => _.get(artist, 'name')),
    ', '
  )

export const getDescription = venue => _.get(venue, 'program.description')

export const getDate = venue =>
  parse(
    _.join(_.get(venue, 'date'), '-'),
    'yyyy-M-d-H-m',
    new Date()
  ).toDateString()

export const getAddress = ({ address }) =>
  address
    ? `${address.line1}, ${address.postcode} ${address.locality}, ${address.region} ${address.country}`
    : ''

export const getGenre = ({ program }) => _.get(program, 'genre') || ''

export const getFreeTickets = ({ tickets }) =>
  _.filter(tickets, ({ state }) => state === 'FREE')

export const getEmail = ({ program }) => _.get(program, 'organizer.email')

export const _filterVenues = (venues, filter) => {
  _.reduce(filter, _.filter, venues)
}