export function safeValue(data, fieldName, defaultValue = '-') {
  return data && data[fieldName] ? data[fieldName] : defaultValue;
}

export function formatPrice(x) {
  return x ? String(x).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' \u20ab' : '0 \u20ab';
}
