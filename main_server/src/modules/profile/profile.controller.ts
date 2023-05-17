import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.model';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { CsrfInterceptor } from '../auth/csrf.interceptor';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthenticatedGuard)
export class ProfileController {
  private logger = new Logger('ProfileController');

  constructor(private profileService: ProfileService) {}

  @Post()
  @UseInterceptors(CsrfInterceptor)
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

  @Patch()
  @UseInterceptors(CsrfInterceptor)
  updateProfile(
    @Body() createProfileDto: UpdateProfileDto,
    @GetUser() user: User,
  ): Promise<Profile> {
    this.logger.verbose(
      `User "${user.email}" updating their Profile. Data: ${JSON.stringify(
        createProfileDto,
      )}`,
    );
    return this.profileService.updateProfile(createProfileDto, user);
  }

  @Get('/:username')
  getProfileByUsername(
    @GetUser() user: User,
    @Param() { username }: { username: string },
  ): Promise<Profile[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving Profile for username "${username}".`,
    );
    return this.profileService.getProfileByUsername(username);
  }
}
