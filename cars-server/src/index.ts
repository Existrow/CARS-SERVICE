import "reflect-metadata"
import express from "express";
import morgan from 'morgan'
import cors from 'cors'
import {createConnection} from 'typeorm'
import BaseRouter from './routes/index';

const app = express()
createConnection();

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api', BaseRouter)
// app.use("/home",  getUsers)
// app.use(userRoutes);


const port = 4002
app.listen(port)
console.log('server on port', port)