import { Router, Request, Response } from "express";
import { prisma } from "../server";

const router = Router();

/**
 * Helper pour forcer string
 */
function getString(
  param: string | string[] | undefined,
  defaultValue = "",
): string {
  if (!param) return defaultValue;
  return Array.isArray(param) ? param[0] : param;
}

/**
 * GET /reciters
 * Liste de tous les récitateur
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const reciters = await prisma.reciter.findMany({
      orderBy: { name: "asc" },
    });
    res.json(reciters);
  } catch (err) {
    
    res.status(500).json({ error: "DB error" });
  }
});

/**
 * GET /reciters/:slug
 */
// GET /reciter/:slug
//router.get("/:slug", async (req: Request, res: Response) => {
// 
//  try {
//    const slug =getString(req.params.slug);
//
//    const reciter = await prisma.reciter.findUnique({
//      where: { slug },
//      include: {
//        surahs: {
//          orderBy: { number: "asc" },
//        },
//      },
//    });
//
//    if (!reciter) return res.status(404).json({ error: "Reciter not found" });
//      
//
//    res.json({
//      reciter,
// 
//    });
//  } catch (err) {
//    
//    res.status(500).json({ error: "DB error" });
//  }
//});


/**
 * POST /reciters
 * Créer un récitateur
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, slug, basePath } = req.body;

    if (!name || !slug || !basePath)
      return res
        .status(400)
        .json({ error: "name, slug and basePath required" });

    const reciter = await prisma.reciter.create({
      data: { name, slug, basePath },
    });

    res.status(201).json(reciter);
  } catch (err) {
    
    res.status(500).json({ error: "DB error" });
  }
});

/**
 * DELETE /reciters/:id
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = getString(req.params.id);
    await prisma.reciter.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    
    res.status(500).json({ error: "DB error" });
  }
});

export default router;
