// import React, { useEffect } from 'react';
import { useAppSelector } from '../../../app/hooks';

export default function CountDown() {
    const { value:time } = useAppSelector(state => state.tomato);
    
    // useEffect(() => {
    //     if(time===0) alert('hhhhh');
    // },[time])
    const h = Math.floor(time / 60 / 60) % 24;
    const m = Math.floor(time / 60) % 60;
    const s = time % 60;
    if(h){
        return (
        <div className='time'>
            {h < 10 ? '0' + h : h}:{m < 10 ? '0' + m : m}:{s < 10 ? '0' + s : s}
        </div>
    )}
    else{
        return (
            <div className='time'>
                {m < 10 ? '0' + m : m}:{s < 10 ? '0' + s : s}
            </div>
        )
    }
}
