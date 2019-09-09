import { Controller } from '@nestjs/common';

import {
  ApiBearerAuth, ApiUseTags,
} from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { PostService } from './post.service';
import { Ppost } from './post.entity';

@ApiBearerAuth()
@Crud({
  model: {
    type: Ppost,
  },
  query: {
    join: {
      user: {},
      tags: {}
    }
  }
})
@ApiUseTags('posts')
@Controller('posts')
export class PostController {
  constructor(public service: PostService) {}
}
