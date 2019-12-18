import { useState, useCallback } from 'react'
import _ from 'lodash'
import { VenueTable } from '@/src/components/venue/table'
import { CurrentVenue } from '@/src/components/venue/current'
import VenueSearch from '../src/components/venue/search'
import { makeGetRequest, makePostRequest } from '@/src/components/request'
import Link from 'next/link'

const buildQuery = formData =>
  _.trimStart(
    _.reduce(formData, (acc, value, key) => `${acc}&${key}=${value}`, ''),
    '$'
  )

const buildSearchPath = (path, formData) => `${path}?${buildQuery(formData)}`

const Index = ({ venues, genres }) => {
  const [currentVenues, setCurrentVenues] = useState(venues)
  const [currentVenue, setCurrentVenue] = useState(null)

  const updateVenues = useCallback(
    async formData => {
      _.each(
        ['localDateTimeStart', 'localDateTimeEnd'],
        key =>
          formData[key] &&
          _.set(formData, key, new Date(formData[key]).toISOString())
      )
      const venues = await makeGetRequest(
        buildSearchPath('/venue/search', formData)
      )
      console.log(venues)
      setCurrentVenues(venues)
    },
    [setCurrentVenues]
  )

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          {venues ? (
            <VenueTable venues={currentVenues} onClick={setCurrentVenue} />
          ) : (
            <p>Keine Veranstaltungen gefunden</p>
          )}
        </div>
        <div className='col'>
          <VenueSearch genres={genres} onSubmit={updateVenues} />
        </div>
      </div>
      <div>
        <CurrentVenue venue={currentVenue} />
        {currentVenue && (
          <Link href={`/buy/${currentVenue.id}`}>
            <a>Kaufen</a>
          </Link>
        )}
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  const [venues, genres] = await Promise.all([
    makeGetRequest('/venue'),
    makeGetRequest('/genre')
  ])

  return {
    venues,
    genres
  }
}

export default Index
