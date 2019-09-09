import { Controller } from '@nestjs/common';

import {
  ApiBearerAuth, ApiUseTags,
} from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { GroupService } from './group.service';
import { Group } from './group.entity';

@ApiBearerAuth()
@Crud({
  model: {
    type: Group,
  }
})
@ApiUseTags('groups')
@Controller('groups')
export class GroupController {
  constructor(public service: GroupService) {}
}
