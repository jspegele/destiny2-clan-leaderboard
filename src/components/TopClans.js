import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import database from '../firebase/firebase'
import styles from './styles/top-clans.module.scss'

const TopClans = () => {
  const [topClans, setTopClans] = useState([])

  useEffect(() => {
    database.ref(`tracked_clans`).once('value').then(snap => {
      const topClansArray = []
      for (const [key, value] of Object.entries(snap.val())) {
        topClansArray.push({
          id: key,
          name: value
        })
      }
      setTopClans(topClansArray)
    })
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.topClans}>
        <h3>Tracked Clans</h3>
        {topClans.length && (
          <ul>
            {topClans.map(clan => (
              <li key={clan.id}>
                <Link to={`leaderboard/${clan.id}`}>
                  {clan.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )

}
 
export default TopClans
