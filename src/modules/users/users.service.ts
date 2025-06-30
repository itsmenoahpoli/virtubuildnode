import { User } from "./user.dto";
import { UsersRepository } from "./users.repository";
import { encryptPassword } from "@/utils";

export class UsersService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findByEmail(email);
    return user;
  }

  public async createUser(
    data: User
  ): Promise<{ user: User; userExists: boolean }> {
    const existingUser = await this.usersRepository.findByEmail(data.email);

    if (existingUser) {
      return { user: existingUser, userExists: true };
    }

    const user = await this.usersRepository.create({
      ...data,
      password: await encryptPassword(data.password),
    });

    return { user, userExists: false };
  }

  public async getAllUsers(filters: { withDeleted: boolean }): Promise<User[]> {
    const users = await this.usersRepository.findAll(filters);
    return users;
  }

  public async getUserById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findById(id);
    return user;
  }

  public async updateUser(
    id: number,
    data: Partial<User>
  ): Promise<User | null> {
    const updateData = { ...data };

    if (data.password) {
      updateData.password = await encryptPassword(data.password);
    }

    const user = await this.usersRepository.update(id, updateData);
    return user;
  }

  public async deleteUser(id: number): Promise<boolean> {
    return this.usersRepository.delete(id);
  }
}
