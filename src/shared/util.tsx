export function replaceItemAtIndex(arr: any, index: any, newValue: any) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  
  export function removeItemAtIndex(arr: any, index: any) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }
  