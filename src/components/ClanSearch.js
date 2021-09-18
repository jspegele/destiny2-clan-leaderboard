import React, { useState } from 'react'
import axios from 'axios'

import { history } from "../routers/AppRouter"

const ClanSearch = () => {
  const apiRoot = 'https://www.bungie.net/Platform'
  const [error, setError] = useState(null)
  const [clanName, setClanName] = useState('')
  
  // Clan search
  const handleClanLookup = e => {
    e.preventDefault()

    axios.post(`${apiRoot}/GroupV2/Search/`,
      JSON.stringify({
        name: clanName,
        groupType: 1
      }), {
        headers: {
          'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
        }
      })
      .then(response => {
        history.push(`/leaderboard/${response.data.Response.results[0].groupId}`)
      })
      .catch(error => {
        console.log('Clan search error', error)
        setError('Clan not found')
      })
  }

  return (
    <div className="clanLookup">
      <form onSubmit={handleClanLookup}>
        <label htmlFor="clan-search">Search Clans:</label>{' '}
        <input
          type="text"
          placeholder="Exact clan name"
          value={clanName}
          onChange={e => setClanName(e.target.value)}
        />
        <button type="submit">Go</button>
      </form>
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
}

export default ClanSearch
