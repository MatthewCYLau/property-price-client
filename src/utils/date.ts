export const convertDateToValidFormet = (date: Date): string => {
  const dateString = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const monthString =
    date.getMonth() < 9
      ? '0' + (date.getMonth() + 1).toString()
      : date.getMonth() + 1
  return `${date.getFullYear()}-${monthString}-${dateString}`
}
