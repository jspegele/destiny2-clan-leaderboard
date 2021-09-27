const selectVisibleMembers = (members, { sortBy, text, hoursPlayed }) => {
  return members.filter(member => {
    const textMatch = member.displayName.toLowerCase().includes(text.toLowerCase()) || member.displayNameCode.includes(text.toLowerCase())
    const hoursPlayedMatch = hoursPlayed ? (member.pvpStats.secondsPlayed / 60 / 60) >= hoursPlayed : true
    const hasPvpStats = member.pvpStats.hasOwnProperty('activitiesEntered')
    return textMatch && hoursPlayedMatch && hasPvpStats
  }).sort((a, b) => {
    if (sortBy === 'nameAsc') {
      return a.displayName.toLowerCase() < b.displayName.toLowerCase() ? -1 : 1
    } else if (sortBy === 'nameDesc') {
      return a.displayName.toLowerCase() > b.displayName.toLowerCase() ? -1 : 1
    } else if (sortBy === 'pvpMatchesDesc') {
      return a.pvpStats.activitiesEntered < b.pvpStats.activitiesEntered ? 1 : -1;
    } else if (sortBy === 'pvpMatchesAsc') {
      return a.pvpStats.activitiesEntered > b.pvpStats.activitiesEntered ? 1 : -1;
    } else if (sortBy === 'pvpWinsDesc') {
      return a.pvpStats.activitiesWon < b.pvpStats.activitiesWon ? 1 : -1;
    } else if (sortBy === 'pvpWinsAsc') {
      return a.pvpStats.activitiesWon > b.pvpStats.activitiesWon ? 1 : -1;
    } else if (sortBy === 'pvpWinRatioDesc') {
      return a.pvpStats.winLossRatio < b.pvpStats.winLossRatio ? 1 : -1;
    } else if (sortBy === 'pvpWinRatioAsc') {
      return a.pvpStats.winLossRatio > b.pvpStats.winLossRatio ? 1 : -1;
    } else if (sortBy === 'pvpKillsDesc') {
      return a.pvpStats.kills < b.pvpStats.kills ? 1 : -1;
    } else if (sortBy === 'pvpKillsAsc') {
      return a.pvpStats.kills > b.pvpStats.kills ? 1 : -1;
    } else if (sortBy === 'pvpAssistsDesc') {
      return a.pvpStats.assists < b.pvpStats.assists ? 1 : -1;
    } else if (sortBy === 'pvpAssistsAsc') {
      return a.pvpStats.assists > b.pvpStats.assists ? 1 : -1;
    } else if (sortBy === 'pvpDeathsDesc') {
      return a.pvpStats.deaths < b.pvpStats.deaths ? 1 : -1;
    } else if (sortBy === 'pvpDeathsAsc') {
      return a.pvpStats.deaths > b.pvpStats.deaths ? 1 : -1;
    } else if (sortBy === 'pvpKdrDesc') {
      return a.pvpStats.killsDeathsRatio < b.pvpStats.killsDeathsRatio ? 1 : -1;
    } else if (sortBy === 'pvpKdrAsc') {
      return a.pvpStats.killsDeathsRatio > b.pvpStats.killsDeathsRatio ? 1 : -1;
    } else if (sortBy === 'pvpEfficiencyDesc') {
      return a.pvpStats.efficiency < b.pvpStats.efficiency ? 1 : -1;
    } else if (sortBy === 'pvpEfficiencyAsc') {
      return a.pvpStats.efficiency > b.pvpStats.efficiency ? 1 : -1;
    } else {
      return a < b
    }
  })
}

export default selectVisibleMembers
