import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import config from '../config/keys';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>, private jwt: JwtService) {}

  async signup(dto: AuthDto): Promise<User> {
    // Check if user exist
    const userExist = await this.userModel.findOne({ email: dto.email });
    if (userExist) {
      throw new ForbiddenException('User already exists');
    }

    const hash = await argon.hash(dto.password);
    const userData = {
      email: dto.email,
      hash,
    };
    const newUser = new this.userModel(userData);
    return await newUser.save();
  }

  async signin(dto: AuthDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user._id, user.email);
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '245m',
      secret: config.JWT_SECRET,
    });

    return {
      access_token: token,
    };
  }
}
