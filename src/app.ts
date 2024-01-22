import express, { Request, Response, NextFunction } from "express";
import { DateTime } from "luxon";

const app = express();
const port = 3000;

// middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("LOG:", req.method, req.url, DateTime.local().toFormat("dd/MM/yyyy HH:mm:ss"));
    next();
});

app.get("/", (req: Request, res: Response) => {
    res.send("Ciao!");
});

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});