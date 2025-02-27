import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client'

const app = express();
const prisma = new PrismaClient()

app.use(cors());


app.get('/', (req, res) => {
    res.send("hello from our server~! item was dragged & dropped")
});

app.get('/test/', (req, res) => {
    res.send("this is a sample response to the test endpoint");
});

app.get('/boards/', async (req, res) => {
    const boards = await prisma.board.findMany({
        include: {
            items: true,
        }
    })
    res.json(boards);
})

const server = app.listen(8080, () => {
    console.log('server listening on 8080');
})