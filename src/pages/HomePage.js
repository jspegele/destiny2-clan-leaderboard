import React from 'react'

import Container from '../components/Container'
import ClanSearch from '../components/ClanSearch'
import TopClans from '../components/TopClans'

const HomePage = () => {  
  return (
    <Container>
      <ClanSearch />
      <TopClans />
    </Container>
  )
}
 
export default HomePage
