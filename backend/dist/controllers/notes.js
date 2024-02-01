"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.findOne = exports.newNote = exports.getNotes = void 0;
const note_1 = __importDefault(require("../models/note"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getNote = yield note_1.default.find().exec();
        res.status(200).json(getNote);
    }
    catch (err) {
        next(err);
    }
});
exports.getNotes = getNotes;
const newNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const naslov = req.body.title;
    const tekst = req.body.text;
    try {
        const newNotee = yield note_1.default.create({
            title: naslov,
            text: tekst,
        });
        res.status(201).json(newNotee);
    }
    catch (err) {
        next(err);
    }
});
exports.newNote = newNote;
const findOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(noteId)) {
            throw (0, http_errors_1.default)(400, "Invalid note id!");
        }
        const note = yield note_1.default.findById(noteId).exec();
        if (!note) {
            throw (0, http_errors_1.default)(400, "Note must have a title!");
        }
        console.log(note, "what's note?");
        res.status(201).json(note);
    }
    catch (err) {
        next(err);
    }
});
exports.findOne = findOne;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // It takes properties from the Interfaces! Mandatory!
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    try {
        if (!mongoose_1.default.isValidObjectId(noteId)) {
            throw (0, http_errors_1.default)(400, "NoteId isn't valid!");
        }
        const note = yield note_1.default.findById(noteId).exec();
        if (!note) {
            throw (0, http_errors_1.default)(404, "Note is not exist!");
        }
        console.log(typeof note);
        note.title = newTitle;
        note.text = newText;
        const updatedNote = yield note.save();
        res.status(200).json(updatedNote);
    }
    catch (err) {
        next(err);
    }
});
exports.updateNote = updateNote;
// interface DeleteNoteParam {
//     noteId: string;
// }
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    try {
        const findNote = yield note_1.default.findById(noteId).exec();
        // if(!findNote){
        //     throw createHttpError(400, "There is not find any note who matching with this ID")
        // }
        yield (findNote === null || findNote === void 0 ? void 0 : findNote.deleteOne()); // res.status(204).json("This note has been deleted!")
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteNote = deleteNote;
