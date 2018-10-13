import { BaseLoginProvider } from 'angularx-social-login/src/entities/base-login-provider';
import { SocialUser } from 'angularx-social-login/src/entities/user';
import { LoginOpt } from 'angularx-social-login/src/auth.service';
import { ObserveOnMessage } from 'rxjs/operators/observeOn';
import { Observable } from "rxjs/Observable";
import { ConfigurationProvider } from '../../core';

declare var SC;

export class SoundCloudLoginProvider {

    private initialize(): Promise<void> {
        return
    }
    
    signIn(opt?: LoginOpt): Promise<SocialUser> {
        console.log(window.location);
        SC.initialize({
            client_id: ConfigurationProvider.soundcloudKey,
            redirect_uri: "soundcloud.com"
        });
        return SC.connect().then(function () {
            return SC.get('/me');
        }).then(function (me) {
            alert('Hello, ' + me.username);
        });

    }
}
