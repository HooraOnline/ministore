import {action, observable} from 'mobx';
import {persist} from "mobx-persist";

class BasketStore {

    @persist('list') @observable items = [];
    @persist allPrice=0;

    @action
    addToBasket(product,count) {
        this.items.push({id:product.id,product,count});
        this.calculateAllPrice();
    }

    @action
    removeFromBasket(product) {
        this.items=this.items.filter(p=>p.id !== product.id);
        this.calculateAllPrice();
    }

    @action
    chaneItemCount(product,newCount) {
        this.items.map(item=>{
            if(item.id===product.id) {
                item.count = newCount;
            }
        })
        this.calculateAllPrice();
    }

    @action
    calculateAllPrice() {
        this.allPrice=0;
        this.items.map(item=>{
            const product = item.product
            this.allPrice=this.allPrice+(product.price-product.price*product.off)*item.count;
        })
    }




    clear() {
        this.items=[];
        this.allPrice=0;
    }
}

const basketStore = new BasketStore();

export default basketStore;
export {BasketStore};
