import { databaseConnection } from '@users/database';
import { usersConfig } from '@users/config';

const initialize = (): void => {
  usersConfig.cloudinaryConfig();
  databaseConnection();
};

initialize();
