import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { setPvpStats, setPveStats } from '../store/actions/members'

import styles from './styles/member.module.scss'

const MemberRow = ({ membershipId, members, setPvpStats, setPveStats }) => {
  const member = members.filter(item => item.membershipId === membershipId)[0]
  const apiRoot = 'https://www.bungie.net/Platform'
  // const [pvpStats, setPvpStats]  = useState(null)
  // const [pveStats, setPveStats]  = useState(null)

  return (
    <>
      {member.pvpStats && (
        member.pvpStats.hasOwnProperty('activitiesEntered') && (
          <div className={styles.member} key={member.membershipId}>
            <div className={styles.name}>
              {member.iconPath && <img src={`https://www.bungie.net/${member.iconPath}`} alt="" />}
              {member.displayName}
              {member.displayNameCode && `#${member.displayNameCode}`}
            </div>

            <div>{member.pvpStats.activitiesEntered}</div>
            <div>{member.pvpStats.activitiesWon}</div>
            <div>
              {Math.round(parseInt(member.pvpStats.activitiesWon) / parseInt(member.pvpStats.activitiesEntered) * 100) / 100}
            </div>
            <div>{member.pvpStats.kills}</div>
            <div>{member.pvpStats.assists}</div>
            <div>{member.pvpStats.deaths}</div>
            <div>{Math.round(member.pvpStats.killsDeathsRatio * 100) / 100}</div>
            <div>{Math.round(member.pvpStats.efficiency * 100) / 100}</div>
          </div>
        )
      )}
    </>
  )
}

const mapStateToProps = state => ({
  members: state.members
})

const mapDispatchToProps = {
  setPvpStats,
  setPveStats
}
 
export default connect(mapStateToProps, mapDispatchToProps)(MemberRow)
