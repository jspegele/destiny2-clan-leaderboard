import React from 'react'

import Clan from './components/Clan'

const App = () => {
  // test fetch
  // fetch("https://www.bungie.net/Platform/User/Search/Prefix/TheMachoMan/0/", {
  //     headers: {
  //       'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       console.log('test fetch', result)
  //     },
  //     (error) => {
  //       console.log('test fetch error', error)
  //     }
  //   )

  return (
    <div className="App">
      <h1>Destiny Clan Leaderboard</h1>
      <Clan />
    </div>
  )
}

export default App
