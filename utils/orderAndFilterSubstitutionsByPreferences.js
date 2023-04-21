
import calculateDistance from './calculateDistance'
import { getUserData } from './getUserData'

export async function orderAndFilterSubstitutionsByPreferences(subs) {
  const user = await getUserData() // get userdata to be used in the ranking of the substitutions

  // Setting usercoordinates used in the ranking of the substitutions
  const userCoordinates = {
    latitude: 65.021545,
    longitude: 25.469885
  }

  const filteredSubstitutionsThatHaveStartedAlready = subs.filter(s => !substitutionHasStartTimeInThePast(s))

  // Substitutions that locate within the max distance set in the user preferences
  const filteredSubstitutionsByDistance = filteredSubstitutionsThatHaveStartedAlready.filter(s => calculateDistance(userCoordinates.latitude, userCoordinates.longitude, s.coordinates.latitude, s.coordinates.longitude, true) < user.preferences.distance)
  
  // Substitutions that locate within the max distance set in the user preferences and that are not unwanted based on the preferences 
  // (for example if user doesn't want night shifts, they are removed here)
  const filteredSubstitutionsByDistanceAndPreferences = filteredSubstitutionsByDistance.filter(s => filterByPreferences(s, user.preferences))

  // Scoring the substitutions left after the filterings mentioned abpve. 
  const ratedAndFilteredSubstitutions = rateSubstitutions(filteredSubstitutionsByDistanceAndPreferences, user.preferences)
  
  // Returning a ranked list with the first substitution being the most fitting.
  return(ratedAndFilteredSubstitutions.sort(compareSubstitutions))
}

// Checks whether given substitution has startTime in the past
// If substitution has startTime in the past ==> return true
function substitutionHasStartTimeInThePast(substitution){
  const nowInMillis = new Date().getTime()
  const substitutionStartTimeInMillis = new Date(substitution.timing.startTime).getTime()
  if(nowInMillis > substitutionStartTimeInMillis){
    return true
  }
  return false
}

function rateSubstitutions(substitutions, preferences){
  const { morning, evening, night, fullShift, pay} = preferences // get the prefenrences to as seperate variables

  /* For each substitution to be rated 
     1. Compare the type of the shift to preferences
        - If the user has set preference on morning shifts to 1 ==> the substitution is filtered out earlier.
        - If the user has set preference on morning shifts to 2 ==> deduct 0.4 points from the total amount of points.
        - If the user has set preference on morning shifts to 3 ==> no effect on points
        - If the user has set preference on morning shifts to 4 ==> add 0.4 points to the total amount of points.
        - If the user has set preference on morning shifts to 5 ==> add 0.8 points to the total amount of points.
     1.1 Same is repeated on evening and night shifts

     2. Compare the lenght of the shift to preferences
        - If the user has set preference on full shifts to 1 (the user is preferring shorter shifts) 
          ==> deduct 0.8 points from the total amount of the points if the substitutions is longer than 5 hours.
        - If the user has set preference on full shifts to 2 (the user is more preferring of shorter shifts)
          ==> deduct 0.4 points from the total amount of the points if the substitutions is longer than 5 hours.
        - If the user has set preference on full shifts to 3
          ==> no effect on points
        - If the user has set preference on full shifts to 4 (the user is more preferring of longer shifts)
          ==> add 0.4 points to the total amount of points
        - If the user has set preference on full shifts to 5 (the user is preferring longer shifts) 
          ==> add 0.8 points to the total amount of points

      3. Compare the hourly pay to the preferences
        - If the user has set preference on pay to 1
          ==> hourly pay of the substitution has no effect on the total amount of points
        - If the user has set preference on pay to 2
          ==> hourly pay is divided by 10 and the result of that is added to the total amount of points
        - If the user has set preference on pay to 3
          ==> hourly pay is divided by 8 and the result of that is added to the total amount of points
        - If the user has set preference on pay to 4
          ==> hourly pay is divided by 7 and the result of that is added to the total amount of points
        - If the user has set preference on pay to 5
          ==> hourly pay is divided by 6 and the result of that is added to the total amount of points

      3.1 Examples
        Example 1: 
          - If the user has set preference on pay to 1 and the substitution has 15 euros per hour
            ==> points stay ineffected
          - If the user has set preference on pay to 2 and the substitution has 15 euros per hour
            ==> 15/10 = 1.5 points added to the total amount of points
          - If the user has set preference on pay to 3 and the substitution has 15 euros per hour
            ==> 15/8 = 1.875 points added to the total amount of points
          - If the user has set preference on pay to 4 and the substitution has 15 euros per hour
            ==> 15/7 = 2.143 points added to the total amount of points
          - If the user has set preference on pay to 5 and the substitution has 15 euros per hour
            ==> 15/6 = 2.5 point is added to the total amount of points
        Example 2: 
          - If the user has set preference on pay to 1 and the substitution has 20 euros per hour
            ==> points stay ineffected
          - If the user has set preference on pay to 2 and the substitution has 20 euros per hour
            ==> 20/10 = 2 points added to the total amount of points
          - If the user has set preference on pay to 3 and the substitution has 20 euros per hour
            ==> 20/8 = 2.5 points added to the total amount of points
          - If the user has set preference on pay to 4 and the substitution has 20 euros per hour
            ==> 20/7 = 2.857 points added to the total amount of points
          - If the user has set preference on pay to 5 and the substitution has 20 euros per hour
            ==> 20/6 = 3.334 point is added to the total amount of points
  */
  substitutions.forEach(s => {
    let points = 0
    let type = getShiftOfSubstitution(s)
    if(type === 'morning'){
      if(morning === 2){
        points -= 0.4
      } else if(morning === 4){
        points += 0.4    
      } else if(morning === 5){
        points += 0.8  
      }
    }
    if(type === 'evening'){
      if(evening === 2){
        points -= 0.4    
      } else if(evening === 4){
        points += 0.4    
      } else if(evening === 5){
        points += 0.8    
      }
    }
    if(type === 'night'){
      if(night === 2){
        points -= 0.4    
      } else if(night === 4){
        points += 0.4    
      } else if(night === 5){
        points += 0.8   
      }
    }

    if(s.timing.duration > 300 && fullShift !== 3){
      if(fullShift === 1){
        points -= 0.8
      } else if(fullShift === 2){
        points -= 0.4
      } else if(fullShift === 4){
        points += 0.4
      } else if(fullShift === 5){
        points += 0.8
      }
    }

    if(pay === 2){
      points += (s.hourlyPay/10)
    } else if(pay === 3){
      points += (s.hourlyPay/8)
    } else if(pay === 4){
      points += (s.hourlyPay/7)
    } else if(pay === 5){
      points += (s.hourlyPay/6)
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