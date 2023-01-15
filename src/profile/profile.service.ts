import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private profileEntityRepository: ProfileRepository) {}

  createProfile(
    createProfileDto: CreateProfileDto,
    user: User,
  ): Promise<Profile> {
    return this.profileEntityRepository.insert(createProfileDto, user);
  }
}
