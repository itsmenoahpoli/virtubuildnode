import { BaseRepository } from "@/modules/base.repository";
import { usersRepository, UserEntity } from "@/database";
import { User } from "./user.dto";

export class UsersRepository extends BaseRepository {
  public async findAll(filters: {
    withDeleted: boolean;
  }): Promise<UserEntity[]> {
    const queryBuilder = usersRepository.createQueryBuilder("user");

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getMany();
  }

  public async findById(
    id: number,
    filters: { withDeleted: boolean } = { withDeleted: false }
  ): Promise<UserEntity | null> {
    const queryBuilder = usersRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id });

    if (filters.withDeleted) {
      queryBuilder.withDeleted();
    }

    return queryBuilder.getOne();
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return usersRepository.findOneBy({ email });
  }

  public async create(data: User): Promise<UserEntity> {
    const user = usersRepository.create(data);
    return usersRepository.save(user);
  }

  public async update(
    id: number,
    data: Partial<User>
  ): Promise<UserEntity | null> {
    const user = await this.findById(id);
    if (!user) return null;

    Object.assign(user, data);
    return usersRepository.save(user);
  }

  public async delete(id: number): Promise<boolean> {
    const user = await this.findById(id);
    if (!user) return false;

    await usersRepository.softDelete(id);
    return true;
  }
}
