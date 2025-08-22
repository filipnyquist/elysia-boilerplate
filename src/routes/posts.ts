import { Elysia, t } from 'elysia';
import { PostService } from '../services/postService';

const postService = new PostService();

export const postRoutes = new Elysia({ prefix: '/posts' })
  // Get all posts with authors
  .get('/', async ({ query }) => {
    try {
      const page = parseInt(query.page as string) || 1;
      const limit = Math.min(parseInt(query.limit as string) || 10, 50);
      
      const posts = await postService.getPostsWithAuthors({ page, limit });
      
      return {
        success: true,
        data: posts,
        pagination: {
          page,
          limit,
          total: posts.length, // In a real app, you'd get the total count separately
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch posts',
      };
    }
  }, {
    query: t.Object({
      page: t.Optional(t.String()),
      limit: t.Optional(t.String()),
    }),
  })
  
  // Get published posts only
  .get('/published', async ({ query }) => {
    try {
      const page = parseInt(query.page as string) || 1;
      const limit = Math.min(parseInt(query.limit as string) || 10, 50);
      
      const posts = await postService.getPublishedPosts({ page, limit });
      
      return { success: true, data: posts };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch published posts',
      };
    }
  })
  
  // Get post by ID
  .get('/:id', async ({ params }) => {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return { success: false, error: 'Invalid post ID' };
      }
      
      const post = await postService.getPostById(id);
      if (!post) {
        return { success: false, error: 'Post not found' };
      }
      
      return { success: true, data: post };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch post',
      };
    }
  })
  
  // Create post
  .post('/', async ({ body }) => {
    try {
      const post = await postService.createPost(body);
      return { success: true, data: post, message: 'Post created successfully' };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post',
      };
    }
  }, {
    body: t.Object({
      title: t.String({ minLength: 1, maxLength: 255 }),
      content: t.String({ minLength: 1 }),
      authorId: t.Number({ minimum: 1 }),
      published: t.Optional(t.Boolean()),
    }),
  })
  
  // Update post
  .put('/:id', async ({ params, body }) => {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return { success: false, error: 'Invalid post ID' };
      }
      
      const post = await postService.updatePost(id, body);
      if (!post) {
        return { success: false, error: 'Post not found' };
      }
      
      return { success: true, data: post, message: 'Post updated successfully' };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update post',
      };
    }
  }, {
    body: t.Object({
      title: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
      content: t.Optional(t.String({ minLength: 1 })),
      published: t.Optional(t.Boolean()),
    }),
  })
  
  // Delete post
  .delete('/:id', async ({ params }) => {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return { success: false, error: 'Invalid post ID' };
      }
      
      const deleted = await postService.deletePost(id);
      if (!deleted) {
        return { success: false, error: 'Post not found' };
      }
      
      return { success: true, message: 'Post deleted successfully' };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete post',
      };
    }
  })
  
  // Publish post
  .patch('/:id/publish', async ({ params }) => {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return { success: false, error: 'Invalid post ID' };
      }
      
      const post = await postService.publishPost(id);
      if (!post) {
        return { success: false, error: 'Post not found' };
      }
      
      return { success: true, data: post, message: 'Post published successfully' };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to publish post',
      };
    }
  })
  
  // Unpublish post
  .patch('/:id/unpublish', async ({ params }) => {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return { success: false, error: 'Invalid post ID' };
      }
      
      const post = await postService.unpublishPost(id);
      if (!post) {
        return { success: false, error: 'Post not found' };
      }
      
      return { success: true, data: post, message: 'Post unpublished successfully' };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to unpublish post',
      };
    }
  });