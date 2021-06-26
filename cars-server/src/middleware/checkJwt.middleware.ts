import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export default class CheckJwtMiddleware{
    public static async checkJwt(req: Request, res: Response, next: NextFunction)
    {
        const authHeader = <string>req.headers["authorization"];
        const token = authHeader.split(' ')[1];
        let jwtPayload;

        try {
            jwtPayload = <any>jwt.verify(token, config.jwtSecret);
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            return res.status(401).send();
        }

        const { id, login } = jwtPayload;
        const newToken = jwt.sign({ id, login }, config.jwtSecret, {
            expiresIn: "24h"
        });
        res.setHeader("token", newToken);
        next();
    }
}