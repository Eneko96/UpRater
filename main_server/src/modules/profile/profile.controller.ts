import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { User } from 'src/modules/auth/user.model';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthenticatedGuard)
export class ProfileController {
  private logger = new Logger('ProfileController');

  constructor(private profileService: ProfileService) {}

  @Post()
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @GetUser() user: User,
  ): Promise<Profile> {
    this.logger.verbose(
      `User "${user.email}" creating a new Profile. Data: ${JSON.stringify(
        createProfileDto,
      )}`,
    );
    return this.profileService.createProfile(createProfileDto, user);
  }

  @Get()
  getProfile(@GetUser() user: User): Promise<Profile> {
    this.logger.verbose(`User "${user.email}" retrieving their Profile.`);
    return this.profileService.getProfile(user);
  }
}
