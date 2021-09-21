import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import database from '../firebase/firebase'
import { setTrackedClans } from '../store/actions/trackedClans'

import Container from '../components/Container'
import ClanSearch from '../components/ClanSearch'
import TopClans from '../components/TopClans'

const HomePage = ({ setTrackedClans }) => {  
  useEffect(() => {
    database.ref(`tracked_clans`).once('value').then(snap => {
      const topClansArray = []
      for (const [key, value] of Object.entries(snap.val())) {
        topClansArray.push({
          ...value
        })
      }
      setTrackedClans(topClansArray)
    })
  }, [setTrackedClans])

  return (
    <Container>
      <ClanSearch />
      <TopClans />
    </Container>
  )
}

const mapDispatchToProps = {
  setTrackedClans
}
 
export default connect(null, mapDispatchToProps)(HomePage)
