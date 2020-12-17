class InvalidFoodAmountError extends Error {
  constructor(amount: number) {
    super(`Invalid amount ${amount}. Amount must be a postive number`);
  }
}

export default InvalidFoodAmountError;
