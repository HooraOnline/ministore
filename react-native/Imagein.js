import Image from 'next/image'
import * as React from "react";
export default function Imagein(props) {
   let style={}
    return (
        <Image {...props} priority={true} />
    );
}



