import type { Request, Response } from "express";
import { tryCatch } from "../../packages/errors/try-catch";
import { URLShorteningService } from "./service";


export const URLShorteningController = {
     create: tryCatch(async (req: Request, res: Response) => {
          const data = await URLShorteningService.create(req.body);
          res.status(201).json({ data, message: "URL shortened created successfully" });
     }),
     Retrieve : tryCatch(async (req: Request, res: Response) => {
          const data = await URLShorteningService.Retrieve(req.params.shortCode as string);
          res.status(200).json({ data, message: "URL retrieved successfully" });
     }),
     Update : tryCatch(async (req: Request, res: Response) => {
          const data = await URLShorteningService.Update(req.params.shortCode as string,req.body);
          res.status(200).json({ data, message: "URL updated successfully" });
     }),
     Delete : tryCatch(async (req: Request, res: Response) => {
          const data = await URLShorteningService.Delete(req.params.shortCode as string);
          res.status(200).json({ data, message: "URL deleted successfully" });
     }),
     Statistics : tryCatch(async (req: Request, res: Response) => {
          const data = await URLShorteningService.Statistics(req.params.shortCode as string);
          res.status(200).json({ data, message: "URL statistics retrieved successfully" });
     }),

   
};