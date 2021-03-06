import { Controller } from '@nestjs/common';

import {
  ApiBearerAuth, ApiUseTags,
} from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';

@ApiBearerAuth()
@Crud({
  model: {
    type: Tag,
  },
  query: {
    join: {
      posts: {},
    }
  }
})
@ApiUseTags('tags')
@Controller('tags')
export class TagController {
  constructor(public service: TagService) {}
}