import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { setClan } from "../store/actions/clan"
import { setMembers, setPvpStats } from "../store/actions/members"
import { setClanStats } from "../store/actions/trackedClans"

import styles from './styles/clan-leaderboard.module.scss'

import ClanDetails from './ClanDetails'
import MemberRow from './MemberRow'

const ClanLeaderboard = ({ clanId, clan, members, setClan, setMembers, setPvpStats, setClanStats }) => {
  const [error, setError] = useState(null)
  const apiRoot = 'https://www.bungie.net/Platform'

  useEffect(() => {
    // Get clan and member info from bungie if not set in store
    if (clan.groupId !== clanId) {
      // clan details lookup
      axios.get(`${apiRoot}/GroupV2/${clanId}/`, {
          headers: {
            'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
          }
        })
        .then(response => {
          const clanInfo = response.data.Response.detail
          setClan({
            about: clanInfo.about,
            avatarPath: clanInfo.avatarPath,
            capabilities: clanInfo.capabilities,
            clanCallsign: clanInfo.clanInfo.clanCallsign,
            creationDate: clanInfo.creationDate,
            groupId: clanInfo.groupId,
            groupType: clanInfo.groupType,
            locale: clanInfo.locale,
            memberCount: clanInfo.memberCount,
            membershipOption: clanInfo.membershipOption,
            motto: clanInfo.motto,
            name: clanInfo.name
          })
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
        const results = response.data.Response.results
        const membersArray = []
        results.forEach(item => {
          membersArray.push({
            displayName: item.destinyUserInfo.bungieGlobalDisplayName || item.destinyUserInfo.displayName,
            displayNameCode: item.destinyUserInfo.bungieGlobalDisplayNameCode || "",
            membershipId: item.destinyUserInfo.membershipId,
            membershipType: item.destinyUserInfo.membershipType,
            bungieNetMembershipId: item.bungieNetUserInfo ? item.bungieNetUserInfo.membershipId : "",
            bungieNetMembershipType: item.bungieNetUserInfo ? item.bungieNetUserInfo.membershipType : "",
            iconPath: item.bungieNetUserInfo ? item.bungieNetUserInfo.iconPath : item.destinyUserInfo.iconPath,
            groupId: item.groupId,
            isOnline: item.isOnline,
            joinDate: item.joinDate,
            lastOnlineStatusChange: item.lastOnlineStatusChange,
            memberType: 3
          })
        })
        setMembers(membersArray)
      })
      .catch(error => {
        console.log('Clan members errorx', error.response)
        setError('Error retreiving clan roster')
      })

    }
  }, [clan.groupId, clanId, setClan, setMembers])

  // useEffect(() => {
  //   if (members.length) {
  //     // Clan Total stats
  //     let totalActivities = 0,
  //         totalWins = 0,
  //         totalKills = 0,
  //         totalAssists = 0,
  //         totalDeaths = 0

  //     members.forEach(member => {
  //       // Get Member Stats from Bungie
  //       const apiEnpoint = `/Destiny2/${member.destinyUserInfo.membershipType}/Account/${member.destinyUserInfo.membershipId}/Stats/`
  //       axios.get(`${apiRoot}${apiEnpoint}`, {
  //           headers: {
  //             'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
  //           }
  //         })
  //         .then(response => {
  //           // Handle PVP Values
  //           const pvpAllTime = response.data.Response.mergedAllCharacters.results.allPvP.allTime
  //           // add stats to member object in store
  //           setPvpStats(member.destinyUserInfo.membershipId, {
  //             ...pvpAllTime
  //           })

  //           // Add member stats to totals
  //           totalActivities += pvpAllTime.activitiesEntered.basic.value
  //           totalWins += pvpAllTime.activitiesWon.basic.value
  //           totalKills += pvpAllTime.kills.basic.value
  //           totalAssists += pvpAllTime.assists.basic.value
  //           totalDeaths += pvpAllTime.deaths.basic.value

  //           // setPveStats({
  //           //   ...response.data.Response.mergedAllCharacters.results.allPvE.allTime
  //           // })
  //         })
  //         .catch(error => {
  //           console.log('Clan members error', error.response)
  //         })
  //     })

  //     setClanStats({
  //       totalActivities,
  //       totalWins,
  //       totalKills,
  //       totalAssists,
  //       totalDeaths
  //     })

  //     // calculate clan total stats
  //     // let totalActiviites = 0,
  //     //     totalWins = 0,
  //     //     totalKills = 0,
  //     //     totalAssists = 0,
  //     //     totalDeaths = 0
  //     // for (let i = 0; i < members.length; i++) {
  
  //     // }
  //   }
  // }, [members.length])

  return (
    <div>
      {error && (
        <p>{error}</p>
      )}
      {clan.groupId && (
        <>
          <ClanDetails clan={clan} />
          {members.length && (
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
              {members.map(member => (
                <MemberRow
                  key={member.membershipId}
                  membershipId={member.membershipId}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  clan: state.clan,
  members: state.members
})

const mapDispatchToProps = {
  setClan,
  setMembers,
  setPvpStats,
  setClanStats
}

export default connect(mapStateToProps, mapDispatchToProps)(ClanLeaderboard)
