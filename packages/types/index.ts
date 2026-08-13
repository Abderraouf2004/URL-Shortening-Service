
export namespace UrlShortening {

  export interface Create {
    url: URL;
  }
  
   export interface DTO {
    id: string;
    url: URL;
    shortCode: string;
    updatedAt: Date;
    createdAt: Date;
  }
    export interface StatisticsDTO {
    id: string;
    url: URL;
    shortCode: string;
    updatedAt: Date;
    createdAt: Date;
    accessCount: number;
  }
  
}