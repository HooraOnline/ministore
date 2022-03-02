import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BublicPage from "../components/public/BublicPage";
import Line from "../components/public/Line";
import {priceFormatter} from "../helper/utils";
import {observer} from "mobx-react";
import loveStore from "../dataService/stores/LoveStore";
import {useState} from "react";
import {Text, View} from "../react-native";
import {ic_basket, ic_basketRed, ic_close, like, likeRed} from "../public/icons";
import LinkButtom from "../components/public/LinkButtom";
import {productList} from "../dataService/sampleData/productList";
import basketStore from "../dataService/stores/BasketStore";




const Actions=observer(props=> {
    const product=props.product;
    const inLoveProduct = loveStore.products.find(p=>p.id===product.id);
    const [love, setLove] = useState(!!inLoveProduct);
    const [count, setCount] = useState(1);
    const inBasket = basketStore.items.find(p=>p.id===product.id);
    const [inbasket, setInbasket] = useState(!!inBasket);

    const addRemoveLoveProduct=()=>{
        loveStore.addRemoveLoveProduct(product);
        setLove(!love);

    }
    const addToBasket=()=>{
        if(!inbasket){
            basketStore.addToBasket(product,count);
            setInbasket(true);
            props.onChangeBasket(basketStore.items.length);
        }

    }
    return (
        <View   style={{flex:1,width:'100%',flexDirection:'row',  alignItems:'center',justifyContent:'space-between',height:40,marginTop:10,paddingRight:10,paddingLeft:10,}}>
            <Image onClick={addToBasket}  src={inbasket?ic_basketRed:ic_basket} width={24} height={24} />
            <LinkButtom style={{padding:8,flex:1,marginLeft:10,marginRight:10}} href="/">
                <Text style={{fontSize:14}}>بازگشت</Text>
            </LinkButtom>
            <Image onClick={addRemoveLoveProduct}   style={{}}  src={love?likeRed:like} width={24} height={24} />
        </View>
    )
})

//##########################Main class######################################
export default function ProductDetails() {
    const [basketCount, setBasketCount] = useState(basketStore.items.length);
    global.productId=global.productId ||1;
    const product=productList.find(p=>p.id===global.productId);
    const onChangeBasket =(newCount)=>{
        setBasketCount(newCount)
    }
    return (
        <div className={styles.container}>
            <BublicPage title={product.title}>
                <main className={styles.main} style={{width:'100%',marginBottom:60}}>
                    <div  className={styles.productcard} style={{width:'100%',}}>
                        <img src={product.image} width={'100%'} />
                        <h3 style={{fontSize:14}}>{product.title}</h3>
                        <strike style={{color:'red'}}><span style={{fontSize:15,color:'red',}}> {priceFormatter(product.price)} تومان</span></strike>
                        <span style={{fontSize:15,marginTop:10}}> {priceFormatter(product.price-product.off*product.price)} تومان</span>
                        <Text style={{color:'#333',textAlign:'justify',paddingBottom:10}}>
                            {product.description}
                        </Text>
                        <Line/>
                        <Actions product={product} onChangeBasket={onChangeBasket}/>
                    </div>
                </main>
            </BublicPage>
        </div>
    )
}
