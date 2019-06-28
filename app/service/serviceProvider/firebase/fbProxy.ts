import firebase from 'firebase';

/*
 this class is just a firebase wrapper, help us to mock firebase easier when doing test, so ignore its test coverage
*/
export function getDb(): firebase.database.Database {
  return firebase.database();
}
