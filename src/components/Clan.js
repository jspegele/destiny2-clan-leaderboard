import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from './styles/clan.module.scss'
import Member from './Member'

const Clan = () => {
  const apiRoot = 'https://www.bungie.net/Platform'
  const [clanName, setClanName] = useState('')
  const [clanId, setClanId] = useState(null)
  const [clanDetails, setClanDetails] = useState(null)
  const [clanMembers, setClanMembers] = useState(null)
  
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
        setClanId(response.data.Response.results[0].groupId)
      })
      .catch(error => {
        console.log('Clan search error', error.response)
      })
  }

  // Additional clan info
  useEffect(() => {
    if (clanId) {
      // clan details lookup
      axios.get(`${apiRoot}/GroupV2/${clanId}/`, {
          headers: {
            'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
          }
        })
        .then(response => {
          setClanDetails(response.data.Response)
        })
        .catch(error => {
          console.log('Clan details error', error.response)
        })

      // clan members lookup
      axios.get(`${apiRoot}/GroupV2/${clanId}/Members`, {
          headers: {
            'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
          }
        })
        .then(response => {
          setClanMembers(response.data.Response.results)
        })
        .catch(error => {
          console.log('Clan members error', error.response)
        })
    }
  }, [clanId])

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
      {clanDetails && (
        <>
        <div className="clanDetails">
          <h2>{clanDetails.detail.name} [{clanDetails.detail.clanInfo.clanCallsign}]</h2>
          <h3>"{clanDetails.detail.motto}"</h3>
          <p>{clanDetails.detail.about}</p>
          <p>{clanDetails.detail.memberCount} Members</p>
        </div>
        {clanMembers && (
          clanMembers.length && (
            <div className={styles.clanStats}>
              <div className={styles.header}>
                <div>Player</div>
                <div>Matches</div>
                <div>Wins</div>
                <div>Win %</div>
                <div>Kills</div>
                <div>Assists</div>
                <div>Deaths</div>
                <div>K/D</div>
                <div>Efficiency</div>
              </div>
              {clanMembers.map((member, i) => (
                <Member member={member} />
              ))}
            </div>
          )
        )}
        </>
      )}
    </div>
  )
}

export default Clan
