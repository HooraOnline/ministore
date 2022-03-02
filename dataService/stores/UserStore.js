import {action, observable} from 'mobx';

class UserStore {

    @observable cUser={};
    @observable userID= '' ;
    @observable username= '' ;
    @observable profileImage= '' ;
    @observable fullName= '' ;

    @action
    setUser(user) {
        this.cUser=user;
        this.userID= user.id ;
        this.username= user.username ;
        this.profileImage= user.profileImage ;
        this.fullName= user.fullName|| '' ;
        this.fullName=user.fullName;
    }

    @action
    findPermission(itemId) {
        let permission=this.Form.find(o => o.formID === itemId);
        return permission;
    }

    @action
    setUnitBalance(unitBalance) {
        this.UnitBalance = unitBalance ? parseFloat(unitBalance) : 0;
    }

    clear() {
        this.cUser={};
        this.userID= '' ;
        this.username='' ;
        this.profileImage='';
        this.fullName= '' ;
        this.fullName='';
    }
}

const userStore = new UserStore();

export default userStore;
export {UserStore};
