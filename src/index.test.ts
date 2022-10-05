import {
    Sequelize,
    Column,
    Model,
    Table,
    DataType,
} from 'sequelize-typescript';
import { Mixin } from './index';

@Table
class Car extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    })
    readonly id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    count: number;

    @Column({type: DataType.INTEGER, allowNull: false, field: "release_year"})
    releaseYear: number;
}


test("version 2", async () => {

    const sequelize = new Sequelize('sqlite::memory:');
    sequelize.addModels([Car]);
    await Car.sync();
    const car2 = Car.build({name: 'Eagle', count: 1, releaseYear: 2004});
    car2.name = "Sparrow";
    car2.save();

    const MixinCar = Mixin(Car);
    await MixinCar.sync();

    const car3 = new MixinCar();
    car3.name = "Sparrow";

    const car = await MixinCar.build({name: 'Eagle', count: 1, releaseYear: 2004}).save();

    car.name = "Sparrow";
    //car.notAnExistingAttribute = 32;
});

