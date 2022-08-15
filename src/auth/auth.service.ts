import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  signup() {
    return { msg: 'I am signup !' };
  }

  signin() {
    return { msg: 'I am signin !' };
  }
}
