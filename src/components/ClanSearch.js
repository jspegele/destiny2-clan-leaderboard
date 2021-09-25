import React, { useState } from 'react'
import axios from 'axios'
import { HiOutlineSearch } from 'react-icons/hi'

import database from '../firebase/firebase'
import { history } from '../routers/AppRouter'

import styles from './styles/clan-search.module.scss'

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
        const clan = response.data.Response.results[0]
        database
          .ref(`tracked_clans/${clan.groupId}`)
          .set(clan)
          .then(() => {
            history.push(`/leaderboard/${clan.groupId}`)
          })
      })
      .catch(error => {
        console.log('Clan search error', error)
        setError('Clan not found')
      })
  }

  return (
    <div className={styles.wrapper}>
      <h2>Clan Lookup</h2>
      <form className={styles.form} onSubmit={handleClanLookup}>
        <label htmlFor="clan-search" className="visuallyhidden">Search Clans:</label>{' '}
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder="Exact clan name"
            value={clanName}
            onChange={e => setClanName(e.target.value)}
          />
          <div className={styles.icon}>
            <HiOutlineSearch />
          </div>
        </div>
        <button
        className={styles.button}
          type="submit"
        >
          Go
        </button>
      </form>
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
}

export default ClanSearch
