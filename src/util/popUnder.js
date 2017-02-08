export default (state, key, underKey, restore = true) => {
  const skey = `${key}`
  const { [skey]: toRestore, ...newStore } = (state[underKey] || {})
  if (restore) {
    return { ...state, [underKey]: newStore, [skey]: toRestore }
  }
  return { ...state, [underKey]: newStore }
}
