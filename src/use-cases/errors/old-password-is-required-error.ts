export class OldPasswordIsRequiredError extends Error {
  constructor() {
    super('Old password is required')
  }
}
