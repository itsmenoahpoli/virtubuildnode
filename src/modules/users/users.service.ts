import { User } from "./user.dto";
import { usersRepository } from "@/database";
import { encryptPassword } from "@/utils";

export class UsersService {
	public async findByEmail(email: string): Promise<User | null> {
		const user = await usersRepository.findOneBy({ email });

		return user;
	}

	public async createUser(data: User): Promise<User> {
		const user = usersRepository.create({
			...data,
			password: await encryptPassword(data.password),
		});
		await usersRepository.save(user);

		return user;
	}
}
