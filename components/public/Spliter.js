import {spliter} from "../../public/icons";
import Image from "next/image";

export default function Spliter(props) {
    return (
        <div {...props}>
            <Image src={spliter} width={600} height={50} />
        </div>
    );
}



