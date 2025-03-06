import '@/styles/form-style/form.scss';

import asideArrow from '@/assets/aside-arrow.gif';
import Image from 'next/image';

export default function TaskForm({task}:{task?:[]}){
    
    return(
        <>
        {!task &&
        <header className="register-header">
            <Image src={asideArrow} alt=">" />
            <h4>업무등록</h4>
        </header>
        }
        <form className='register-form-container'>
            <table className='register-form-table'>
                <tbody>
                    <tr>
                        <td className='table-label'>구분</td>
                        <td className='table-radio-container' colSpan={3}>
                            <div>
                                <label><input type='radio' name='taskType' value='AS'/>A/S</label>
                                <label><input type='radio' name='taskType' value='INCOMING'/>입고</label>
                                <label><input type='radio' name='taskType' value='DELIVERY'/>납품</label>
                                <label><input type='radio' name='taskType' value='INVENTORY'/>재고</label>
                                <label><input type='radio' name='taskType' value='OTHER'/>기타</label>
                                <label><input type='radio' name='taskType' value='RENTAL'/>임대</label>
                                <label><input type='radio' name='taskType' value='MAINTENANCE'/>유지보수</label>
                                <label><input type='radio' name='taskType' value='ATTENDANCE'/>근태</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>거래처선택</td>
                        <td><input/></td>
                        <td className='table-label'>의뢰자명</td>
                        <td><input/></td>
                    </tr>
                    <tr>
                        <td className='table-label'>의뢰자 연락처</td>
                        <td><input/></td>
                        <td className='table-label'>의뢰자 휴대폰</td>
                        <td><input/></td>
                    </tr>
                    <tr>
                        <td className='table-label'>모델</td>
                        <td><input/></td>
                        <td className='table-label'>담당기사</td>
                        <td>
                            <select>
                                <option value='none'>미지정</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className='table-label'>내용</td>
                        <td className='big-memo' colSpan={3}><textarea/></td>
                    </tr>
                    <tr>
                        <td className='table-label'>비고</td>
                        <td className='big-memo' colSpan={3}><textarea/></td>
                    </tr>
                </tbody>
            </table>
            <div className='button-container'>
                <button>저장</button>
                <button>취소</button>
            </div>
        </form>
        </>
    )
}