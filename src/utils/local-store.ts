class LocalStore {

 static set(key: string, value: string | number) {
  let data = JSON.parse(localStorage.getItem("configs") ?? "{}");
  data = { ...data, [key]: value }
  localStorage.setItem("configs", JSON.stringify(data));
 }
 
 static get(key: string) {
  let data = JSON.parse(localStorage.getItem("configs") ?? "{}");
  return data[key];
 }
 
 static del(key: string) {
  let data = JSON.parse(localStorage.getItem("configs") ?? "{}");
  const { [key]: value, ...rest } = data;
  localStorage.setItem("configs", JSON.stringify(rest));
  return value;
 }

 static exist(key: string) {
  let data = JSON.parse(localStorage.getItem("configs") ?? "{}");
  return data[key] ? true : false;
 }
}

export default LocalStore;