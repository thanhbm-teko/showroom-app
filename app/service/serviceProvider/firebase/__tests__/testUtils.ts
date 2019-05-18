export function mockFirebaseDbReturn(returnedData: any) {
  let snapshot = <firebase.database.DataSnapshot>{ val: () => returnedData };
  return jest.fn().mockReturnValue({
    ref: jest.fn().mockReturnThis(),
    on: jest.fn((eventType, callback) => callback(snapshot)),
    once: jest.fn(() => Promise.resolve(snapshot)),
    off: jest.fn()
  });
}
