import React from 'react'
import Container from './Container'

import styles from './styles/header.module.scss'

const Header = () => {
  return (
    <Container>
      <header className={styles.header}>
        <h1>Destiny 2 Clan Leaderboard</h1>
      </header>
    </Container>
  )
}
 
export default Header
