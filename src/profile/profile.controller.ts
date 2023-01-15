import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';
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
