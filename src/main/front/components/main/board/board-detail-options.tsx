import { useScreenMode } from "@/hooks/share/useScreenMode"
import { useRouter, useSearchParams } from "next/navigation"

export default function BoardDetailOption({boardId, position} : {
    boardId: string,
    position:{x:number, y:number},
}) {
    const mode = useScreenMode({tabletSize:620, mobileSize:620})
    const router = useRouter()
    const searchParams = useSearchParams()
    const editBoardHandler = ()=>{
        const params = new URLSearchParams(searchParams.toString()); 
        params.set("mode", 'edit'); 
        params.set("target", boardId)
        router.push(`/main/board/board?${params.toString()}`)
    }
    return(
        <menu className='options-container' 
              style={{
                    top: `${mode ==='pc' ? `${position.y}px` :'unset'}`,
                    left: `${mode ==='pc' ? `${position.x}px` :'unset'}`, 
                    textAlign:'center', 
                    width:'70px'
                }}>
            <li onClick={editBoardHandler}>수정하기</li>
            <li className="delete-option">삭제하기</li>
        </menu>    
    )
}