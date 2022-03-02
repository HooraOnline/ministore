import Head from "next/head";
import NavBar from "./NavBar";
import {useEffect, useState} from "react";


function BublicPage(props) {
    let { style,children,title} = props;
    const [position, setPosition] = useState('top');
    useEffect(() => {
        if(window.innerWidth<600) setPosition('bottom');
    });
    return (
        <div dir={'rtl'}  style={style}>
            <Head>
                <title>{title}</title>
                <meta name="description" content="یونیکو، سامانه بازاریابی برای تولید کننده" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
              {children}
              <NavBar
                  basketCount={props.basketCount}
                  style={{
                      width:'100%',
                      position: 'fixed',
                      top:position==='top'? 0:undefined,
                      bottom:position==='top'? undefined:0,
                      backgroundColor:'#fff',
                      shadowColor: '#aaa',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.5,
                      boxShadow: '1px 1px #888888',
              }}/>
        </div>


    );
}

export default  BublicPage



