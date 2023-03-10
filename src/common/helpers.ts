export const containsDeep =
  (text: string) =>
  (value?: any): any => {
    if (!value) {
      return false
    }

    const valueType = typeof value

    if (valueType === 'string') {
      return value.toLowerCase().indexOf(text.toLowerCase()) > -1
    }
    if (Array.isArray(value)) {
      return value.some(containsDeep(text))
    }
    if (valueType === 'object') {
      return Object.values(value).some(containsDeep(text))
    }
    return false
  }

export const searchDeepInArray = (array: Array<any>, text: string): any => {
  if (!array || !text) {
    return null
  }
  return array.filter(containsDeep(text))
}
