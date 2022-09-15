import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinute } from './utils/convertHourStringToMinute';
import { convertMinuteStringToHour } from './utils/convertMinuteStringToHour';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/games', async (req: Request, res: Response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });

    return res.json(games);
})

app.post('/games/:id/ads', async (req: Request, res: Response) => {
    const gameId = req.params.id;
    const body: any = req.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,         
            yearsPlaying: body.yearsPlaying,  
            discord: body.discord,         
            weekDays: body.weekDays.join(','),        
            hourStart: convertHourStringToMinute(body.hourStart),       
            hourEnd: convertHourStringToMinute(body.hourEnd),         
            useVoiceChannel: body.useVoiceChannel, 
        }
    })

    return res.status(201).json(ad);
})

app.get('/games/:id/ads', async (req: Request, res: Response) => {
    const gameId = req.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }

    })

    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinuteStringToHour(ad.hourStart),
            hourEnd: convertMinuteStringToHour(ad.hourEnd)
        }
    }));
})

app.get('/ads/:id/discord', async (req: Request, res: Response) => {
    const adId = req.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })

    return res.json({
        discord: ad.discord,
    });
});

app.listen(3333);