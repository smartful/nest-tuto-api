import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

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

  signin() {
    return { msg: 'I am sign In !' };
  }
}
