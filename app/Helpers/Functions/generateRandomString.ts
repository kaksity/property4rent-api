import randomstring from 'randomstring'

type RandomStringGeneratorOptionsType = {
  length: number

  charset: 'alphanumeric' | 'alphabetic' | 'numeric'

  isCapitalized: boolean
}
export default function generateRandomString(
  randomStringGeneratorOptionsType: RandomStringGeneratorOptionsType
) {
  const {
    length = 8,
    charset = 'alphabetic',
    isCapitalized = 'lowercase',
  } = randomStringGeneratorOptionsType

  if (charset === 'numeric') {
    return randomstring.generate({
      length,
      charset,
    })
  }

  return randomstring.generate({
    length,
    charset,
    capitalization: isCapitalized === true ? 'uppercase' : 'lowercase',
  })
}
