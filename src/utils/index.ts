export function object2String(obj?: { [prop: string]: string }) {
  if (!obj) return "";
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
}
