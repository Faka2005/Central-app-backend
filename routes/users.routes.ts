import { Router } from 'express';
import { prisma } from '../server';

const router = Router();




// GET /users/:id → récupérer un utilisateur par id
router.get('/me/:id', async (req, res) => {
  try {
    const profile = await prisma.profil.findUnique({
      where: { userId: req.params.id.toString() },
    });
    if (!profile) return res.status(404).json({ error: 'User not found' });

    res.json(profile);
  } catch (err) {
    
    res.status(500).json({ error: 'DB error' });
  }
});



export default router;
