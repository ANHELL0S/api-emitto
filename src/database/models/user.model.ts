import { Table, Column, Model, DataType, Index } from 'sequelize-typescript'

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare _id: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string

  @Index({ unique: true })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isActive: boolean
}
