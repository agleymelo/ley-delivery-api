export class YouCannotDeliverOrdersInDispatchStatusError extends Error {
  constructor() {
    super('You cannot dispatch orders that are not in "processing" status.')
  }
}
