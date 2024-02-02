import { entityModules } from 'libs/constants';
import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'jira',
  entities: entityModules,
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
