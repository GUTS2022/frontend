import React from 'react'
import BingMapsReact from 'bingmaps-react'

const Heatmap = () => {
  return (
    <div>
      <h1>Heatmap</h1>
      <BingMapsReact
        bingMapsKey="AjjMz8NnYZ_W9rrK5ehFf_YNlzBIpgY541G-mG9qXve12ox3GOOscXrGo4dDRYlB"
        height="500px"
        mapOptions={{
          navigationBarMode: "square",
        }}
        width="500px"
        viewOptions={{
          center: { latitude: 42.360081, longitude: -71.058884 },
          mapTypeId: "grayscale",
        }}

      />
    </div>
  )
}

export default Heatmap
