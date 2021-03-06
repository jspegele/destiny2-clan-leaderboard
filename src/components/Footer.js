import React from 'react'
import Container from './Container'

import styles from './styles/footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.createdBy}>
          Created by <a href="https://justinspegele.com">Justin Spegele</a>
        </div>
        <div className={styles.trademark}>
          Destiny 2 is a registered trademark of Bungie and is the property of its
          respective owners. Bungie has not endorsed and is not responsible for the 
          content of this site.
        </div>
      </Container>
    </footer>
  )
}
 
export default Footer
