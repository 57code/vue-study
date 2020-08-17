// 类型注解
let var1: string;
var1 = "开课吧";
// var1 = 1 // no ok

// 类型推论
let var2 = true;
// var2 = 'tom' // no ok

// string, number, boolean, null, undefined
// let var3: null | string

// 和数组结合
let arr: string[] = ["tom", "jerry"];

// 任意类型
let varAny: any;
varAny = "xx";
varAny = 3;

// any结合数组
let arrAny: any[] = [1, true, "free"];

// 自定义类型
// 类型别名type
type Foobar = { foo: string, bar: string }

const objType: Foobar = {
  foo: 'foo',
  bar: 'bar'
}

let objType2: Foobar


// 联合类型：扩展类型
let union: string | number
union = '1'
union = 1

// 交叉类型
type First = {first: number}
type Second = {second: number}

type FirstAndSecond = First & Second

// 函数中的类型
// 必填参数:出现就是必选
// 可选参数：？
function greet(person: string, age: number = 18): string {
  return "hello, " + person;
}
greet("tom");

// 重载: 先声明，在实现
function watch(cb1: () => void): void 
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void 
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void): void {
  if (cb1 && cb2) {
    console.log('执行重载2');
    
  } else {
    console.log('执行重载1');
    
  }
}

// watch()


// 函数没有返回值，void
function warn(): void {}


class Parent {
  // 访问修饰符
  private _foo = "foo"; // 私有属性，不能在类的外部访问
  protected bar = "bar"; // 保护属性，可以在子类中访问

  // 参数属性：构造函数参数加修饰符，能够定义为成员属性
  constructor(public tua = "tua") {}

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


// 装饰器原理
function log(fn: any) {
  return function (target: Function) {
    target.prototype.log = function () {
      // console.log('log:', this.bar);
      fn('log:' + this.bar)
    }
  }
}

// 方法装饰器
function rec(target: any, name: string, descriptor: any) {
  // 这里通过修改descriptor.value扩展了bar方法
  const baz = descriptor.value;
  // 覆盖value，修改了class内部的method
  descriptor.value = function(val: string) {
      console.log('run method', name);
      baz.call(this, val);
  }
}

@log(window.alert)
class Foo {
  bar = 'bar'

  @rec
  setBar(val: string) {
    this.bar = val
  }
}

const foo = new Foo()

// @ts-ignore
foo.log()