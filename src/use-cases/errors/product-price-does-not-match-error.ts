export class ProductPriceDoestNotMatchError extends Error {
  constructor() {
    super('Product price does not match')
  }
}
