

export default function Line(props) {
    let {style={width:'100%',height:1,backgroundColor:'#efefef'}, } = props;
    let style2=Object.assign({},style);
    return (
        <line {...props}    style={style2} />
    );
}



