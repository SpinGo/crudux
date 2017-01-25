export default (state, underKey, itemKey, item) => {
  const { [underKey]: store = {} } = state
  store[itemKey] = item
  return { ...state, [underKey]: store }
}
