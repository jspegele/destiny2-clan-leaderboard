import React from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'

import styles from './styles/header.module.scss'

const Header = () => {
  return (
    <Container>
      <header className={styles.header}>
        <Link to="/">
          <h1>Destiny 2 Clan Leaderboard</h1>
        </Link>
      </header>
    </Container>
  )
}
 
export default Header
