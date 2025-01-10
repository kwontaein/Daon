
export const AsideOptions = {
    sales: {
        asideTitle: '판매회계',
        asideItems: [
            {name: '전표입력', link: 'receipt'},
            {name: '견적서관리', link: 'task-estimate'},
            {name: '미수/미지급현황', link: 'remain'},
            {name: '관리비관리', link: 'official'}]
    },
    customer: {
        asideTitle: '고객관리',
        asideItems: [
            {name: '거래처관리', link: 'customer'},
            {name: '분류관리', link: 'customer-cate'}]
    },
    stock: {
        asideTitle: '품목/재고',
        asideItems: [
            {name: '품목/재곡 관리', link: 'stock'},
            {name: '분류관리', link: 'stock/cate'},
            {name: '구매적립금설정', link: 'point'}]
    },
    ledger: {
        asideTitle: '원장출력',
        asideItems: [
            {name: '거래처별원장출력', link: 'ledger-customer'},
            {name: '복수거래처원장출력', link: 'ledger-customers'},
            {name: '품목별원장출력', link: 'ledger-stock'},
            {name: '매출장 출력', link: 'ledger-sales'},
            {name: '매입장 출력', link: 'ledger-purchase'},
            {name: '관리비 원장출력', link: 'ledger-official'},
            {name: '재고조사서', link: 'ledger-stock-count'},
            {name: '기타원장', link: 'ledger-etc'}]
    },
    staff: {
        asideTitle: '회사/사원관리',
        asideItems: [
            {name: '회사정보', link: 'company'},
            {name: '사원관리', link: 'staff'},
            {name: '부서관리', link: 'category'}
        ]
    },
    task: {
        asideTitle: '업무관리',
        asideItems: [
            {name: '업무관리', link: 'task'},
            {name: '관리자데이터조회', link: 'admin'},
            {name: '견적서관리', link: 'estimate'},
            {name: '세금계산서', link: 'bills'},
            {name: '입금표', link: 'deposit'}]
    },
    accounting: {
        asideTitle: '회계 및 거래관리',
        asideItems: [
            {name: '매입부가세', link: 'pvat'},
            {name: '매출부가세', link: 'svat'},
            {name: '조달및수익계약정산', link: 'pset'},
            {name: '카드결제내역', link: 'card'},
            {name: '지출증빙', link: 'proof'}
        ]
    },
    board: {
        asideTitle: '사내게시판',
        asideItems: [{name: '사내게시판', link: 'board'}]
    },
    schedule: {
        asideTitle: '내일정관리',
        asideItems: [
            {name: '내 일정', link: 'schedule'},
        ]
    }
}

export const AsideKeyOfValues = {
    "receipt": "전표입력",
    "task-estimate": "견적서관리",
    "remain": "미수/미지급현황",
    "official": "관리비관리",
    "customer": "거래처관리",
    "customer-cate": "분류관리",
    "stock": "품목/재곡 관리",
    "stock/cate": "분류관리",
    "point": "구매적립금설정",
    "ledger-customer": "거래처별원장출력",
    "ledger-customers": "복수거래처원장출력",
    "ledger-stock": "품목별원장출력",
    "ledger-sales": "매출장 출력",
    "ledger-purchase": "매입장 출력",
    "ledger-official": "관리비 원장출력",
    "ledger-stock-count": "재고조사서",
    "ledger-etc": "기타원장",
    "company": "회사정보",
    "staff": "사원관리",
    "category": "부서관리",
    "task": "업무관리",
    "admin": "관리자데이터조회",
    "estimate": "견적서관리",
    "bills": "세금계산서",
    "deposit": "입금표",
    "board": "사내게시판",
    "pvat": "매입부가세",
    "svat": "매출부가세",
    "pset": "조달및수익계약정산",
    "card": "카드결제내역",
    "proof": "지출증빙",
    "schedule": "내 일정"
}
