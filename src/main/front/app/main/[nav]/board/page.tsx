import BoardDetail from "@/components/main/board/board-detail";
import BoardList from "@/components/main/board/board-list";
import RegisterBoard from "@/components/main/board/register-board";
import { getBoardApi } from "@/features/board/api/server-api";
import { getUserInfo } from "@/features/user/userApi";
import {ResponseBoard} from "@/model/types/board/type";
import { notFound } from "next/navigation";


export default async function BoardPage({searchParams}: {
    searchParams: Promise<{
        page?: number,
        target?: string,
        mode?: 'write' | 'view' | 'detail' | 'edit'
    }>
}) {
    const page = (await searchParams).page ?? 1
    const target = (await searchParams).target || ''
    const mode = (await searchParams).mode
    
    const userInfo = await getUserInfo()
    const initialBoards:ResponseBoard[] = await getBoardApi()

    if(target){
        const board = initialBoards.find(({boardId})=>boardId ===target)
        const idx = initialBoards.findIndex(({boardId})=>boardId ===target)

        const beforeBoard = idx-1 >=0 ? initialBoards[idx-1] :null
        const afterBoard = idx+1 <= initialBoards.length ? initialBoards[idx+1] :null

        if(!board){
            notFound()
        }else{
            if(mode==='edit'){
                //작성자랑 수정자랑 같지 않으면 notFound
                if(board.writer !== userInfo.userId){
                    notFound()
                }
                return <RegisterBoard mode={mode} initialBoard={board}/>
            }else{
                return <BoardDetail initialBoard={board} beforeBoard={beforeBoard} afterBoard={afterBoard}/>
            }
        }
    }

    return (
        <>
            {mode === undefined && <BoardList initialBoardItems={initialBoards} page={page}/>}
            {mode === 'write' && <RegisterBoard mode={mode} initialBoard={null}/>}
        </>
    )

}