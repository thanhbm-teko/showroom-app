import { ApiResult } from '../../core/model/ResultCode';

export async function runApiParallel(jobFunctions: any[]): Promise<ApiResult[]> {
  let promises = jobFunctions.map(
    jf =>
      new Promise<ApiResult>(async resolve => {
        let r = await jf();
        resolve(r);
      })
  );

  let values = await Promise.all(promises);
  return values;
}
