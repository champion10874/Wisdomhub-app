import { Application } from 'express';

export function appRoutes(app: Application) {
  app.use('', () => console.log('appRoutes'));
}

