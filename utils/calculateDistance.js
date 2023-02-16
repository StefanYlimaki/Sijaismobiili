//Haversine formula
//Arguments: Coordinates as decimal degrees
//Returns: Formatted string containing distance in kilometers
//         If distance is <1km return distance in metres
function calculateDistance (lat1, lon1, lat2, lon2) {
  const earthRadius = 6371e3 //In metres


  const lat1Rad = lat1 * Math.PI/180
  const lat2Rad = lat2 * Math.PI/180


  const latDelta = (lat2-lat1) * Math.PI/180
  const lonDelta = (lon2-lon1) * Math.PI/180


  const a = Math.sin(latDelta/2) * Math.sin(latDelta/2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(lonDelta/2) * Math.sin(lonDelta/2)


  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

  const d = (earthRadius * c) / 1000 //Distance in kilometers

  const distanceString = d >= 1? 
    Math.round(d) + 'km' : 
    Math.round(d*1000) + 'm'

  return (distanceString)
}

export default calculateDistance