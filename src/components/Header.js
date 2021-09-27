import React from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'

import logo from '../images/destiny2-clan-leaderboard.png'
import styles from './styles/header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <Link to="/">
          <h1><img src={logo} alt="Destiny 2 Clan Leaderboard" /></h1>
        </Link>
      </Container>
    </header>
  )
}
 
export default Header
