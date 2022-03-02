import React from 'react';
export default function TextInput(props) {
    let {style={}} = props;
    let {
        numberOfLines=1,
        onChangeText,
        maxLength,
        textInputStyle,
        label,
    } = props;
    if(numberOfLines<2){
        return (
            <div  style={{
                position:'relative',
                display: 'flex',
                justifyContent: 'center',
                borderRadius:4,
                borderColor:'#fefefe',
                width:'100%',
                height:60,
                border: '2px solid #efefef',
                ...style
            }}>
                <span
                    style={{
                        position: 'absolute',
                        right: 10,
                        top: -13,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 'calc(100% - 24px)',
                        fontSize:14,
                        backgroundColor:'#ffff',
                        paddingRight:10,
                        paddingLeft:10,
                    }}
                >
                    {label}
                </span>
            <input {...props}
                      style={{
                          outline: 'none',
                          border: 'none',
                          width:'100%',
                          fontFamily:'IRANYekanRegular',
                          fontSize:14,
                          paddingLeft:10,
                          paddingRight:20,
                          //height:'100%',
                      }}
                      inputProps={{
                          maxLength: maxLength,
                          style: textInputStyle,
                      }}
                      rows={numberOfLines}
                      disableUnderline={true}
                      onChange={event => {
                          let text=event.target.value;
                          onChangeText && onChangeText(text,event)
                      }}
            />

            </div>

        )
    }

    return (
        <div  style={{
            display: 'flex',
            justifyContent: 'center',
            borderRadius:4,
            borderColor:'#fefefe',
            width:'100%',
            height:60,
            border: '2px solid #efefef',
            ...style
        }}>
            <textarea {...props}
                      style={{
                          outline: 'none',
                          border: 'none',
                          width:'100%',
                          fontFamily:'IRANYekanRegular',
                          fontSize:14,
                          //height:'100%',
                      }}
                      inputProps={{
                          maxLength: maxLength,
                          style: textInputStyle,
                      }}
                      rows={numberOfLines}
                      disableUnderline={true}
                      onChange={event => {
                          let text=event.target.value;
                          onChangeText && onChangeText(text,event)
                      }}
            />
        </div>

    )


}







