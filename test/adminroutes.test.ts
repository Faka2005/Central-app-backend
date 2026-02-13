import request from 'supertest';
import express from 'express';
import adminRoutes from '../routes/admin.routes'; // Adjust the import path as needed
// Mock Prisma client
jest.mock('../server', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

import { prisma } from '../server';

describe('User Router', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/users', adminRoutes);
    jest.clearAllMocks();
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: '1', username: 'John Doe', role: 'user' },
        { id: '2', username: 'Jane Smith', role: 'admin' },
      ];

      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return 500 on database error', async () => {
      (prisma.user.findMany as jest.Mock).mockRejectedValue(new Error('DB Error'));

      const response = await request(app).get('/users');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'DB error' });
    });
  });

  describe('PUT /users/:id', () => {

  it('should update username and email successfully', async () => {
    const existingUser = { id: '123', username: 'Old', email: 'old@mail.com' };
    const updatedUser = { id: '123', username: 'New', email: 'new@mail.com' };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);
    (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const response = await request(app)
      .put('/users/123')
      .send({
        username: 'New',
        email: 'new@mail.com'
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedUser);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: '123' }
    });

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: '123' },
      data: {
        username: 'New',
        email: 'new@mail.com'
      }
    });
  });


  it('should return 400 when username or email is missing', async () => {
    const response = await request(app)
      .put('/users/123')
      .send({ username: 'OnlyUsername' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Username et email requis"
    });

    expect(prisma.user.update).not.toHaveBeenCalled();
  });


  it('should return 404 when user does not exist', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .put('/users/999')
      .send({
        username: 'Test',
        email: 'test@mail.com'
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Utilisateur introuvable"
    });

    expect(prisma.user.update).not.toHaveBeenCalled();
  });


  it('should return 500 on database error', async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const response = await request(app)
      .put('/users/123')
      .send({
        username: 'Test',
        email: 'test@mail.com'
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'DB error' });
  });

});


  describe('PATCH /users/:id/role', () => {
    it('should update user role successfully', async () => {
      const mockUser = { id: '123', username: 'Test User', role: 'admin' };
      const updateData = { role: 'admin' };

      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .patch('/users/123/role')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: { role: 'admin' }
      });
    });

    it('should return 400 when role is missing', async () => {
      const response = await request(app)
        .patch('/users/123/role')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Role requis" });
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('should return 400 when role is invalid', async () => {
      const response = await request(app)
        .patch('/users/123/role')
        .send({ role: 'invalid-role' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Role invalide" });
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('should accept both "admin" and "user" roles', async () => {
      const mockUser = { id: '123', username: 'Test User', role: 'user' };
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .patch('/users/123/role')
        .send({ role: 'user' });

      expect(response.status).toBe(200);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: { role: 'user' }
      });
    });

    it('should return 500 on database error', async () => {
      (prisma.user.update as jest.Mock).mockRejectedValue(new Error('DB Error'));

      const response = await request(app)
        .patch('/users/123/role')
        .send({ role: 'admin' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Erreur serveur" });
    });

    it('should convert id to string', async () => {
      const mockUser = { id: '123', role: 'admin' };
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      await request(app)
        .patch('/users/123/role')
        .send({ role: 'admin' });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: { role: 'admin' }
      });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete user successfully', async () => {
      const mockUser = { id: '123', username: 'Test User' };
      
      (prisma.user.delete as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app).delete('/users/123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: '123' }
      });
    });

    it('should return 500 on database error', async () => {
      (prisma.user.delete as jest.Mock).mockRejectedValue(new Error('DB Error'));

      const response = await request(app).delete('/users/123');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'DB error' });
    });

    it('should convert id to string', async () => {
      const mockUser = { id: '123', username: 'Test User' };
      (prisma.user.delete as jest.Mock).mockResolvedValue(mockUser);

      await request(app).delete('/users/123');

      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: '123' }
      });
    });
  });
});
