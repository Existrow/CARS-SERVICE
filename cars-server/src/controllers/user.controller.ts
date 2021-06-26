import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../entity/Users";
import { validate } from "class-validator";
import { LinqRepository } from "typeorm-linq-repository";

//TODO: Add DI
export default class UserController{

    public async getUsers(req: Request, res: Response): Promise<Response>{
        const users = await getRepository(Users).find();
        return res.json(users);
    }

    //TODO: Convert password to hash
    public async createUser(req: Request, res: Response): Promise<Response> {

        let { login, email } = req.body;
        const userRepository: LinqRepository<Users> = new LinqRepository(Users);

        const userByEmail = await userRepository.getOne()
            .where(u => u.email)
            .equal(email).count();
        if ( userByEmail > 0 ) {
            return res.status(409).send('user with email already exist')
        }

        const userByLogin = await userRepository.getOne()
            .where(u => u.login)
            .equal(login).count();
        if ( userByLogin > 0 ) {
            return res.status(409).send('user with login already exist')
        }


        const newUser = getRepository(Users).create(req.body);
        const errors = await validate(newUser);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }

        return res.status(201).send("User created");
    }
}