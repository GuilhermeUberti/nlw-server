import express, { Request, Response } from 'express';

const app = express();

app.get('/games', (req: Request, res: Response) => {
    return res.json([]);
})

app.post('/ads', (req: Request, res: Response) => {
    return res.status(201).json([]);
})

app.get('/games/:id/ads', (req: Request, res: Response) => {
    //const gameId = req.params.id;

    return res.json([
        {id: 1, name: 'Anúncio 1'},
        {id: 2, name: 'Anúncio 2'},
        {id: 3, name: 'Anúncio 3'},
        {id: 4, name: 'Anúncio 4'},
        {id: 5, name: 'Anúncio 5'},
    ])
});

app.get('/ads/:id/discord', (req: Request, res: Response) => {
    //const adId = req.params.id;

    return res.json([])
});

app.listen(3333);