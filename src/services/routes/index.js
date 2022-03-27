//recebe todas as rotas com e sem auth para enviar pro App

import { Router } from "express"
import { login } from "./login.js"
import { routerMessage } from "./routerMessage.js";
import { routerUser } from "./routesUser.js"

const allRoutes = Router();

allRoutes.use("/", login);
allRoutes.use("/user", routerUser);
allRoutes.use("/message", routerMessage);

export default allRoutes