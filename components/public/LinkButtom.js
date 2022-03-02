
import {mainColor, bgWhite} from "../../helper/colors";
import {View} from "../../react-native";
import Link from "next/link";
export default function LinkButtom(props) {
    let { onPress, disabled,stopPropagation} = props;

    let style= {
        display:'flex',
        cursor: 'pointer',
        color:bgWhite,
        backgroundColor:mainColor,
        borderRadius:5,
        alignItems: 'center',
        justifyContent: 'center',
        padding:8,
        paddingRight:13,
        paddingLeft:13,
        //width:150,
        ...props.style
    };
    return (
        <div {...props} style={style} >
            <Link href={props.href} >{props.children}</Link>
        </div>


    );
}



