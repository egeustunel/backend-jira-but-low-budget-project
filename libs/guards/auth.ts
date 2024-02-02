import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class ClientGuard implements CanActivate {
  exlcudeRequests = [
    '/login',
    '/signup',
    '/google-oauth',
    '/google-oauth/redirect',
  ];

  public constructor(
    private jwtService: JwtService,
  ) {}

  /**
   * Checks whether the given request authorized by the client.
   * @param context
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.getArgByIndex(0);

      if (this.exlcudeRequests.includes(request.url.split('?')[0])) return true;

      const authorization = request.headers['authorization'];
      if (!authorization) throw new UnauthorizedException();

      const token = authorization.replace('Bearer ', '');

      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWTSECRET
          }
        );

        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
