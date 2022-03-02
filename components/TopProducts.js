import Head from 'next/head'
import Image from 'next/image'
import styles from './Suppliers.module.css'
import {compony1, logo, mastar, mobl1, mobl2, morghDane, sahelChob} from "../public/images";
import {productList} from "../dataService/sampleData/productList";
import {priceFormatter} from "../helper/utils";
import Line from "./public/Line";
import {Text, TouchableOpacity, View} from "../react-native";
import {ic_basket, ic_add, ic_minus, like, likeRed, ic_basketRed} from "../public/icons";
import LinkButtom from "./public/LinkButtom";
import loveStore from "../dataService/stores/LoveStore";
import {observer} from "mobx-react";
import {useState} from "react";
import basketStore from "../dataService/stores/BasketStore";

function TopProduct(props) {
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

 const TopProductActions=observer(props=> {
     const product=props.product;
     const inLoveProduct = loveStore.products.find(p=>p.id===product.id);
     const inBasket = basketStore.items.find(p=>p.id===product.id);
     const [inbasket, setInbasket] = useState(!!inBasket);
     const [love, setLove] = useState(!!inLoveProduct);
     const [count, setCount] = useState(1);
     //const [basket, setBasket] = useState(basketStore.items);

    const addRemoveLoveProduct=()=>{
       loveStore.addRemoveLoveProduct(props.product);
       setLove(!love);
    }
     const manageCount=(c)=>{
         const newCount =count+c;
         if(newCount<1) {
             return;
         }
         setCount(newCount)
     }
     const addToBasket=()=>{
         if(!inbasket){
             basketStore.addToBasket(product,count);
             setInbasket(true);
             props.onChangeBasket(basketStore.items.length);
         }

     }
    return (
        <View   style={{flex:1,width:'100%',flexDirection:'row',  alignItems:'center',justifyContent:'space-between',height:40,marginTop:10,paddingRight:10,paddingLeft:10}}>
            <Image onClick={addToBasket}  src={inbasket?ic_basketRed:ic_basket} width={24} height={24} />
            <LinkButtom onClick={()=>global.productId=product.id} style={{padding:8,flex:1,marginLeft:10,marginRight:10}} href="/productDetails">
                <Text style={{fontSize:14}}>جزئیات محصول</Text>
            </LinkButtom>
            {/*<View style={{flex:1,flexDirection: 'row',borderWidth:1, borderRadius:5,backgroundColor:'#efefef',  alignItems: 'center',justifyContent: 'center',padding:8,marginLeft:10,marginRight:10}}>
                <Image onClick={()=>manageCount(1)}  src={ic_add} width={24} height={24} />
                <Text style={{width:50,textAlign: 'center',backgroundColor:'#fff'}}>{count}</Text>
                <Image onClick={()=>manageCount(-1)}  src={ic_minus} width={24} height={24} />
            </View>*/}
            <Image onClick={addRemoveLoveProduct}   style={{}}  src={love?likeRed:like} width={24} height={24} />
        </View>
    )
})

//##########################Main class######################################
 function TopProducts(props) {
  return (
      <div className={styles.grid}>
          {productList.map((product,index)=> <div key={index.toString()}  className={styles.card}>
              <TopProduct product={product}/>
              <Line/>
              <TopProductActions product={product} onChangeBasket={props.onChangeBasket}/>
          </div>)}
      </div>
  )
}

export default observer(TopProducts)
