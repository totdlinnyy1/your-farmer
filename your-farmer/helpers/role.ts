const role = (userRole: string): string => {
  if (userRole === 'farmer') return 'Фермер'
  return 'Покупатель'
}

export default role
