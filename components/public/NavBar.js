import React, {useEffect, useState} from "react";
import {Text, TouchableOpacity, View} from "../../react-native";
import {useRouter} from "next/router";
import Image from 'next/image'
import Link from "next/link";
import {mainText} from "../../helper/colors";

import {ic_basket, ic_basketRed, home, homeRed, like, likeRed,} from "../../public/icons";
import loveStore from "../../dataService/stores/LoveStore";
import {observer} from "mobx-react";
import basketStore from "../../dataService/stores/BasketStore";


const NavBar=props=>{
    const router = useRouter();

    const navButtons=props.navButtons || [
        {
            label: 'فروشگاه',
            path: "/",
            icon: home,
            activeIcon: homeRed,
        },
        {
            label: 'سبد',
            path: "/basket",
            icon: ic_basket,
            activeIcon: ic_basketRed,
            notif:basketStore.items.length,
        },
        {
            label: 'مورد علاقه',
            path: "/love",
            icon: like,
            activeIcon: likeRed,
        },
    ]

    return (
        <div style={props.style}>
            <View   style={NavBarCss}>
                {navButtons.map((button,index) => (
                    <Link  href={ button.path}>
                        <View style={{alignItems: 'center'}}>
                            <Image
                                style={{width:24,height:24,}}
                                width={24}
                                height={24}
                                src={router.pathname !== button.path?button.icon:button.activeIcon}
                            />
                            <Text style={{fontSize:12,color:router.pathname === button.path?'red':mainText}}>{button.label}</Text>
                            {button.notif?(
                                <View  style={{alignItems:'center',justifyContent: 'center',position:'absolute',top:0, backgroundColor:'red',color:'#fff',borderRadius:'50%',height:30,minWidth:30,}}>{button.notif}</View>
                            ):''}
                        </View>

                    </Link>
                ))}
            </View>
        </div>

    )
}
export default  observer(NavBar)

const  NavBarCss= {
    flexDirection: 'row',
    width: '100%',
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    height: 50,

    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth:1,
    borderTopColor: '#cecece',
    boxShadow: "1px 1px #aaa",


};