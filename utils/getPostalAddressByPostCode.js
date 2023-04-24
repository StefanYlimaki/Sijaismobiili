import postCodes from '../assets/data/postcode_map_light.json'

export function getPostalAddressByPostCode(postCode) {
  return(postCodes[postCode])
}