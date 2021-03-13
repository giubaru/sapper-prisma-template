import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const { json } = require('body-parser');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express() // You can also use Express
  .use((req, res, next) => {
    req["prisma"] = prisma;
    next();
  })
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
    json(),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
