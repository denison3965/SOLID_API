import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";


export class MysqlUserRepository implements IUserRepository {
    
    private users: User[] = [];
    
    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);

        return user
    }

    async save(user: User) {
        this.users.push(user);
    }
}