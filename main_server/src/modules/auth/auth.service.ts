import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User, UserDocument } from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
// import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
// import { Profile } from 'src/profile/profile.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from 'src/modules/profile/profile.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private usersRepository: Model<UserDocument>,
    @InjectModel(Profile.name)
    private profileRepository: Model<ProfileDocument>,
    // @InjectRepository(Profile)
    // private profilesRepository: Repository<Profile>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
    // profileCredentialsDto: CreateProfileDto,
  ): Promise<void> {
    const { email, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // const profile = this.profilesRepository.create({
    //   email: profileCredentialsDto.email,
    // });
    const user = new this.usersRepository({
      email: email,
      password: hashedPassword,
      // profile: profile,
    });

    try {
      await user.save({ validateBeforeSave: true });
      return
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ where: { email } });
    // compare isn't working,
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
