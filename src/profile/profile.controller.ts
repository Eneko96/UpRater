import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.model';
import { AddToProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  private logger = new Logger('ProfileController');

  constructor(private profileService: ProfileService) {}

  @Post()
  addToProfile(
    @Body() addToProfileDto: AddToProfileDto,
    @GetUser() user: User,
  ): Promise<Profile> {
    this.logger.verbose(
      `User "${user.username}" creating a new Profile. Data: ${JSON.stringify(
        addToProfileDto,
      )}`,
    );
    return this.profileService.addToProfile(addToProfileDto, user);
  }
}
