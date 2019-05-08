export function valueOrPlaceholder(data, fieldName) {
  return data && data[fieldName] ? data[fieldName] : '-';
}
