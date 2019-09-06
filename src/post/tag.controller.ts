import { Controller } from '@nestjs/common';

import {
  ApiBearerAuth, ApiUseTags,
} from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { TagService } from '../tag/tag.service';
import { Tag } from '../tag/tag.entity';

@ApiBearerAuth()
@Crud({
  model: {
    type: Tag,
  },
  params: {
    postId: {
      field: 'post',
      type: 'number'
    }
  },
  query: {
    join: {
      posts: {},
    }
  }
})
@ApiUseTags('posts')
@Controller('/posts/:postId/tags')
export class TagController {
  constructor(public service: TagService) {}
}