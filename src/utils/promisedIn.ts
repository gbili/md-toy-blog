export default function <T=any>(ret: T, time: number): Promise<T> {
  return new Promise(function(resolve,reject){
    setTimeout(() => resolve(ret), time);
  });
};