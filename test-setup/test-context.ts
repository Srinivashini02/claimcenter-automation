const container: Map<string, any> = new Map();

function clear() {
  container.clear();
}

function add(key: string, value: any) {
  container.set(key, value);
}

function get(key: string) {
  return container.get(key);
}

function remove(key: string) {
  container.delete(key);
}

function getAsJsonString() {
  const json = Object.fromEntries(container);
  return JSON.stringify(json, null, 2);
}

export const testContext = { clear, add, get, remove, getAsJsonString };
