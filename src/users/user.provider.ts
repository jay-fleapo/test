import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Academics } from './entities/academics.entity';
import { Exhibitions } from './entities/exhibitions.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ACADEMICS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Academics),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EXHIBITIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Exhibitions),
    inject: ['DATA_SOURCE'],
  },
];
