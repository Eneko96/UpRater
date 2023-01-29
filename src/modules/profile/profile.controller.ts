import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { User } from 'src/modules/auth/user.model';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  private logger = new Logger('ProfileController');

  constructor(private profileService: ProfileService) {}

  @Post()
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @GetUser() user: User,
  ): Promise<Profile> {
    this.logger.verbose(
      `User "${user.username}" creating a new Profile. Data: ${JSON.stringify(
        createProfileDto,
      )}`,
    );
    return this.profileService.createProfile(createProfileDto, user);
  }
}
