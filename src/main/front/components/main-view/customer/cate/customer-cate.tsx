import { CustomerCateType } from "@/types/customer/cate/type";
import './customer-cate.scss';

export default function CustomerCate({customerCate} :{customerCate:CustomerCateType[]}){
    return(
        <>

            <table className="customer-cate-table">
            <colgroup>
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '60%' }} />
                        <col style={{ width: '10%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <td>순번</td>
                        <td>대분류키</td>
                        <td>대분류명</td>
                        <td>관리</td>
                    </tr>
                </thead>
                <tbody>
                    {customerCate.map((cate:CustomerCateType,index)=>(
                        <tr key={cate.customerCateId}>
                            <td>{index+1}</td>
                            <td>{cate.customerCateKey}</td>
                            <td className="left-align">{cate.customerCateName}</td>
                            <td><button>삭제</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='cate-button-container'>
                <button>추가하기</button>
                <button>수정하기</button>
            </div>
        </>
    )
}