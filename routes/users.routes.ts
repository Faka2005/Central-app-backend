import { Router } from "express";
import { prisma } from "../server";

const router = Router();

// GET /users/:id → récupérer un utilisateur par id
router.get("/me/:id", async (req, res) => {
  try {
    const profile = await prisma.profil.findUnique({
      where: { userId: req.params.id.toString() },
    });
    if (!profile) return res.status(404).json({ error: "User not found" });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

//PUT /users/:id -> mettre à jour un utilisateur
router.put("/me/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const { firstname, lastname, bio, interests, niveau, campus, isTutor } =
      req.body;

    if (
      firstname === undefined &&
      lastname === undefined &&
      bio === undefined &&
      interests === undefined &&
      niveau === undefined &&
      campus === undefined &&
      isTutor === undefined
    ) {
      return res
        .status(400)
        .json({ error: "Au moins un champ doit être fourni" });
    }

    const existinguser = await prisma.user.findUnique({
      where: { id: id.toString() },
    });
    if (!existinguser) return res.status(404).json({ error: "User not found" });

    const updatedProfile = await prisma.profil.update({
      where: { id: id.toString() },
      data: {
        ...(firstname !== undefined && { firstname }),
        ...(lastname !== undefined && { lastname }),
        ...(bio !== undefined && { bio }),
        ...(interests !== undefined && {
          interests: {
            set: interests.map((id: string) => ({ id })),
          },
        }),
        ...(niveau !== undefined && { niveau }),
        ...(campus !== undefined && { campus }),
        ...(isTutor !== undefined && { isTutor }),
      },
    });

    return res.json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

export default router;
