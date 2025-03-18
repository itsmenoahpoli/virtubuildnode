import { DataSource, Repository, type DataSourceOptions } from "typeorm";
import { User as UserEntity, UserRole as UserRoleEntity } from "./entities";
import { SETTINGS } from "@/configs";

const DBDataSource = new DataSource({
	type: SETTINGS.APP_DB_TYPE,
	host: SETTINGS.APP_DB_HOST,
	port: Number(SETTINGS.APP_DB_PORT),
	username: SETTINGS.APP_DB_USERNAME,
	password: SETTINGS.APP_DB_PASSWORD,
	database: SETTINGS.APP_DB_DATABASE,
	synchronize: true,
	logging: false,
	entities: [__dirname + "/entities/*.entity.ts"],
	migrations: [__dirname + "/migrations/*.migration.ts"],
	subscribers: [],
} as DataSourceOptions);

let usersRepository: Repository<UserEntity>;
let userRolesRepository: Repository<UserRoleEntity>;

const initializeDatabase = () => {
	DBDataSource.initialize()
		.then(() => {
			console.info("Database successfully sycned!");

			// Set repositories
			usersRepository = DBDataSource.getRepository(UserEntity);
			userRolesRepository = DBDataSource.getRepository(UserRoleEntity);
		})
		.catch((error) => {
			console.error("Failed to sync database");
			console.error(error);
		});
};

export { DBDataSource, initializeDatabase, usersRepository, UserEntity, userRolesRepository, UserRoleEntity };
