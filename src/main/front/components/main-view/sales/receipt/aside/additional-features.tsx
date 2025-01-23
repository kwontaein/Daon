import './additional-features.scss'
export default function AdditionalFeatures(){
    return(
        <section className='additional-container'>
            <table>
                <thead>
                    <tr>
                        <td colSpan={2}>
                            <b>
                                부가기능
                            </b>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><button>전표수정</button></td>
                        <td><button>전표삭제</button></td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button>
                                견 적 서
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}