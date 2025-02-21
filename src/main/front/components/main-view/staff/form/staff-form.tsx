import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import './staff-form.scss'

export default function StaffForm(){
    return(
        <section className="staff-form-container">
            <header className="register-staff-header">
                <Image src={asideArrow} alt=">" />
                <h4>직원등록</h4>
            </header>
            <table className="staff-form-table">
                <colgroup>
                    <col style={{ width: '17%' }} />
                    <col style={{ width: '17%' }} />
                    <col style={{ width: '33%' }} />
                    <col style={{ width: '17%' }} />
                    <col style={{ width: '33%' }} />
                </colgroup>
                <tbody>
                    <tr>
                        <td rowSpan={5}>사진</td>
                        <td className="table-label">계정사용유무</td>
                        <td className="table-radio-container">
                           <div>
                                <label><input type="radio" name="isUse"/>사용 가능</label>
                                <label><input type="radio" name="isUse"/>사용 안함</label>
                           </div>
                        </td>
                        <td className="table-label">입사일</td>
                        <td><input type="date"/></td>
                    </tr>
                    <tr>

                    </tr>
                </tbody>
            </table>
        </section>
    )
}