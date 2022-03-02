import Router from "next/router";

export function priceFormatter(price) {
    price=Math.round(price);
    let formattedPrice = '';
    let index = 1;
    while (price > 0) {
        formattedPrice = (price % 10) + formattedPrice;
        price = Math.floor(price / 10);
        if (index % 3 === 0 && price !== 0) {
            formattedPrice = ',' + formattedPrice;
        }
        index++;
    }
    return formattedPrice;
}

export const navigation={
    goBack:()=>{
        Router.back();
    },
    navigate:(screenPath,params)=>{
        screenPath=screenPath.startsWith('/')?screenPath:'/'+screenPath;
        const navigateData={ pathname: screenPath };
        //Router.push('/post/[cardlinkId]', `/post/${id}`); //for dynamic routing
        if(params){
            let jsonStr=JSON.stringify(params);
            let encodeParam=encodeURIComponent(jsonStr);
            navigateData.query= {X545R34F: encodeParam};
        }

        Router.push(navigateData);
    },
    replace:(screenPath,params)=>{

        screenPath=screenPath.startsWith('/')?screenPath:'/'+screenPath;
        const navigateData={ pathname: screenPath };
        if(params){
            let jsonStr=JSON.stringify(params);
            // let encodeParam=encodeURIComponent(jsonStr);
            navigateData.query= {X545R34F: jsonStr};
        }
        //Router.push('/post/[cardlinkId]', `/post/${id}`); //for dynamic routing
        Router.replace(navigateData);
    },

}