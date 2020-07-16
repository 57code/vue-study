// 类型注解
let var1: string;

var1 = '开课吧'
// var1 = 1 // no ok

// 类型推断
let var2 = true;
// var2 = 1 // no ok

// 常见类型：string, boolean, number, undefined, null

// 类型数组
let arr: string[]
arr = ['tom', 'jerry']

// 任意类型any
let varAny: any;
varAny = 'tom'
varAny = 1

let arrAny: any[]
arrAny = [1, true, 'free']

// 函数中类型约束
function greet(person: string): string {
  return 'hello, ' + person
}
const ret = greet('tom')

function warn(): void { }

// 类型别名
type Foobar = { foo: string, bar: number }
let objType: Foobar
objType = {
  foo: 'fooo',
  bar: 1
}

interface Barfoo {
  foo: string;
  bar: number;
}

// 联合类型
let union: string | number | boolean
union = '1'
union = 1

// 交叉类型
type First = { first: number }
type Second = { second: number }
type FirstAndSecond = First & Second

// 函数
// 必填参数:形参一旦声明必须传递
// 可选参数:?，表明参数是可选的
function greeting(person: string, age?: number): string {
  return 'aaa' + person
}
greeting('tom')

// 重载：以函数参数数量或者类型，或者返回值的类型区分多个同名函数
// 先声明，再实现
// 重载1
function watch(cb1: () => void): void
// 重载2
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void
// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void) {
  if (cb2) {
    console.log('执行重载2');
    
  } else {
    console.log('执行重载1');
    
  }
}

// watch()