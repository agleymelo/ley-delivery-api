export class YouCannotCancelOrdersAfterDispatchError extends Error {
  constructor() {
    super('You cannot cancel orders after dispatch.')
  }
}
