export default (state, key, underKey, restore = true) => {
  const { [key]: toRestore, ...newStore } = (state[underKey] || {})
  if (restore) {
    return { ...state, [underKey]: newStore, [key]: toRestore }
  }
  return { ...state, [underKey]: newStore }
}
