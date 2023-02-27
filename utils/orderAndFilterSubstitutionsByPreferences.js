
import calculateDistance from './calculateDistance'
import { getUserData } from './getUserData'

export async function orderAndFilterSubstitutionsByPreferences(subs) {
  const user = await getUserData()
  const userCoordinates = {
    latitude: 65.021545,
    longitude: 25.469885
  }

  const filteredSubstitutionsByDistance = subs.filter(s => calculateDistance(userCoordinates.latitude, userCoordinates.longitude, s.coordinates.latitude, s.coordinates.longitude, true) < user.preferences.distance)
  const filteredSubstitutionsByDistanceAndPreferences = filteredSubstitutionsByDistance.filter(s => filterByPreferences(s, user.preferences))
  const ratedAndFilteredSubstitutions = rateSubstitutions(filteredSubstitutionsByDistanceAndPreferences, user.preferences)

  return(ratedAndFilteredSubstitutions.sort(compareSubstitutions))
}

function rateSubstitutions(substitutions, preferences){
  const { morning, evening, night} = preferences
  let points
  substitutions.forEach(s => {
    points = 0
    let type = getShiftOfSubstitution(s)
    if(type === 'morning'){
      if(morning === 2){
        points -= 1    
      }
      if(morning === 4){
        points += 1    
      }
      if(morning === 5){
        points += 2    
      }
    }
    if(type === 'evening'){
      if(evening === 2){
        points -= 1    
      }
      if(evening === 4){
        points += 1    
      }
      if(evening === 5){
        points += 2    
      }
    }
    if(type === 'night'){
      if(night === 2){
        points -= 1    
      }
      if(night === 4){
        points += 1    
      }
      if(night === 5){
        points += 2    
      }
    }
    s.points = points
  })
  return substitutions
}

function compareSubstitutions(a, b) {
  if(a.points < b.points){
    return 1
  } else {
    return -1
  }
}

function filterByPreferences(substitution, preferences) {
  const { morning, evening, night} = preferences
  const type = getShiftOfSubstitution(substitution)

  if(morning === 1 && type === 'morning'){
    return false
  }
  if(evening === 1  && type === 'evening'){
    return false
  }
  if(night === 1  && type === 'night'){
    return false
  }
  return true
}

function getShiftOfSubstitution(substitution) {
  const hours = new Date(substitution.timing.startTime).getHours()

  switch(true){
  case (hours < 5 || hours > 18): // If the shift starts between 18-5==> the shift is a nightshift
    return 'night'
  case (hours <= 9): // If the shift starts between 5-9 AM ==> the shift is a morningshift
    return 'morning'
  case (hours <= 18): // If the shift starts between 9-18 AM ==> the shift is a eveningshift
    return 'evening'
  default: 
    break
  }
}