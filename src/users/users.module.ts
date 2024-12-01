import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { CreateManyProvider } from './providers/create-many.provider';
import profileConfig from './config/profile.config';

@Module({
  controllers: [UsersController],
  providers : [UsersService, CreateManyProvider],
  exports : [UsersService],
  imports : [TypeOrmModule.forFeature([User]) , ConfigModule.forFeature(profileConfig)],
})
export class UsersModule {}
