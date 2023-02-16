import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { keys } from 'src/common/constants';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthenticationGuard
  extends AuthGuard('local')
  implements CanActivate
{
  constructor(private authService: AuthService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log(request.body, '<---request');
    return true;
    //true 나오면  통과 false 나오면 거부
  }
}
