import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  imports: [UserModule],
})
export class SharedModule {}
