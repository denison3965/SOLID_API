import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

    private userRepository: IUserRepository;
    private mailProvider: IMailProvider;

    constructor( userRepository: IUserRepository, mailProvider: IMailProvider)
    {
        this.userRepository = userRepository;
        this.mailProvider = mailProvider;
    }

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExist = await this.userRepository.findByEmail(data.email);

        if (userAlreadyExist)
        {
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await this.userRepository.save(user);

        await this.mailProvider.sendMail({
            to : {
                name: data.name,
                email: data.email
            },
            from : {
                name: 'Equipe do meu App',
                email: 'equipe@meuapp.com'
            },
            subject:'Seja bem-vindo à plataforma',
            body: "<p>Você já póde fazer o login em nossa plataforma</p>"
        })
    }
} 