import {action, observable} from 'mobx';
import {persist} from 'mobx-persist';

class PersistStore {
    @persist @observable locale = null;
    @persist @observable token = null;
    @persist('list') @observable roles = [];
    @persist @observable username = null; // TODO : MUST BE DELETED


    @observable pushID = null;

    @persist paymentId = null;

    @action clearStore() {
        this.token = null;
        this.username = null;
        this.paymentId = null;
        this.locale = null;

    }
    @action
    setAuthToken(token) {
        this.token = token;
    }
}

const persistStore = new PersistStore();

export default persistStore;
export {PersistStore};
