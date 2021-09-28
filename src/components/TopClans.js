import React  from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './styles/top-clans.module.scss'

const TopClans = ({ trackedClans }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topClans}>
        <h3>Tracked Clans</h3>
        {trackedClans.length ? (
          <ul>
            {trackedClans.map(clan => (
              <li key={clan.groupId}>
                <Link to={`leaderboard/${clan.groupId}`}>
                  {clan.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  )

}

const mapStateToProps = state => ({
  trackedClans: state.trackedClans
})
 
export default connect(mapStateToProps)(TopClans)
