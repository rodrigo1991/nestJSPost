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
  params: {
    groupId: {
      field: 'group',
      type: 'number'
    }
  },
  query: {
    join: {
      group: {}
    }
  }
})
@ApiUseTags('groups')
@Controller('/groups/:groupId/users')
export class UserController {
  constructor(public service: UserService) {}
}