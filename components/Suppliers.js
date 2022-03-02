import Head from 'next/head'
import Image from 'next/image'
import styles from './Suppliers.module.css'
import {compony1, logo, mastar, morghDane, sahelChob} from "../public/images";




export default function Suppliers() {
  return (
    <div style={{display: 'flex',width: '100%',alignItems: 'center',justifyContent: 'space-around',overflow: 'auto',}}>
      <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
          <div style={{width:100,height:100,marginRight:10,}}>
              <Image  src={compony1} width={'100%'} height={'100%'} />
          </div>
        <h3 style={{fontSize:13}}>مبل آسمان</h3>
      </div>
        <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
            <div style={{width:100,height:100,marginRight:10}}>
                <Image  src={morghDane} width={'100%'} height={'100%'} />
            </div>
            <h3 style={{fontSize:13}}>مرغ دانه</h3>
        </div>
        <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
            <div style={{width:100,height:100,marginRight:10}}>
                <Image  src={mastar} width={'100%'} height={'100%'} />
            </div>
            <h3 style={{fontSize:13}}>شرکت مستر</h3>
        </div>
        <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
            <div style={{width:100,height:100,marginRight:10,}}>
                <Image  src={compony1} width={'100%'} height={'100%'} />
            </div>
            <h3 style={{fontSize:13}}>مبل آسمان</h3>
        </div>

    </div>
  )
}
