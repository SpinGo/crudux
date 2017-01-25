import queryString from 'query-string'

export default (schema, pageParams) => {
  const { key } = schema
  return `${key}/${queryString.stringify(pageParams)}`
}
