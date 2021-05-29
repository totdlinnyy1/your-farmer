const status = (stat: string): string => {
  if (stat === 'show') return 'Показывается'
  return 'Не показывается'
}

export default status
