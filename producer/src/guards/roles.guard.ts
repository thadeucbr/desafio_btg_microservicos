import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if(!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest<Request>()
    const token = (request.headers as unknown as IncomingHttpHeaders).authorization?.replace('Bearer', '').trim()

    if (!token) {
      return false
    }

    const decodedToken = this.jwtService.decode(token)
    const userRole = decodedToken.role

    return roles.includes(userRole)
  }
}
