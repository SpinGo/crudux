export default (options) => {
  const { initialState = false, trueWhen, falseWhen } = options
  const trueArray = [].concat(trueWhen)
  const falseArray = [].concat(falseWhen)
  return (state = initialState, action) => {
    switch (true) {
      case trueArray.indexOf(action.type) >= 0:
        return true
      case falseArray.indexOf(action.type) >= 0:
        return false
      default:
        return state
    }
  }
}
