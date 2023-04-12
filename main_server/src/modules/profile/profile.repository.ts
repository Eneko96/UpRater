import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/auth/user.model';
import { UserDocument } from 'src/modules/auth/user.model';
import { CreateProfileDto } from './dto/create-profile.dto';
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

  async createProfile(
    createProfile: CreateProfileDto,
    user: User,
  ): Promise<Profile> {
    this.logger.verbose(
      `User "${user.email}" creating profile object. Filters: ${JSON.stringify(
        createProfile,
      )}`,
    );
    const { username, city, age } = createProfile;

    const profile = new this.profileRepository({
      userId: user._id,
      username: username,
      city: city,
      age: age,
    });
    const newProfile = new this.profileRepository(profile);
    await newProfile.save({ validateBeforeSave: true });

    return profile;
  }
}