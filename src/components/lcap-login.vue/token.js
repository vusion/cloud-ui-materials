import cookie from './cookie';
import localStorage from './localStorage';

let token;

export default {
    set(Authorization) {
        token = Authorization;
        cookie.set({ authorization: Authorization });
        localStorage.set('Authorization', Authorization);
    },
    get() {
        return token || cookie.get('authorization') || localStorage.get('Authorization');
    },
    erase() {
        this.set('');
        cookie.eraseAll();
    },
};
