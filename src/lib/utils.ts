export const filterUniqueById = <T extends { id: number }>(items: T[]): T[] => {
  const seenIds = new Set<number>()
  return items.filter((item) => {
    if (seenIds.has(item.id)) return false
    seenIds.add(item.id)
    return true
  })
}
