export function getCourses() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{ name: 'web全栈', price: 8999 }, { name: 'web高级', price: 8999 }])
    }, 2000);
  })
}