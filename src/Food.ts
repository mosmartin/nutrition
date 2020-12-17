import EmptyFoodNameError from './errors/EmptyFoodNameError';
import InvalidFoodAmountError from './errors/InvalidFoodAmountError';
import Nutrition from './types/Nutrition';
import Units from './types/Units';

class Food {
  private currentValues: Nutrition;

  constructor(
    private readonly name: string,
    private readonly unit: Units,
    private readonly baseValues: Nutrition
  ) {
    this.validateFoodName(name);
    this.validateFoodAmount(baseValues.amount);
    this.currentValues = { ...baseValues };
  }

  private validateFoodAmount(amount: number) {
    if (amount <= 0) {
      throw new InvalidFoodAmountError(amount);
    }
  }

  private validateFoodName(name: string) {
    if (name.length === 0) {
      throw new EmptyFoodNameError();
    }
  }

  getName(): string {
    return this.name;
  }

  getUnit(): string {
    return this.unit;
  }

  getBaseValues(): Nutrition {
    return this.baseValues;
  }

  getCurrentValues(): Nutrition {
    return this.currentValues;
  }

  changeAmount(amount: number) {
    this.validateFoodAmount(amount);
    this.currentValues.amount = amount;
    this.calculateNutrients(['calories', 'fat', 'carbohydrates', 'protein']);
  }

  changeCalories(calories: number) {
    this.currentValues.calories = calories;
    this.currentValues.amount = this.calculateAmountFromNutrition('calories');
    this.calculateNutrients(['fat', 'carbohydrates', 'protein']);
  }

  changeFat(fat: number) {
    this.currentValues.fat = fat;
    this.currentValues.amount = this.calculateAmountFromNutrition('fat');
    this.calculateNutrients(['calories', 'carbohydrates', 'protein']);
  }

  changeProtein(protein: number) {
    this.currentValues.protein = protein;
    this.currentValues.amount = this.calculateAmountFromNutrition('protein');
    this.calculateNutrients(['calories', 'carbohydrates', 'fat']);
  }

  changeCarbohydrate(carbohydrates: number) {
    this.currentValues.carbohydrates = carbohydrates;
    this.currentValues.amount = this.calculateAmountFromNutrition(
      'carbohydrates'
    );
    this.calculateNutrients(['calories', 'protein', 'fat']);
  }

  private calculateAmountFromNutrition(nutrition: string) {
    return Math.ceil(
      (this.currentValues[nutrition] * this.baseValues.amount) /
        this.baseValues[nutrition]
    );
  }

  private calculateNutrients(nutrients: string[]) {
    nutrients.map((nutrient) => {
      this.currentValues[nutrient] = this.calculateNutritionFromAmount(
        nutrient
      );
    });
  }

  calculateNutritionFromAmount(nutrition: string) {
    return Math.ceil(
      (this.currentValues.amount * this.baseValues[nutrition]) /
        this.baseValues.amount
    );
  }
}

export default Food;
