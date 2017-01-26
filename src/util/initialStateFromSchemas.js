export default schemas =>
  schemas.reduce((acc, { key }) => ({ ...acc, [key]: {} }), {})
