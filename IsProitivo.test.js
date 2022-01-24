import isPositivo from './src/Utils/NumbersOperations'
describe("test numero positivo", () => {
    it("Numero positivo",() => {
        const result = isPositivo(2)
        expect(result).toEqual(true)
    })
    it("numero negativo", () => {
        const result = isPositivo(-2)
        expect(result).toEqual(false)
    })
})