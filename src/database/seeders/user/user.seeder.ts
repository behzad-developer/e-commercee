import { UserEntity } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';
const user = {
  name: 'Behzad',
  phonenumber: 65250795,
  password: 'behzad22',
};
export class UserSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const userRepository = dataSource
      .createEntityManager()
      .getRepository(UserEntity);
    const userCheck = await userRepository.findOneBy({
      phonenumber: user.phonenumber,
    });
    if (!userCheck) {
      const entity = new UserEntity({
        password: bcrypt.hashSync(user.password, 10),
        username: user.name,
        phonenumber: user.phonenumber,
      });
      await userRepository.save(entity);
    }
  }
}
