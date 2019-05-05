import uuid from 'uuid';

function generateUuid(): string {
  return uuid.v4();
}

function formatPrice(x: string | number): string {
  return x ? String(x).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' \u20ab' : '0 \u20ab';
}

export default {
  generateUuid,
  formatPrice
};
