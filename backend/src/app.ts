import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
// import NoteModel from "./models/note";
import notesRoutes from "./routes/notes";
import morgan from "morgan";
import cors from "cors"; 
import createHttpError, {isHttpError} from "http-errors";

const app = express();
app.use(morgan("dev"))
app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRoutes);
// app.get('/', async (req, res, next) => {

//     try {
//         const notes = await NoteModel.find().exec();
//         res.status(201).json(notes);
//         // res.send('Hello world!')
//     }
//     catch (error) {
//         next(error);
//     }

// })
app.use((req, res, next) => {
    next(createHttpError(404, "Something went wrong!"))

})

app.use((error: unknown, req: Request, res: Response) => {
    let errorMessage = "An uknown error occurred!"
    // console.error(error);
    // Just prove an evidence that this error is an instance from class Error.
    let statusCode = 500;

    // if (error instanceof Error) errorMessage = error.message;
    if(isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
})

export default app;

// 2.09