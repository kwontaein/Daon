import BoardDetail from "@/components/main/board/board-detail";
import BoardList from "@/components/main/board/board-list";
import RegisterBoard from "@/components/main/board/register-board";
import { getBoardApi, updateViews } from "@/features/board/api/boardApi";
import {ResponseBoard} from "@/model/types/board/type";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import {v4 as uuidv4} from "uuid";

const BoardData: ResponseBoard[] = [
    {
        boardId: uuidv4(),
        notice: true,
        title: '사내게시판 작성 가능합니다.',
        content: '',
        writer: '류상배',
        createAt: new Date(2023, 1, 8),
        views: 50
    },
    {
        boardId: uuidv4(),
        notice: false,
        title: '다온정보',
        content: '',
        writer: '홍미순',
        createAt: new Date(2023, 1, 20),
        views: 48
    },
    {
        boardId: uuidv4(),
        notice: false,
        title: '	화성정보시스템(화성)',
        content: '',
        writer: '김소정',
        createAt: new Date(2023, 2, 28),
        views: 27
    },
    {
        boardId: uuidv4(),
        notice: false,
        title: '다온정보(통장, 사업자,여성기업,중소기업,소프트웨어)',
        content: '',
        writer: '김소정',
        createAt: new Date(2023, 2, 28),
        views: 57
    },
    {
        boardId: uuidv4(),
        notice: false,
        title: '바른사무기기(사업자등록증,통장사본)',
        content: '',
        writer: '전경자',
        createAt: new Date(2023, 3, 6),
        views: 43
    },

    {
        boardId: uuidv4(),
        notice: false,
        title: '유용한 주소들',
        content: '',
        writer: '윤동열',
        createAt: new Date(2024, 8, 24),
        views: 15
    },
]
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
    const userInfo = (await cookies()).get('user')?.value
    
    const initialBoards:ResponseBoard[] = await getBoardApi()

    if(target){
        const board = initialBoards.find(({boardId})=>boardId ===target)
        const idx = initialBoards.findIndex(({boardId})=>boardId ===target)

        const beforeBoard = idx-1 >=0 ? initialBoards[idx-1] :null
        const afterBoard = idx+1 <= initialBoards.length ? initialBoards[idx+1] :null

        if(!board){
            notFound
        }else{
            if(mode==='edit'){
                //작성자랑 수정자랑 같지 않으면 notFound
                if(board.writer !== JSON.parse(userInfo).userId){
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