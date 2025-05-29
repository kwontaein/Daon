'use client'
import { useScreenMode } from '@/hooks/share/useScreenMode';
import '@/styles/options/options.scss';

export default function BoardOption({fileLink, position} : {
    fileLink: string,
    position:{x:number, y:number},
}) {
    const mode = useScreenMode({tabletSize:620, mobileSize:620})
    
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `/${fileLink.replace(/\\/g, '/')}`; // 윈도우 경로일 경우 슬래시로 변환
        link.download = decodeURIComponent(fileLink.split('_').slice(1).join('_')); // 다운로드 파일명 지정 (선택)
        link.click();
      };
    return(
        <menu className='options-container' style={{top: `${mode ==='pc' ? `${position.y}px` :'unset'}`, left: `${mode ==='pc' ? `${position.x}px` :'unset'}`, textAlign:'center', width:'70px'}}>
            <li onClick={handleDownload}>다운로드</li>
        </menu>    
    )
}