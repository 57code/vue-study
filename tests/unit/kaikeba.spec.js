function add(n1, n2) {
  return n1+n2
}

// 套件
describe('add函数', () => {
  it('加法运算是否正确', () => {
    // 断言
    expect(add(1,1)).toBe(2)
  })
})
