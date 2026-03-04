import { Router } from 'express';
import { prisma } from '../server';
import { AuthAdmin } from '../middleware/AuthAdminMiddleware';
import express, { Request, Response } from "express";
import { AuthUserOrAdmin } from '../middleware/AuthUserOrAdminMiddleware';


const router = Router();



// GET /users → liste tous les utilisateurs
router.get('/',AuthAdmin, async (req:Request, res:Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    
    res.status(500).json({ error: 'DB error' });
  }
});

router.put('/:id',AuthAdmin, async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    // Vérification champs obligatoires
    if (!username || !email) {
      return res.status(400).json({ error: "Username et email requis" });
    }

    // Vérifier que l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id:id.toString() }
    });

    if (!existingUser) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    // Mise à jour
    const updatedUser = await prisma.user.update({
      where: { id :id.toString()},
      data: {
        username,
        email
      }
    });

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});


//Change le role
router.patch('/:id/role',AuthAdmin, async (req:Request, res:Response) => {
  try {
    const id = String(req.params.id)
    const { role } = req.body

    // Vérification basique
    if (!role) {
      return res.status(400).json({ error: "Role requis" })
    }

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ error: "Role invalide" })
    }

    const user = await prisma.user.update({
      where: { id: id },
      data: { role: role }
    })

    res.json(user)

  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" })
  }
})


// DELETE /users/:id → supprimer un utilisateur
router.delete('/:id',AuthUserOrAdmin, async (req:Request, res:Response) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.id.toString() },
    });
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

export default router;
