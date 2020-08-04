import { BaseModel } from './BaseModel'


it('doesnt explode', () => {
    new BaseModel()
})


it('constructs from props', () => {
    const model = new BaseModel({
        foo: 'bar'
    })
    expect(model).toHaveProperty('foo', 'bar')
})