import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const getNote = await NoteModel.find().exec();
        res.status(200).json(getNote);
    }
    catch (err) {
        next(err);
    }

}

interface CreateNoteBody {
    title?: string,
    text?: string
}

export const newNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const naslov = req.body.title;

    const tekst = req.body.text;
    try {

        const newNotee = await NoteModel.create({
            title: naslov,
            text: tekst,
        });
        res.status(201).json(newNotee);
    }
    catch (err) {
        next(err);
    }

}

export const findOne: RequestHandler = async (req, res, next) => {
    const noteId = req.params.id;
    try {

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id!")
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(400, "Note must have a title!");
        }
        console.log(note, "what's note?");

        res.status(201).json(note);

    }
    catch (err) {
        next(err);
    }

}

interface UpdateNoteParam {
    noteId: string
}

interface UpdateNoteBody {
    title?: string,
    text?: string
}

export const updateNote: RequestHandler<UpdateNoteParam, UpdateNoteBody> = async (req, res, next) => {

    // It takes properties from the Interfaces! Mandatory!
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    
    try {
     if(!mongoose.isValidObjectId(noteId)){
        throw createHttpError(400, "NoteId isn't valid!")
     }       
     const note = await NoteModel.findById(noteId).exec();

     if(!note){
        throw createHttpError(404, "Note is not exist!")
     }
        console.log(typeof note);
        
     note.title = newTitle;
     note.text = newText;

     const updatedNote = await note.save();
     res.status(200).json(updatedNote)
    }
    catch (err) {
        next(err);
    }
}

// interface DeleteNoteParam {
//     noteId: string;
// }

export const deleteNote: RequestHandler = async(req,res,next) => {

    const noteId = req.params.noteId;

    try{
        const findNote = await NoteModel.findById(noteId).exec();
        // if(!findNote){
        //     throw createHttpError(400, "There is not find any note who matching with this ID")

        // }
        await findNote?.deleteOne();        // res.status(204).json("This note has been deleted!")
        res.sendStatus(204)
    
    
    }catch(err){
        next(err);
    }

}