'use client'
import { useScreenMode } from '@/hooks/share/useScreenMode';
import '@/styles/options/options.scss';
import { useEffect } from 'react';

export default function BoardOption({fileId, boardId, position} : {
    fileId: string,
    boardId: string,
    position:{x:number, y:number},
}) {
    const mode = useScreenMode({tabletSize:620, mobileSize:620})

    return(
        <menu className='options-container' style={{top: `${mode ==='pc' ? `${position.y}px` :'unset'}`, left: `${mode ==='pc' ? `${position.x}px` :'unset'}`, textAlign:'center', width:'70px'}}>
            <li>다운로드</li>
        </menu>    
    )
}