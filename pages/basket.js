import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BublicPage from "../components/public/BublicPage";
import Line from "../components/public/Line";
import {priceFormatter} from "../helper/utils";
import basketStore from "../dataService/stores/BasketStore";
import {useEffect, useState} from "react";
import {Text, View} from "../react-native";
import {ic_add, ic_basket, ic_close, ic_minus,} from "../public/icons";
import LinkButtom from "../components/public/LinkButtom";
import {bgWhite} from "../helper/colors";
import {observer} from "mobx-react";
import {gray} from "colorette";


function BasketItem(props) {
    const product=props.product;
    const [count, setCount] = useState(props.count);
    const price=product.price-product.off*product.price;

    const onChangeBasketItemCount=(newCount)=>{
        setCount(newCount);
        props.onChangeBasketItemCount();
    }
    return (
        <View style={{flex:1}}>
            <View style={{flexDirection:'row',marginTop:24,backgroundColor:bgWhite}}>
                <Image src={product.image} width={100} height={100} />
                <View style={{flex:1,padding:5}}>
                    <h3 style={{fontSize:14}}>{product.title}</h3>
                    <span style={{fontSize:13,marginTop:10}}>فی {priceFormatter(price)} تومان</span>
                    <span style={{fontSize:15,marginTop:10}}> قیمت کل:{priceFormatter(price*count)} تومان</span>
                </View>
            </View>
            <BasketItemActions
                onRemovedFromBasket={props.onRemovedFromBasket}
                onChangeBasketItemCount={onChangeBasketItemCount}
                product={product}
                count={count}/>
        </View>

    )
}

const BasketItemActions=props=> {
    const product=props.product;
    const inBasketItem = basketStore.items.find(p=>p.id===product.id);
    const [basket, setBasket] = useState(!!inBasketItem);
    const [count, setCount] = useState(props.count);

    const manageCount=(c)=>{
        const newCount =count+c;
        if(newCount<1) {
            return;
        }
        setCount(newCount);
        basketStore.chaneItemCount(product,newCount);
        props.onChangeBasketItemCount(newCount);
    }
    const addRemoveBasketItem=()=>{
        basketStore.removeFromBasket(props.product,count);
        setBasket(!basket);
        props.onRemovedFromBasket(product,count);
    }



    return (
        <View   style={{width:150,flexDirection:'row',  alignItems:'center',justifyContent:'space-between',height:40,marginTop:10,paddingRight:10,paddingLeft:10}}>
            <View style={{flex:1,flexDirection: 'row',borderWidth:1, borderRadius:5,backgroundColor:'#efefef',  alignItems: 'center',justifyContent: 'center',padding:8,marginLeft:10,marginRight:10}}>
                <Image onClick={()=>manageCount(1)}  src={ic_add} width={30} height={30} />
                <Text style={{width:50,textAlign: 'center',backgroundColor:'#fff'}}>{count}</Text>
                <Image onClick={()=>manageCount(-1)}  src={ic_minus} width={30} height={30} />
            </View>
            <Image onClick={addRemoveBasketItem}   style={{}}  src={ic_close} width={24} height={24} />
        </View>
    )
}

//##########################Main class######################################
 function Basket() {
    const [basket, setBasket] = useState(basketStore.items);
     const [allPrice, setAllPrice] = useState(basketStore.allPrice);
    const [isWide, setIsWide] = useState(true);
    useEffect(() => {
        if(window.innerWidth<600) setIsWide(false);
    });
    const onRemovedFromBasket=(item,count)=>{
        basketStore.removeFromBasket(item,count);
        basketStore.calculateAllPrice();
        setBasket(basketStore.items);
        setAllPrice(basketStore.allPrice);
    }
     const onChangeBasketItemCount=(item,count)=>{
         setAllPrice(basketStore.allPrice);
     }

     const doPayment=()=>{
        basketStore.clear();
        alert('پرداخت با موفقیت انجام شد.')
     }

    return (
        <div  className={styles.container}>
            <BublicPage title={'سبد خرید'}>
                {basket.length>0 ?(
                    <main >
                        <View style={{
                            flexDirection:'row',
                            alignItems: 'center',
                            width:'100%',
                            position: 'fixed',
                            top:isWide? 55:0,
                            backgroundColor:'#fff',
                            shadowColor: '#aaa',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.5,
                            boxShadow: '1px 1px #888888',
                            padding:16,
                            zIndex: 2,
                            color:'#c90828'
                        }}>
                            <span style={{color:'#555',fontSize:14}}>قابل پرداخت:</span>
                            {priceFormatter(allPrice)}
                            <span style={{color:'#777',fontSize:13}}>تومان</span>
                            <LinkButtom onClick={doPayment} style={{padding:8,flex:1,marginLeft:10,marginRight:10,width:70}} href="/">
                                <Text style={{fontSize:14}}>پرداخت</Text>
                            </LinkButtom>
                        </View>
                        <div style={{paddingTop: isWide? 100:55,}}>
                            {basket.map((item,index)=> <div  key={index.toString()}>
                                <BasketItem
                                    product={item.product}
                                    count={item.count}
                                    onRemovedFromBasket={onRemovedFromBasket}
                                    onChangeBasketItemCount={onChangeBasketItemCount}
                                />
                            </div>)}
                        </div>
                    </main>
                ):(
                    <main className={styles.main}>
                        <Text>سبد خرید شما خالی است</Text>
                        <LinkButtom style={{width:200,marginTop:16}} href="/">
                            <Text style={{fontSize:14}}>رفتن به فروشگاه</Text>
                        </LinkButtom>
                    </main>
                )}

            </BublicPage>
        </div>
    )
}

export default observer(Basket)
