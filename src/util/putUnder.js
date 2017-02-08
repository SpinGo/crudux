export default (state, underKey, itemKey, item) => {
  const skey = `${underKey}`
  const { [skey]: store = {} } = state
  store[itemKey] = item
  return { ...state, [skey]: store }
}
