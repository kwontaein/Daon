export default function ActionTakenContent({details, actionTaken, mode}){
    
    return(
        <>
            {mode==='write' &&
                <tr>
                    <td className="table-label">내용</td>
                    <td>
                        {details}
                    </td>
                </tr>
            }
            <tr>
                <td className="table-label">조치사항</td>
                <td colSpan={mode==='write' ? 1 : 3}>
                    <textarea name='actionTaken' defaultValue={actionTaken ??'장애원인 :\n조치사항 :'} key={actionTaken} readOnly={mode==='detail'}/>
                </td>
            </tr>
        </>
    )
}