import { eq, desc, asc, sql } from 'drizzle-orm';
import { getDatabase } from '../db';
import { users } from '../db/schema';
import type { User, NewUser, PaginationOptions } from '../types';

export class UserService {
  private async getDb() {
    return await getDatabase();
  }

  async createUser(userData: NewUser): Promise<User> {
    const db = await this.getDb();
    const [user] = await db.insert(users).values({
      ...userData,
      updatedAt: new Date(),
    }).returning();
    return user;
  }

  async getUserById(id: number): Promise<User | null> {
    const db = await this.getDb();
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const db = await this.getDb();
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
  }

  async getAllUsers(options: PaginationOptions = {}): Promise<{ users: User[], total: number }> {
    const db = await this.getDb();
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    const [usersResult, totalResult] = await Promise.all([
      db.select().from(users)
        .orderBy(desc(users.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql`count(*)` }).from(users)
    ]);

    const total = Number(totalResult[0]?.count || 0);
    return { users: usersResult, total };
  }

  async updateUser(id: number, userData: Partial<NewUser>): Promise<User | null> {
    const db = await this.getDb();
    const [user] = await db
      .update(users)
      .set({
        ...userData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user || null;
  }

  async deleteUser(id: number): Promise<boolean> {
    const db = await this.getDb();
    const result = await db.delete(users).where(eq(users.id, id));
    return result.rowCount > 0;
  }

  async toggleUserStatus(id: number): Promise<User | null> {
    const user = await this.getUserById(id);
    if (!user) return null;

    return this.updateUser(id, { isActive: !user.isActive });
  }
}