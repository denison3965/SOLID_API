import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapProvider = new MailtrapMailProvider
const mysqlUserRepository = new MysqlUserRepository

const createUserUseCase = new CreateUserUseCase( 
    mysqlUserRepository , 
    mailtrapProvider
)

const createUserController  = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController }