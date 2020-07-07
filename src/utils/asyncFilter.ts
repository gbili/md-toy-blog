export default async function <T=any>(arr: T[], callback: (p: T) => Promise<boolean>): Promise<T[]> {
  const discard = Symbol();
  const tOrDiscard = await Promise.all(arr.map(async item => (await callback(item)) ? item : discard));
  return tOrDiscard.filter(x => x !== discard) as T[];
}