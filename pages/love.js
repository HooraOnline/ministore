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
import {ic_basket, ic_close, like, likeRed} from "../public/icons";
import LinkButtom from "../components/public/LinkButtom";


function LoveProduct(props) {
    const product=props.product;
    return (
        <div  className={styles.card}>
            <Image src={product.image} width={250} height={150} />
            <h3 style={{fontSize:14}}>{product.title}</h3>
            <strike style={{color:'red'}}><span style={{fontSize:15,color:'red',}}> {priceFormatter(product.price)} تومان</span></strike>
            <span style={{fontSize:15,marginTop:10}}> {priceFormatter(product.price-product.off*product.price)} تومان</span>
        </div>
    )
}

const LoveProductActions=observer(props=> {
    const product=props.product;
    const inLoveProduct = loveStore.products.find(p=>p.id===product.id);
    const [love, setLove] = useState(!!inLoveProduct);


    const addRemoveLoveProduct=()=>{
        loveStore.addRemoveLoveProduct(props.product);
        setLove(!love);
        props.onRemovedFromeLove();
    }
    return (
        <View   style={{flex:1,width:'100%',flexDirection:'row',  alignItems:'center',justifyContent:'space-between',height:40,marginTop:10,paddingRight:10,paddingLeft:10}}>
            <Image  src={ic_basket} width={24} height={24} />
            <LinkButtom style={{padding:8,flex:1,marginLeft:10,marginRight:10}} href="/productDetails">
                <Text style={{fontSize:14}}>جزئیات محصول</Text>
            </LinkButtom>
            <Image onClick={addRemoveLoveProduct}   style={{}}  src={ic_close} width={24} height={24} />
        </View>
    )
})

//##########################Main class######################################
export default function Love() {
  const [lovelist, setLovelist] = useState(loveStore.products);
  const onRemovedFromeLove=()=>{
      setLovelist(loveStore.products)
  }
  return (
    <div className={styles.container}>
      <BublicPage title={'مورد علاقه های من'}>
        <main className={styles.main}>
            <div className={styles.grid}>
                {lovelist.map(product=> <div  className={styles.card}>
                    <LoveProduct product={product}/>
                    <Line/>
                    <LoveProductActions onRemovedFromeLove={onRemovedFromeLove} product={product}/>
                </div>)}
            </div>
        </main>
      </BublicPage>
    </div>
  )
}
