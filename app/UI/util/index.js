export function safeValue(data, fieldName, defaultValue = '-') {
  return data && data[fieldName] ? data[fieldName] : defaultValue;
}
