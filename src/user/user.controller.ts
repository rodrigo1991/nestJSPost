import { Controller } from '@nestjs/common';
import { UserService } from '../user/user.service';

import {
  ApiBearerAuth, ApiUseTags,
} from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Crud } from '@nestjsx/crud';

@ApiBearerAuth()
@Crud({
  model: {
    type: User,
  },
  query: {
    join: {
      group: {}
    }
  }
})
@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(public service: UserService) {}
}