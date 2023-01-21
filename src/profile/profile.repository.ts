import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.model';
import { UserDocument } from 'src/auth/user.model';
import { AddToProfileDto } from './dto/create-profile.dto';
import { Profile, ProfileDocument } from './profile.model';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileRepository: Model<ProfileDocument>,
    @InjectModel(User.name)
    private readonly usersRepository: Model<UserDocument>,
  ) {}

  private logger = new Logger('User Data Repository');

  async addInfo(addToProfile: AddToProfileDto, user: User): Promise<Profile> {
    const { username } = user;
    this.logger.verbose(
      `User "${
        user.username
      }" creating profile object. Filters: ${JSON.stringify(addToProfile)}`,
    );

    // Create the profile and update the user with the profile
    // console.log(userFound);
    // userFound.profile = this.profileEntityRepository.create(createProfile);
    // userFound.profile.user = user;
    // console.log(await this.usersRepository.save(user));

    const profileDoc = await this.profileRepository.findOne({
      username: username,
    });
    const profile = new Profile();

    profile.email = profileDoc.email;

    return profile;
  }
}
