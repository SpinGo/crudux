export default (state, key, underKey) => {
  const { [key]: toSave, [underKey]: store = {}, ...newState } = state
  store[key] = toSave
  return { ...newState, [underKey]: store }
}
