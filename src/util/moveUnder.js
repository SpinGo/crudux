export default (state, key, underKey) => {
  const skey = `${key}`
  const { [skey]: toSave, [underKey]: store = {}, ...newState } = state
  store[skey] = toSave
  return { ...newState, [underKey]: store }
}
