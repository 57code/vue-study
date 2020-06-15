// 类型使用
let var1: string; // 类型注解
var1 = '开课吧'
// var1 = 4 // no ok

// 类型推论
let var2 = true;
// var2 = 'aaa' // no ok

// 常用：string,number,boolean,undefined,null,symbol,any

// 结合数组使用
let arr: string[]
arr = ['tom', 'jerry']

// 任意类型
let varAny: any;
varAny = 'xx'
varAny = 2

// any也可以用于数组
let arrAny: any[];
arrAny = [1, true, 'free']
arrAny[1] = 100

// 函数中的类型约束
function greet(person: string): string {
  return 'hello' + person
}

// void类型
function warn(): void {
  // 无需return了
}

// 类型别名type，类似于接口
type FooBar = { foo: string, bar: string }

const aliasType: FooBar = {
  foo: 'foo',
  bar: 'bar'
}

// 联合类型
let union: string | number;
union = '1'
union = 1

// 交叉类型：扩展类型
type First = { first: number }
type Second = { second: number }
type FirstAndSecond = First & Second


// 函数
// 必填参数
// ?可选参数
function greeting(person: string, msg: string = ''): string {
  return 'hello:' + person
}
greeting('tom')
greeting('jerry')

// 重载: 形参或返回值的数量或类型区别多个同名函数
// 先声明在实现
function watch(cb1: () => void): void;
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void;
// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void) {
  if (cb1 && cb2) {
    console.log('重载2');
    
  } else {
    console.log('重载1');
    
  }
}


// class使用
// 03-class.ts
class Parent {
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

class Child extends Parent {

}

const child = new Child()
const parent2 = new Parent()
parent2.foo


// 装饰器
@log(window.alert)
class Foo {
  bar = 'bar'

  @rec
  setBar(val: string) {
    this.bar = val
  }
}

// 类装饰器参数是装饰的class
function log(fn: any) {
  return function (target: Function) {
    // console.log(typeof target);
    
    target.prototype.log = function () {
      fn(this.bar);
      
    }
  }
}

// 参数1是Foo实例
function rec(target: any, name: string, descriptor: any) {
  // 这里通过修改descriptor.value扩展了bar方法
  const baz = descriptor.value;
  descriptor.value = function(val: string) {
      console.log('run method', name);
      baz.call(this, val);
  }
}

const foo = new Foo()
// @ts-ignore
foo.log()