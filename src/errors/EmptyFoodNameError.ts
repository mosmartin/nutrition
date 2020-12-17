class EmptyFoodNameError extends Error {
  constructor(message = 'Empty food name not allowed!') {
    super(message);
  }
}

export default EmptyFoodNameError;
