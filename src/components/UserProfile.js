import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserProfile = () => {
  const displayName = 'TheMachoMan'
  const apiRoot = 'https://www.bungie.net/Platform'
  const [membership, setMembership] = useState(null)

  // Get Membership from displayName
  useEffect(() => {
    axios
      .get(`${apiRoot}/User/Search/Prefix/${displayName}/0/`, {
        headers: {
          'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
        }
      })
      .then(response => {
        console.log('user search', response.data)
        const searchResults = response.data.Response.searchResults
        if (searchResults.length) {
          setMembership({
            type: searchResults[0].destinyMemberships[0].membershipType,
            id: searchResults[0].destinyMemberships[0].membershipId
          })
        }
      })
      .catch(error => {
        console.log('user search error', error.response)
      })
  }, [])

  // Get Profile from membership
  useEffect(() => {
    if (membership) {
      axios
        .get(`${apiRoot}/Destiny2/${membership.type}/Profile/${membership.id}/?components=100`, {
          headers: {
            'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
          }
        })
        .then(response => {
          console.log('profile', response.data)
        })
        .catch(error => {
          console.log('profile error', error.response)
        })
    }
  }, [membership])

  return (
    <div className="Profile">
      <h2>User Profile</h2>
      <p>
        {displayName}: {membership && `${membership.type} - ${membership.id}`}
      </p>
    </div>
  )
}

export default UserProfile
