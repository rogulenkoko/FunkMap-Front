
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
            
        default: return "";
        }
        return `/${route}/${login}`;
    }
}