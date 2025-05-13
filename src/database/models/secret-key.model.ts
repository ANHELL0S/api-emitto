import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'secret_key', timestamps: true })
export class SecretKey extends Model<SecretKey> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare secret_key: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isActive: boolean
}
