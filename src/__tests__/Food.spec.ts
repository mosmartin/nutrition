import Food from '../Food';
import EmptyFoodNameError from '../errors/EmptyFoodNameError';
import InvalidFoodAmountError from '../errors/InvalidFoodAmountError';
import Units from '../types/Units';

const baseValues = {
  amount: 100,
  fat: 30,
  carbohydrates: 40,
  protein: 65,
  calories: 124,
};

describe('Food', () => {
  test('create', () => {
    const food = new Food('Rice', Units.GRAM, baseValues);

    expect(food).toBeDefined();
    expect(food.getName()).toEqual('Rice');
    expect(food.getUnit()).toEqual('g');
    expect(food.getBaseValues().amount).toEqual(100);
    expect(food.getBaseValues().fat).toEqual(30);
    expect(food.getBaseValues().carbohydrates).toEqual(40);
    expect(food.getBaseValues().protein).toEqual(65);
    expect(food.getBaseValues().calories).toEqual(124);
    expect(food.getCurrentValues()).toEqual(food.getBaseValues());
  });

  test('create food with empty name', () => {
    expect(() => new Food('', Units.GRAM, baseValues)).toThrowError(
      EmptyFoodNameError
    );
  });

  test('create food with 0 amount', () => {
    const baseValues = {
      amount: 0,
      fat: 30,
      carbohydrates: 40,
      protein: 65,
      calories: 124,
    };

    expect(() => new Food('Rice', Units.GRAM, baseValues)).toThrowError(
      InvalidFoodAmountError
    );
  });

  test('create food and change amount', () => {
    const food = new Food('Rice', Units.GRAM, baseValues);
    food.changeAmount(23);

    expect(food.getCurrentValues().amount).toEqual(23);
  });

  test('create food and change the amount to a negative number', () => {
    const food = new Food('Rice', Units.GRAM, baseValues);

    expect(() => food.changeAmount(-23)).toThrowError(InvalidFoodAmountError);
  });

  test('create food, change amount and calculate current values', () => {
    const food = new Food('Rice', Units.GRAM, baseValues);
    food.changeAmount(87);

    expect(food.getCurrentValues().calories).toEqual(108);
    expect(food.getCurrentValues().fat).toEqual(27);
    expect(food.getCurrentValues().carbohydrates).toEqual(35);
    expect(food.getCurrentValues().protein).toEqual(57);
  });

  describe('create food and change values', () => {
    let food: Food;

    beforeEach(() => {
      const baseValues = {
        amount: 100,
        fat: 4,
        carbohydrates: 450,
        protein: 1,
        calories: 130,
      };

      food = new Food('Rice', Units.GRAM, baseValues);
    });

    test('change calories and calculate current values', () => {
      food.changeCalories(211);

      const {
        calories,
        amount,
        fat,
        carbohydrates,
        protein,
      } = food.getCurrentValues();

      expect(calories).toEqual(211);
      expect(amount).toEqual(163);
      expect(fat).toEqual(7);
      expect(carbohydrates).toEqual(734);
      expect(protein).toEqual(2);
    });

    test('change fat and calculate current values', () => {
      food.changeFat(20);

      const {
        calories,
        amount,
        fat,
        carbohydrates,
        protein,
      } = food.getCurrentValues();

      expect(fat).toEqual(20);
      expect(calories).toEqual(650);
      expect(amount).toEqual(500);
      expect(carbohydrates).toEqual(2250);
      expect(protein).toEqual(5);
    });

    test('change protein and calculate current values', () => {
      food.changeProtein(103);

      const {
        calories,
        amount,
        fat,
        carbohydrates,
        protein,
      } = food.getCurrentValues();

      expect(protein).toEqual(103);
      expect(amount).toEqual(10300);
      expect(fat).toEqual(412);
      expect(calories).toEqual(13390);
      expect(carbohydrates).toEqual(46350);
    });

    test('change carbohydrates and calculate current values', () => {
      food.changeCarbohydrate(11);

      const {
        calories,
        amount,
        fat,
        carbohydrates,
        protein,
      } = food.getCurrentValues();

      expect(carbohydrates).toEqual(11);
      expect(amount).toEqual(3);
      expect(protein).toEqual(1);
      expect(fat).toEqual(1);
      expect(calories).toEqual(4);
    });
  });
});
