import { Router } from "express";
import { validateRequestInput } from "../../packages/errors/validate-request-input";
import {createUrlShorteningSchema,schemashortcode} from "../../packages/schemas/index";
import { URLShorteningController } from "../core/controller";

const router = Router();



router.post(
  "/shorten",
  validateRequestInput({ body: createUrlShorteningSchema }),
  URLShorteningController.create,
);

router.get(
  "/shorten/:shortCode",
  validateRequestInput({ params: schemashortcode }),
  URLShorteningController.Retrieve,
);

router.put(
  "/shorten/:shortCode",
  validateRequestInput({ params: schemashortcode ,body: createUrlShorteningSchema}),
  URLShorteningController.Update,
);

router.delete(
  "/shorten/:shortCode",
  validateRequestInput({ params: schemashortcode }),
  URLShorteningController.Delete,
);

router.get("/shorten/:shortCode/stats",
   validateRequestInput({ params: schemashortcode }),
   URLShorteningController.Statistics,
);

router.get("/shorten",
   URLShorteningController.RetrieveAll,
);
export default router;