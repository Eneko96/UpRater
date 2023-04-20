import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/auth/user.model';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
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

  getProfile(user: User): Promise<Profile> {
    return this.profileEntityRepository.getProfile(user);
  }

  async updateProfile(
    updateProfileDto: UpdateProfileDto,
    user: User,
  ): Promise<Profile> {
    return this.profileEntityRepository.update(updateProfileDto, user);
  }
}
