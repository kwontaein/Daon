export default function ActionTakenContent({details, actionTaken }){
    
    return(
        <>
        <tr>
            <td className="table-label">내용</td>
            <td>
                {details}
            </td>
        </tr>
        <tr>
            <td className="table-label">조치사항</td>
            <td>
                <textarea name='actionTaken' defaultValue={actionTaken ??'장애원인 :\n조치사항 :'} key={actionTaken}/>
            </td>
        </tr>
        </>
    )
}