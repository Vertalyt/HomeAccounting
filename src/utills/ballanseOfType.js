
export function billType(cardDetected, type) {
    return cardDetected.filter(c => c.type === type).reduce((t, r) => {
    return t += Number(r.bill)
  }, 0)
  }