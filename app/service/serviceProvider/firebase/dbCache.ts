import firebase from 'firebase';

class DbCache {
  database: any = {};
  monitorPaths: string[] = [];

  get(path: string): any {
    let pointer: any = this.database;
    let paths = path.split('/');

    for (let p of paths) {
      pointer = pointer[p];
      if (!pointer) {
        break;
      }
    }

    return pointer;
  }

  set(path: string, data: any): void {
    let pointer = this.database;
    let paths = path.split('/');

    paths.forEach((key, i) => {
      pointer[key] = i === paths.length - 1 ? data : pointer[key] || {};
      pointer = pointer[key];
    });
  }

  on(path: string): void {
    this.monitorPaths.push(path);
    firebase
      .database()
      .ref(path)
      .on('value', snapshot => {
        let data = snapshot.val() ? snapshot.val() : null;
        if (data) {
          this.set(path, data);
        }
      });
  }

  off(path: string): void {
    this.monitorPaths = this.monitorPaths.filter(p => p !== path);
    this.set(path, null);
    firebase
      .database()
      .ref(path)
      .off('value');
  }

  hasData(path: string): boolean {
    return this.monitorPaths.find(mp => path.includes(mp)) ? true : false;
  }
}

export default new DbCache();
