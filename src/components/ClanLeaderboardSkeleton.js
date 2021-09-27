import React from 'react'
import ContentLoader from "react-content-loader"

const ClanLeaderboardSkeleton = () => {
  return (
    <ContentLoader 
      speed={2}
      height={815}
      width={'100%'}
      backgroundColor="#1a1a27"
      foregroundColor="#1c1c2e"
    >
      <rect x="0" y="0" rx="3" ry="3" width="500" height="38" />
      <rect x="0" y="58" rx="3" ry="3" width="400" height="34" />
      <rect x="0" y="112" rx="3" ry="3" width="350" height="19" />
      <rect x="0" y="141" rx="3" ry="3" width="350" height="19" />
      <rect x="0" y="170" rx="3" ry="3" width="350" height="19" />
      <rect x="0" y="215" rx="3" ry="3" width="100%" height="18" />
      <rect x="0" y="243" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="281" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="319" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="357" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="395" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="433" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="471" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="509" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="547" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="585" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="623" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="661" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="699" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="737" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="775" rx="3" ry="3" width="100%" height="28" />
    </ContentLoader>
  )
}
 
export default ClanLeaderboardSkeleton