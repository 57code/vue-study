// ts-test.ts
let var1: string; // 类型注解
var1 = "开课吧"; // 正确
// var1 = 4; // 错误

// 编译器类型推断可省略这个语法
let var2 = true;
// var2 = 4; // 错误

// 常见原始类型: string,number,boolean,undefined,null,symbol

// 类型数组
let arr: string[];
arr = ['Tom']; // 或Array<string>

// 任意类型any
let varAny: any;
varAny = 'xx';
varAny = 3;

// any类型也可用于数组
let arrAny: any[];
arrAny = [1, true, "free"]; 
arrAny[1] = 100;

// 函数中的类型约束
function greet(person: string): string {
  return 'hello, ' + person;
}
// void类型，常用于没有返回值的函数
function warn(): void {}

// 类型别名
type Foobar = { foo: string, bar: string }
var objType: Foobar
objType = {foo:'foo', bar:'barr'}

// 联合类型
let union: string | number
union = '1'
union = 1

// 交叉类型
type First = {first:number}
type Second = {second:number}

type FirstAndSecond = First & Second


// 函数
// 1.形参声明就是必填项
// 2.?表示可选
function greeting(person: string, age = 18, msg?: string): string {
  return "Hello, " + person;
}
greeting('tom')

// 重载：
// 重载1
function watch(cb1: () => void): void;
// 重载2
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void;
// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void) {
    if (cb1 && cb2) {
        console.log('执行watch重载2');        
    } else {
        console.log('执行watch重载1');        
    }
}
watch(()=>{})
watch(()=>{}, (v1, v2) => {})


// class
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
  constructor() {
    super()
  }
}

// 接口：只定义结构，不定义实现
interface Person {
  firstName: string;
  lastName: string;
}

// greeting函数通过Person接口约束参数解构
function greeting2(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
greeting2({firstName: 'Jane', lastName: 'User'}); // 正确
// greeting2({firstName: 'Jane'}); // 错误


// 不用泛型
interface Result<T> {
  ok: 0 | 1;
  data: T;
}