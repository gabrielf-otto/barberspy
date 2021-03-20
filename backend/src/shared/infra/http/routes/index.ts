import { Router } from 'express';

import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';


const routes = Router();

routes.use(sessionRouter);
routes.use(usersRouter);
routes.use(passwordRouter);
routes.use(profileRouter);
routes.use(providersRouter);
routes.use(appointmentsRouter);



export default routes;
