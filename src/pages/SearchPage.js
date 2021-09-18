import React from 'react'
import ClanSearch from '../components/ClanSearch'

const SearchPage = () => {
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
    <div>
      <h1>Clan Search</h1>
      <ClanSearch />
    </div>
  )
}
 
export default SearchPage
