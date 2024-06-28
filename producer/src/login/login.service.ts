import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(@Inject('LOGIN_SERVICE') private rabbitClient: ClientProxy) {}

  login(username: string, password: string) {
    return this.rabbitClient.send({ cmd: 'login' }, { username, password }).pipe(timeout(5000));
  }
}
