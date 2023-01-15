import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileEntityRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private logger = new Logger('User Data Repository');

  async insert(createProfile: CreateProfileDto, user: User): Promise<Profile> {
    const { id } = user;
    this.logger.verbose(
      `User "${
        user.username
      }" creating profile object. Filters: ${JSON.stringify(createProfile)}`,
    );

    // Create the profile and update the user with the profile
    const userFound = await this.usersRepository.findOne({ where: { id } });
    // console.log(userFound);
    // userFound.profile = this.profileEntityRepository.create(createProfile);
    // userFound.profile.user = user;
    // console.log(await this.usersRepository.save(user));

    return userFound.profile;
  }
}
