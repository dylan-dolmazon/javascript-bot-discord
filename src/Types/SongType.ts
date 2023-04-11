export interface SongType {
    entityUniqueId: string;
    userCountry: string;
    pageUrl: string;
    entitiesByUniqueId: SongLinkType;
    linksByPlatform: LinksByPlatform;
}

interface SongLinkType {
    [key: string]: {
      id: string;
      type: string;
      title: string;
      artistName: string;
      thumbnailUrl: string;
      thumbnailWidth: number;
      thumbnailHeight: number;
      apiProvider: string;
      platforms: string[];
    }
  }

  export interface Platform {
    country: string;
    url: string;
    entityUniqueId: string;
    nativeAppUriMobile?: string;
    nativeAppUriDesktop?: string;
}
  
interface LinksByPlatform {
  [key: string]: Platform
}