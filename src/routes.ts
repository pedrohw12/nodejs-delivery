import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createDeliverymanController = new CreateDeliverymanController();

routes.post("/clients/", createClientController.handle);
routes.post("/client/auth", authenticateClientController.handle);
routes.post("/deliveryman/auth", authenticateDeliverymanController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);

export { routes };
