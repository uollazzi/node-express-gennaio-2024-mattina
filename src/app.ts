import express, { Request, Response, NextFunction } from "express";
import { DateTime } from "luxon";
import path from "node:path";

const app = express();
const port = 3000;

// middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("LOG:", req.method, req.url, DateTime.local().toFormat("dd/MM/yyyy HH:mm:ss"));
    next();
});

app.use(express.static("./public"));

app.get("/", (req: Request, res: Response) => {
    res.send("<img src='eiffel.jpg'>");
});

app.get("/errore", (req: Request, res: Response) => {
    throw new Error("Errore simulato.");
});

// /films/popolari
app.get("/films/popolari", (req: Request, res: Response) => {
    // /films/popolari
    res.send("Hai richiesto l'elenco dei films popolari");
});

app.get("/films/:id", (req: Request, res: Response) => {
    // /films/123
    // /films/pippo
    // /films/true
    const id = req.params["id"];

    res.send("Hai richiesto il film con id: " + id);
});

// app.get("/eiffel.jpg", (req: Request, res: Response) => {
//     const imgPath = path.join(process.cwd(), "./eiffel.jpg");
//     console.log(imgPath)
//     res.sendFile(imgPath);
// });

// gestione 404
app.use((req: Request, res: Response) => {
    res.status(404).send("Pagina non trovata.");
});

// gestione 500
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).send("Errore del server.");
});

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});