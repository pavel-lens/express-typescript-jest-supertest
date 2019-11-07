// Required for 'typedi' module
import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import { Container } from 'typedi'
// import { UserService } from './services/user.service'
// import './services/user.service'

// Important to import like this for Service() decorators to be executed
import './services'
import routes from './routes'

// console.log({UserService: Container.get('UserService')})

// Set console as Logger
Container.set('Logger', console)

const app : Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.get('/', (req: Request, res: Response, next: NextFunction ) => {
    res.send('TS App is Running')
})


const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`server is running on PORT ${PORT}`)
})
