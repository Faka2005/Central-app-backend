import { Router } from 'express';
import { prisma } from '../server';

const router = Router();

// GET /users → liste tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    
    res.status(500).json({ error: 'DB error' });
  }
});


// GET /users/:id → récupérer un utilisateur par id
router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    
    res.status(500).json({ error: 'DB error' });
  }
});



export default router;
