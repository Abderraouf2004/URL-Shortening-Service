import {  validateObject } from "../../packages/errors/validate-object";
import type { UrlShortening } from "../../packages/types/index";
import {  UrlShorteningRepo } from "./repo";
import { UrlShorteningDTOSchema, UrlShorteningStatisticsSchema} from "../../packages/schemas/index";
import { ApiError } from "../../packages/errors/api-error";

export const URLShorteningService = {

  create: async (data: UrlShortening.Create) => {
   const created = await UrlShorteningRepo.create(data);

   return validateObject<UrlShortening.DTO>(UrlShorteningDTOSchema, created);
  },
  Retrieve : async (shortCode: string) => {
    const retrieved = await UrlShorteningRepo.Retrieve(shortCode);

    return validateObject<UrlShortening.DTO>(UrlShorteningDTOSchema, retrieved);
  },
  Update : async (shortCode: string,data: UrlShortening.Create) => {
    const updated = await UrlShorteningRepo.Update(shortCode,data);
    return validateObject<UrlShortening.DTO>(UrlShorteningDTOSchema, updated);
  },
  Delete : async (shortCode: string) => {
    const Url = await UrlShorteningRepo.Retrieve(shortCode);

    if (!Url) {
      throw new ApiError({
        code: "NOT_FOUND",
        message: "Space not found",
        details: "No space exists with the provided ID.",
      });
    }

    await UrlShorteningRepo.Delete(shortCode);

    return { success: true }; 
  },  
  Statistics : async (shortCode: string) => {
    const Url = await UrlShorteningRepo.Statistics(shortCode);
    return validateObject<UrlShortening.StatisticsDTO>(UrlShorteningStatisticsSchema, Url);
  }

};