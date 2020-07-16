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


// class

// 03-class.ts
class Parent {
  private _foo = "foo"; // 私有属性，不能在类的外部访问
  protected bar = "bar"; // 保护属性，可以在子类中访问

  // 参数属性：构造函数参数加修饰符，能够定义为成员属性
  constructor(public tua = "tua") {

  }

  // 方法也有修饰符
  private someMethod() {}

  // 存取器：属性方式访问，可添加额外逻辑，控制读写性
  get foo() {
    return this._foo;
  }
  set foo(val) {
    this._foo = val;
  }
}


interface Result<T> {
  ok: 0 | 1;
  data: T[];
}

// function getResult<T>(data: T): Result<T> {
//   return {ok:1, data};
// }

// getResult<string>()

// 装饰器：加工厂函数
// 类装饰器
function log(fn) {
  // 装饰器工厂: 返回一个装饰器
  return function (target:any) {
    // target就是Foo
    console.log(typeof target); // function
  
    // 加个log方法
    target.prototype.log = function () {
      // console.log(this.bar);
      fn(this.bar)
    }
    
  }
}

// 方法装饰器：区别是参数数量和类型
// target类实例，name：方法名，最后的是描述符
function rec(target: any, name: string, descriptor: any) {
  // 这里通过修改descriptor.value扩展了bar方法
  const baz = descriptor.value;
  descriptor.value = function(val: string) {
      // 扩展功能
      console.log('run method', this.bar);
      // 本来功能
      baz.call(this, val);
      console.log('run method', this.bar);
  }
}

@log(window.alert)
class Foo {
  bar: string = 'bar'

  @rec
  setBar(v:string) {
    this.bar = v
  }
}

const f1 = new Foo()
// @ts-ignore
f1.log()
f1.setBar('barrrrr')