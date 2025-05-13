import * as bcrypt from 'bcryptjs'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from '@/database/models/user.model'
import { Op } from 'sequelize'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findById(id: string): Promise<User | null> {
    return await this.userModel.findByPk(id)
  }

  async findByField(
    field: keyof User,
    value: string | number | boolean,
  ): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        [field]: value,
      },
    })
  }

  async isFieldTakenByAnotherUser(
    field: keyof User,
    value: string | number | boolean,
    currentUserId: string,
  ): Promise<boolean> {
    const existingUser = await this.userModel.findOne({
      where: {
        [field]: value,
        _id: {
          [Op.ne]: currentUserId, // Op.ne = not equal
        },
      },
    })

    return !!existingUser
  }

  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
  }
}
