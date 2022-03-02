import View from "./View";

export default function TouchableOpacity(props) {
    let {style = {}, onPress, disabled,stopPropagation} = props;
    style={ cursor: 'pointer',...style}
    return (
        <View {...props} style={style}
              onClick={disabled ? null : (event) => {
                  stopPropagation &&  event.stopPropagation();
                  onPress && onPress(event)
              }}/>
    );
}



