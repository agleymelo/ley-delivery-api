export class OrderIsNotPendingError extends Error {
  constructor() {
    super('Order is not pending')
  }
}
