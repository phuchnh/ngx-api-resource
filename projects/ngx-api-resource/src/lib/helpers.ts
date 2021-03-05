export function serialize(obj: any, prefix?: string): { [k: string]: string } {
  const params = {};
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p;
      const v = obj[p];
      Object.assign(params, v !== null && typeof v === 'object' ? serialize(v, k) : { [k]: v });
    }
  }
  return params;
}
