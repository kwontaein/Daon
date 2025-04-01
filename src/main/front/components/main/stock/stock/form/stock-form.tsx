"use client";
import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss';
import { StockCate } from "@/model/types/stock/cate/type";

export default function StockForm({stockCate}:{stockCate: StockCate[]}){
    
    return(
        <section className="register-form-container">
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>물품등록</h4>
            </header>
            <p style={{color:'red', fontSize:'13px', marginBottom:'5px'}}>
                ※ 재고계산여부 체크는 한번 입력하면 수정할수 없습니다. 신중히 선택해 주세요.
            </p>
            <form >
                <table className="register-form-table">
                    <colgroup>
                        <col style={{width:'20%'}}/>
                        <col style={{width:'30%'}}/>
                        <col style={{width:'20%'}}/>
                        <col style={{width:'30%'}}/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td className="table-label">분류선택</td>
                            <td colSpan={3}>
                                <label>
                                    <select
                                        size={1}
                                        name='category'>
                                        <option value='none'>분류선택</option>
                                        {
                                            stockCate.map((cate : StockCate) => (
                                                <option key={cate.stockCateId} value={cate.stockCateId}>
                                                    {cate.stockCateName}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-label">검색 포함여부</td>
                            <td className="table-radio-container">
                                <div>
                                    <label><input type="radio" value="Y" name="searchInclude"/>포함</label>
                                    <label><input type="radio" value="N" name="searchInclude" defaultChecked/>미포함</label>
                                </div>
                            </td>
                            <td className="table-label">재고계산여부</td>
                            <td className="table-radio-container">
                                <div>
                                    <label><input type="radio" value="Y" name="isUse"/>사용</label>
                                    <label><input type="radio" value="N" name="isUse" defaultChecked/>미사용</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-label">품목명</td>
                            <td><input/></td>
                            <td className="table-label">규격</td>
                            <td><input/></td>
                        </tr>
                        <tr>
                            <td className="table-label">단위 </td>
                            <td><input/></td>
                            <td className="table-label">과세기준</td>
                            <td>
                                <select>
                                    <option>과세</option>
                                    <option>면세</option>
                                    <option>예비</option>
                                    <option>영세</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-label">입고가</td>
                            <td><input/></td>
                            <td className="table-label">출고가</td>
                            <td><input/></td>
                        </tr>
                        <tr>
                            <td className="table-label">이월제고</td>
                            <td colSpan={3}><input/></td>
                        </tr>
                        <tr>
                            <td className="table-label">호환기종</td>
                            <td colSpan={3}>
                                <textarea/>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-label">비고사항</td>
                            <td colSpan={3}>
                                <textarea/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="button-container">
                    <button type='button'>저장</button>
                    <button type='button'>취소</button>
                </div>
            </form>
        </section>
    )
}