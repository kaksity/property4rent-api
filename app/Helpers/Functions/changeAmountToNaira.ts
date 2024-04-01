function changeAmountToNaira(amountInKobo: number) {
  const CURRENCY_CONVERSION_AMOUNT = 1 / 100

  const convertedAmount = amountInKobo * CURRENCY_CONVERSION_AMOUNT

  return convertedAmount
}

export default changeAmountToNaira
