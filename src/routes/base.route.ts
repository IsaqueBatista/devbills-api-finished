import { Router } from 'express';

import packageJson from '../../package.json';

export const baseRoutes = Router();

baseRoutes.get('/', (_, res) => {
  const { name, version } = packageJson;

  res.json({ name, version });
});
