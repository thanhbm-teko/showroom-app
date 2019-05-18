import FbProxy from './fbProxy';

class DbCache {
  database: any = {};
  listeningPaths: string[] = [];

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

  listen(path: string): void {
    this.listeningPaths.push(path);
    FbProxy.getDb()
      .ref(path)
      .on('value', snapshot => {
        this.set(path, snapshot.val());
      });
  }

  unlisten(path: string): void {
    this.listeningPaths = this.listeningPaths.filter(p => p !== path);
    this.set(path, null);
    FbProxy.getDb()
      .ref(path)
      .off('value');
  }

  isListening(path: string): boolean {
    return this.listeningPaths.find(mp => path.includes(mp)) ? true : false;
  }
}

export default new DbCache();
