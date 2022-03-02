import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BublicPage from "../components/public/BublicPage";
import TopProducts from "../components/TopProducts";
import Spliter from "../components/public/Spliter";
import Suppliers from "../components/Suppliers";
import {TextInput, View} from "../react-native";
import {searchRed} from "../public/icons";
import {useState} from "react";
import basketStore from "../dataService/stores/BasketStore";


function SearchBox() {
    return (
        <View style={{flex: 1, width: '100%', flexDirection: 'row', margin: 5, position: 'relative'}}>
            <TextInput placeholder={'جستجو'} style={{width: '99%',}}/>
            <img src={searchRed} width={30} height={30} style={{position: 'absolute', left: 20, top: 17}}/>
        </View>
    )
}

function Rules() {
    return (
        <div className={styles.grid}>
            <div className={styles.card2}>
                <h3 className={styles.subTitle}>خرید مستقیم از تولید کننده</h3>
            </div>
            <div className={styles.card2}>
                <h3 className={styles.subTitle}>امنیت کامل معامله</h3>
            </div>
            <div className={styles.card2}>
                <h3 className={styles.subTitle}>تضمین کیفیت و قیمت</h3>
            </div>
            <div className={styles.card2}>
                <h3 className={styles.subTitle}>امکان مرجوعی بدون چون و چرا</h3>
            </div>
        </div>
    )
}


//#############################Main Class#############################################

function Home() {
    const [basketCount, setBasketCount] = useState(basketStore.items.length);
    const onChangeBasket =(newCount)=>{
        setBasketCount(newCount)
    }
    return (
        <div className={styles.container}>
            <BublicPage
                title={'فروشگاه اینترنتی یونیکو'}>
                <main className={styles.main}>
                    <div className={styles.box}>
                        <SearchBox/>
                        <TopProducts onChangeBasket={onChangeBasket}/>
                    </div>
                    <Rules/>
                    <Spliter style={{marginTop: 34}}/>
                    <h3 className={styles.lineTitle}>برخی از تامین کنندگان ما</h3>
                    <Suppliers/>
                </main>
                <footer className={styles.footer}>

                </footer>
            </BublicPage>
    </div>
  )
}

export default Home
