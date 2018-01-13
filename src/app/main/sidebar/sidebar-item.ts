export class SidebarItem {
    constructor(public route: string, public title, public iconClass) {
  
    }
  
    public clickEvent?: () => void;
    public rightTemplate?: any;
    public visibleForLogged: boolean;
  
    public isSelected: boolean;
  }