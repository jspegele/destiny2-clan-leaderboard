import React from 'react'
import ContentLoader from "react-content-loader"

const ClanLeaderboardSkeleton = () => {
  return (
    <ContentLoader 
      speed={2}
      height={965}
      width={'100%'}
      backgroundColor="#1a1a27"
      foregroundColor="#1c1c2e"
    >
      {/* Intro */}
      <rect x="0" y="0" rx="3" ry="3" width="500" height="38" />
      <rect x="0" y="58" rx="3" ry="3" width="400" height="34" />
      <rect x="0" y="112" rx="3" ry="3" width="350" height="19" />
      <rect x="0" y="141" rx="3" ry="3" width="350" height="19" />
      <rect x="0" y="170" rx="3" ry="3" width="350" height="19" />
      
      {/* Leaders */}
      <rect x="0" y="215" rx="8" ry="8" width="190" height="225" />
      <rect x="200" y="215" rx="8" ry="8" width="190" height="225" />

      {/* Table */}
      <rect x="0" y="480" rx="3" ry="3" width="100%" height="18" />
      <rect x="0" y="508" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="546" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="584" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="622" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="660" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="698" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="736" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="774" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="812" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="850" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="888" rx="3" ry="3" width="100%" height="28" />
      <rect x="0" y="926" rx="3" ry="3" width="100%" height="28" />
    </ContentLoader>
  )
}
 
export default ClanLeaderboardSkeleton