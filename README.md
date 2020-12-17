# Nutrition Calculator

Create Foods with a base nutritional value and re-calculate new nutritional values if any amount changes.

## Installation

```
npm i @mosmartin/nutrition
```

## Example

```
import { Food, Nutrition, Units } from '@mosmartin/nutrition';

const baseValues = {
  amount: 100,
  fat: 30,
  carbohydrates: 40,
  protein: 65,
  calories: 124,
};

// instantiate the Food Class
const food = new Food('Rice', Units.GRAM, baseValues);

// returns 'rice
food.getName();

// returns 'g'
food.getUnit();

// change food amount value
food.changeAmount(23);

// get base nutrition values of rice
const { calories, amount, fat, carbohydrates, protein } = food.getBaseValues();

// get current nutrition values of rice
const { calories, amount, fat, carbohydrates, protein } = food.getCurrentValues();
```

## Error Handling

```
import { Food, Nutrition, Units, InvalidFoodAmountError } from '@mosmartin/nutrition';

const baseValues = {
  amount: 100,
  fat: 30,
  carbohydrates: 40,
  protein: 65,
  calories: 124,
};

try {
    const rice = new Food('Rice', Units.GRAM, baseValues);
} catch(error) {
    // error: InvalidFoodAmountError
}
```

### Error Types
- **InvalidFoodAmountError**: If the amount of the baseValues and/or changeAmount is less or equal to zero.
- **EmptyFoodNameError**: If the food first parameter is empty.