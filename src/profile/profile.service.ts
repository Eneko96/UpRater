import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.model';
import { AddToProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private profileEntityRepository: ProfileRepository) {}

  addToProfile(addToProfileDto: AddToProfileDto, user: User): Promise<Profile> {
    return this.profileEntityRepository.addInfo(addToProfileDto, user);
  }
}
