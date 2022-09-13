import express, { Request, Response } from 'express';

const app = express();

app.get('/ads', (req: Request, res: Response) => {
    return res.json('conectado')
});

app.listen(3333);