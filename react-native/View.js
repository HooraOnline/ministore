export default function View(props) {
    let {style={}, } = props;
    let style2=Object.assign({},style);
    style2.display='flex';
    style2.flexDirection=(style2.flexDirection || 'column');
    return (
        <view {...props}    style={style2} />
    );
}



