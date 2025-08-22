import { Elysia, t } from 'elysia';
import { UserService } from '../services/userService';
import type { ApiResponse } from '../types';

const userService = new UserService();

export const userRoutes = new Elysia({ prefix: '/users' })
  // Get all users
  .get('/', async ({ query }) => {
    try {
      const page = parseInt(query.page as string) || 1;
      const limit = Math.min(parseInt(query.limit as string) || 10, 50);
      
      const { users, total } = await userService.getAllUsers({ page, limit });
      const totalPages = Math.ceil(total / limit);
      
      return {
        success: true,
        data: users,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch users',
      };
    }
  }, {
    query: t.Object({
      page: t.Optional(t.String()),
      limit: t.Optional(t.String()),
    }),
  })
  
  // Get user by ID
  .get('/:id', async ({ params }) => {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return { success: false, error: 'Invalid user ID' };
      }
      
      const user = await userService.getUserById(id);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      
      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch user',
      };
    }
  })
  
  // Create user
  .post('/', async ({ body }) => {
    try {
      const user = await userService.createUser(body);
      return { success: true, data: user, message: 'User created successfully' };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create user',
      };
    }
  }, {
    body: t.Object({
      name: t.String({ minLength: 1, maxLength: 255 }),
      email: t.String({ format: 'email', maxLength: 255 }),
      bio: t.Optional(t.String()),
      isActive: t.Optional(t.Boolean()),
    }),
  })
  
  // Update user
  .put('/:id', async ({ params, body }) => {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return { success: false, error: 'Invalid user ID' };
      }
      
      const user = await userService.updateUser(id, body);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      
      return { success: true, data: user, message: 'User updated successfully' };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update user',
      };
    }
  }, {
    body: t.Object({
      name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
      email: t.Optional(t.String({ format: 'email', maxLength: 255 })),
      bio: t.Optional(t.String()),
      isActive: t.Optional(t.Boolean()),
    }),
  })
  
  // Delete user
  .delete('/:id', async ({ params }) => {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return { success: false, error: 'Invalid user ID' };
      }
      
      const deleted = await userService.deleteUser(id);
      if (!deleted) {
        return { success: false, error: 'User not found' };
      }
      
      return { success: true, message: 'User deleted successfully' };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete user',
      };
    }
  })
  
  // Toggle user status
  .patch('/:id/toggle-status', async ({ params }) => {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return { success: false, error: 'Invalid user ID' };
      }
      
      const user = await userService.toggleUserStatus(id);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      
      return { 
        success: true, 
        data: user, 
        message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully` 
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to toggle user status',
      };
    }
  });