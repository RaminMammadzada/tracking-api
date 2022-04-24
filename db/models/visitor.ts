import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface VisitorAttributes {
  id: number;
  unequeId: string;
  numberOfVisit: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export type VisitorInput = Optional<VisitorAttributes, 'id'>
export type VisitorOuput = Required<VisitorAttributes>

class Visitor extends Model<VisitorAttributes, VisitorInput> implements VisitorAttributes {
  public id!: number
  public unequeId!: string;
  public numberOfVisit!: number
 

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Visitor.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  unequeId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  numberOfVisit: {
    type: DataTypes.NUMBER,
    allowNull: false,
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection
})

export default Visitor;