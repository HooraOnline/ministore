
import View from "./View";
import React from "react";

export default function ScrollView(props) {
    let {style={},contentContainerStyle} = props;
    const styles = {
        main: {
            maxHeight:style.maxHeight || '100%',
            overflowY:props.horizontal?'hidden':'auto',
            overflowX:props.horizontal?'auto':'hidden',
            width:'100%'
        },
    }
    return (
        <View {...props} style={style} >
            <View style={[{width:'100%',},contentContainerStyle]}>
                {props.children}
            </View>
        </View>
    );
}




