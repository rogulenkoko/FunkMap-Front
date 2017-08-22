
import { EntityType } from "app/main/map/models";

export class RouteBuilder {
    public static buildRoute(entityType: EntityType, login: string): string{
        var route: string = "";
        switch (entityType) {
        case EntityType.Musician: route = "musicianPage";
            break;

        case EntityType.Band: route = "bandPage";
            break;

        case EntityType.Shop: route = "shopPage";
            break;

        case EntityType.Studio: route = "studioPage";
            break;

        case EntityType.RehearsalPoint: route = "rehearsalPage";
            break;
            
        default: return "";
        }
        return `/${route}/${login}`;
    }
}