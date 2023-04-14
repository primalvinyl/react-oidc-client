import { UserManager, Log } from 'oidc-client-ts';

export default class OauthService {
    UserManager;
    userManagerConfig = {
        authority: 'https://accounts.google.com',
        client_id: process.env.CLIENT_ID || '',
        client_secret: process.env.CLIENT_SECRET || '',
        scope: 'openid https://www.googleapis.com/auth/contacts.readonly',
        redirect_uri: `${process.env.PUBLIC_URL || ''}/signincallback`,
    };

    constructor() {
        this.UserManager = new UserManager(this.userManagerConfig);

        Log.setLogger(console);
        Log.setLevel(Log.INFO);

        this.UserManager.events.addSilentRenewError(() => {
            console.error('Error: OIDC renew');
            this.signout();
        });
    }

    // returns boolean, if true, a user is currently authenticated
    isAuthenticated = () => {
        const { expires_at, access_token } = JSON.parse(
            sessionStorage.getItem(`oidc.user:${this.userManagerConfig.authority}:${this.userManagerConfig.client_id}`) || '{}'
        );
        const isExpired = new Date(expires_at * 1000) < new Date();
        return (!!access_token && !isExpired);
    };

    // initiates authentication flow
    signin = async () => {
        if (!this.isAuthenticated()) {
            sessionStorage.clear();
            localStorage.clear();
            localStorage.setItem('redirectUri', window.location.pathname);
            try {
                await this.UserManager.signinRedirect();
            } catch {
                console.error('Error: OIDC signin');
                window.location.replace(process.env.PUBLIC_URL || '');
            }
        }
    };

    // redirect after authentication
    signinCallback = async () => {
        try {
            await this.UserManager.signinRedirectCallback();
            const redirectUri = localStorage.getItem('redirectUri');
            window.location.replace((process.env.PUBLIC_URL || '') + redirectUri);
        } catch {
            console.error('Error: OIDC signinCallback');
            window.location.replace(process.env.PUBLIC_URL || '');
        }
    };

    // initiates signout flow
    signout = async () => {
        if(this.isAuthenticated()) {
            sessionStorage.clear();
            localStorage.clear();
            try {
                await this.UserManager.revokeTokens();
            } catch {
                console.error('Error: OIDC signout');
            } finally {
                window.location.replace(process.env.PUBLIC_URL || '');
            }
        }
    };
}
