import { colors } from '../assets/styles/colors'

const thumbTheme = (y) => {
  if (y === 1) {
    return colors.danger
  }
  if (y === 2) {
    return colors.warning
  }
  if (y === 3) {
    return colors.krGreen
  }
  if (y === 4) {
    return colors.blueBright
  }
  if (y === 5) {
    return colors.success
  }
}

export default thumbTheme