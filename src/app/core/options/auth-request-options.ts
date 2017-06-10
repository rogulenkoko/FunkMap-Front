import { BaseRequestOptions } from "@angular/http";
import { UserService } from "app/main/user/user.service";



export class AuthRequestOptions extends BaseRequestOptions {
    constructor(private userService: UserService) {
        super();
        console.log(userService);
        this.headers.append('Authorization', 'my-token');
        this.headers.append('foo', 'bar');
    }
}