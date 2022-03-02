import {action, observable} from 'mobx';

class LoveStore {

    @observable products=[];


    @action
    addRemoveLoveProduct(product) {
        const addBefore=this.products.find(p=>p.id===product.id);
        if(!addBefore){
            this.products.push(product);
        } else{
            this.products=this.products.filter(p=>p.id !== product.id);
        }
        return addBefore

    }




    @action
    clear() {
        this.products=[];
    }
}

const loveStore = new LoveStore();

export default loveStore;
export {LoveStore};
