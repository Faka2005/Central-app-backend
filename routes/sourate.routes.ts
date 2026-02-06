import { Router, Request, Response } from "express";
import { prisma } from "../server";

const router = Router();

function getString(param: string | string[] | undefined, defaultValue = ""): string {
  if (!param) return defaultValue;
  return Array.isArray(param) ? param[0] : param;
}

/**
 * GET /surahs
 * Toutes les sourates (option filtre par reciterId)
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const reciterId = getString(req.body.reciterId);

    const surahs = await prisma.surah.findMany({
      where: reciterId ? { reciterId } : undefined,
      include: { reciter: true },
      orderBy: { number: "asc" },
    });

    res.json(
      surahs.map((s) => ({
        id: s.id,
        number: s.number,
        name: s.name,
        audioUrl: `${s.reciter.basePath}/${s.audioFile}`,
        reciter: {
          id: s.reciter.id,
          name: s.reciter.name,
        },
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

/**
 * GET /surahs/:id
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = getString(req.params.id);

    const surah = await prisma.surah.findUnique({
      where: { id },
      include: { reciter: true },
    });

    if (!surah) return res.status(404).json({ error: "Surah not found" });

    res.json({
      id: surah.id,
      number: surah.number,
      name: surah.name,
      audioUrl: `${surah.reciter.basePath}/${surah.audioFile}`,
      reciter: {
        id: surah.reciter.id,
        name: surah.reciter.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

/**
 * GET /surahs/reciter/:reciterId/:number
 */
router.get("/reciter/:reciterId/:number", async (req: Request, res: Response) => {
  try {

    
    const reciterId = getString(req.params.reciterId);
    const number = Number(req.params.number);

    const surah = await prisma.surah.findFirst({
      where: { reciterId, number },
      include: { reciter: true },
    });

    if (!surah) return res.status(404).json({ error: "Surah not found" });

    res.json({
      id: surah.id,
      number: surah.number,
      name: surah.name,
      audioUrl: `${surah.reciter.basePath}/${surah.audioFile}`,
      reciter: {
        id: surah.reciter.id,
        name: surah.reciter.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});


export default router;
