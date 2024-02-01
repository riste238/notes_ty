import express from "express";
import * as NoteController from "../controllers/notes";

// routerot will replace const app;
const router = express.Router();

router.get("/", NoteController.getNotes)
router.post("/", NoteController.newNote);
router.get("/:id", NoteController.findOne);
router.patch("/:noteId", NoteController.updateNote);
router.delete("/:noteId", NoteController.deleteNote);

export default router;