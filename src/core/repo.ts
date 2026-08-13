import { PrismaClient } from "@prisma/client";

import type { UrlShortening } from "../../packages/types/index";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export const UrlShorteningRepo = {
  create: async (data: UrlShortening.Create) => {
    const shortCode = nanoid(6);
     const Url = await prisma.urlShortening.create({
      data: {
        url: data.url.toString(),
        shortCode,
      },
    });
   

    return Url;

  },
  Retrieve : async (shortCode: string) => {
     const Url = await prisma.urlShortening.update({
    where: {
      shortCode,
    },
    data: {
      accessCount: {
        increment: 1,
      },
    },
  });

  return Url;
  },
  Update : async (shortCode: string,data: UrlShortening.Create) => {
    const Url = await prisma.urlShortening.update({
      where: {
        shortCode,
      },
      data: {
        url: data.url.toString(),
      },
    });

    return Url;
  },
  Delete : async (shortCode: string) => {
    const Url = await prisma.urlShortening.delete({
      where: {
        shortCode,
      },
    });

    return Url;
  },
  Statistics : async (shortCode: string) => {
    const Url = await prisma.urlShortening.findUnique({
      where: {
        shortCode,
      },
      
    });

    return Url;
  },



};