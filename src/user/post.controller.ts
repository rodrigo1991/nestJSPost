import { Controller } from '@nestjs/common';
import { PostService } from '../post/post.service';

import {
  ApiBearerAuth, ApiUseTags,
} from '@nestjs/swagger';
import { Ppost } from '../post/post.entity';
import { Crud } from '@nestjsx/crud';

@ApiBearerAuth()
@Crud({
  model: {
    type: Ppost,
  },
  params: {
    userId: {
      field: 'user',
      type: 'number'
    }
  },
  query: {
    join: {
      user: {}
    }
  }
})
@ApiUseTags('users')
@Controller('/users/:userId/posts')
export class PostController {
  constructor(public service: PostService) {}
}