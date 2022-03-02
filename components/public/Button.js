
import {mainColor, bgWhite} from "../../helper/colors";
import {View} from "../../react-native";
export default function Button(props) {
    let { onPress, disabled,stopPropagation} = props;

    let style= {
        cursor: 'pointer',
        color:bgWhite,
        backgroundColor:mainColor,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        padding:8,
        paddingRight:13,
        paddingLeft:13,
        //width:150,
        ...props.style
    };
    return (
        <View {...props} style={style}
              onClick={disabled ? null : (event) => {
                  stopPropagation &&  event.stopPropagation();
                  onPress && onPress(event)
              }}>{props.children}</View>
    );
}



