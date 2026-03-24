import request from 'supertest';
import express from 'express';
import adminRouter from '../../routes/admin.routes'; // Adjust path if necessary
import { prisma } from '../../server';

// Mock the prisma client
jest.mock('../../server', () => ({
    prisma: {
        user: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}));

const app = express();
app.use(express.json());
app.use('/users', adminRouter);

describe('User Router API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /users', () => {
        it('should return a list of users', async () => {
            const mockUsers = [{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Doe' }];
            (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

            const response = await request(app).get('/users');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
            expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
        });

        it('should return 500 if database fails', async () => {
            (prisma.user.findMany as jest.Mock).mockRejectedValue(new Error('DB Error'));

            const response = await request(app).get('/users');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('DB error');
        });
    });

    describe('PUT /users/:id', () => {

        it('should update and return user if found', async () => {

            const mockUser = { id: '1', username: 'John', email: 'john@mail.com' };

            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
            (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

            const response = await request(app)
                .put('/users/1')
                .send({
                    username: 'John',
                    email: 'john@mail.com'
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
        });

        it('should return 404 if user does not exist', async () => {

            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

            const response = await request(app)
                .put('/users/999')
                .send({
                    username: 'Test',
                    email: 'test@mail.com'
                });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe("Utilisateur introuvable");
        });

    });


    describe('PATCH /users/:id/role', () => {
        it('should update user role successfully', async () => {
            const updatedUser = { id: '1', role: 'admin' };
            (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

            const response = await request(app)
                .patch('/users/1/role')
                .send({ role: 'admin' });

            expect(response.status).toBe(200);
            expect(response.body.role).toBe('admin');
            expect(prisma.user.update).toHaveBeenCalledWith({
                where: { id: '1' },
                data: { role: 'admin' },
            });
        });

        it('should return 400 if role is missing', async () => {
            const response = await request(app)
                .patch('/users/1/role')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Role requis');
        });

        it('should return 400 if role is invalid', async () => {
            const response = await request(app)
                .patch('/users/1/role')
                .send({ role: 'super-admin' });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Role invalide');
        });

        it('should return 500 on server error', async () => {
            (prisma.user.update as jest.Mock).mockRejectedValue(new Error('Update failed'));

            const response = await request(app)
                .patch('/users/1/role')
                .send({ role: 'user' });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Erreur serveur');
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete and return the user', async () => {
            const deletedUser = { id: '1', name: 'Deleted User' };
            (prisma.user.delete as jest.Mock).mockResolvedValue(deletedUser);

            const response = await request(app).delete('/users/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(deletedUser);
            expect(prisma.user.delete).toHaveBeenCalledWith({
                where: { id: '1' },
            });
        });

        it('should return 500 if deletion fails', async () => {
            (prisma.user.delete as jest.Mock).mockRejectedValue(new Error('Delete error'));

            const response = await request(app).delete('/users/1');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('DB error');
        });
    });
});
