import { Router } from 'express';
import { prisma } from '../server';

const router = Router();

// GET /users → liste tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});




// DELETE /users/:id → supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

export default router;
