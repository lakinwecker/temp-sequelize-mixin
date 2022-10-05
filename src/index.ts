import {
  Model,
  ModelStatic,
} from "sequelize/types/model"

export const Mixin = <
  TModel extends Model
>(BaseModel: ModelStatic<TModel>) => {
  return class ModelWithMixin extends BaseModel {
    // If you uncomment the following line you will get an error:
    //     src/index.test.ts:46:23 - error TS2684: The 'this' context of type 'typeof ModelWithMixin' is not assignable to method's 'this' of type 'ModelStatic<Mixin<Car>.ModelWithMixin>'.
    //  Type 'typeof ModelWithMixin' is not assignable to type 'NonConstructor<typeof Model>'.
    //    Types of property 'prototype' are incompatible.
    //      Type 'Mixin<any>.ModelWithMixin' is missing the following properties from type 'Model<any, any>': _attributes, _creationAttributes, isNewRecord, sequelize, and 25 more.
    //
    //  46     const car = await MixinCar.build({name: 'Eagle', count: 1, releaseYear: 2004}).save();
    //                           ~~~~~~~~
    // id: number = 1;
  };
};

