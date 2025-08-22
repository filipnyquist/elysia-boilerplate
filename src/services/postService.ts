import { eq, desc, and } from 'drizzle-orm';
import { getDatabase } from '../db';
import { posts, users } from '../db/schema';
import type { Post, NewPost, PaginationOptions } from '../types';

export class PostService {
  private async getDb() {
    return await getDatabase();
  }

  async createPost(postData: NewPost): Promise<Post> {
    const db = await this.getDb();
    const [post] = await db.insert(posts).values({
      ...postData,
      updatedAt: new Date(),
    }).returning();
    return post;
  }

  async getPostById(id: number): Promise<Post | null> {
    const db = await this.getDb();
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post || null;
  }

  async getPostsWithAuthors(options: PaginationOptions = {}) {
    const db = await this.getDb();
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    return await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        published: posts.published,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        author: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getPostsByAuthor(authorId: number, options: PaginationOptions = {}): Promise<Post[]> {
    const db = await this.getDb();
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    return await db
      .select()
      .from(posts)
      .where(eq(posts.authorId, authorId))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getPublishedPosts(options: PaginationOptions = {}): Promise<Post[]> {
    const db = await this.getDb();
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    return await db
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async updatePost(id: number, postData: Partial<NewPost>): Promise<Post | null> {
    const db = await this.getDb();
    const [post] = await db
      .update(posts)
      .set({
        ...postData,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning();
    return post || null;
  }

  async deletePost(id: number): Promise<boolean> {
    const db = await this.getDb();
    const result = await db.delete(posts).where(eq(posts.id, id));
    return result.rowCount > 0;
  }

  async publishPost(id: number): Promise<Post | null> {
    return this.updatePost(id, { published: true });
  }

  async unpublishPost(id: number): Promise<Post | null> {
    return this.updatePost(id, { published: false });
  }
}