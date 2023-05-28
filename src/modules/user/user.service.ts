import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { CreateAccountDto } from './dto/create-account.dto'
import { EditProfileDto } from './dto/edit-profile.dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto
    const user = await this.userRepository.findOneBy({ username })
    if (user) throw new BadRequestException('Tài khoản đã tồn tại')
    return this.userRepository.save(createUserDto)
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    const { username } = createAccountDto
    const user = await this.userRepository.findOneBy({ username })
    if (user) throw new BadRequestException('Tài khoản đã tồn tại')
    return this.userRepository.save(createAccountDto)
  }

  async editProfile(avatar: Express.Multer.File, editProfileDto: EditProfileDto, userId: number) {
    return await this.userRepository.save({
      id: userId,
      avatar: '/files/avatar/' + avatar.filename,
      ...editProfileDto,
    })
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username })
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id })
    return user
  }
}
