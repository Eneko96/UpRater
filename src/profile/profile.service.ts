import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.model';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private profileEntityRepository: ProfileRepository) {}

  createProfile(
    createProfileDto: CreateProfileDto,
    user: User,
  ): Promise<Profile> {
    return this.profileEntityRepository.createProfile(createProfileDto, user);
  }
}
