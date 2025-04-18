
export const AsideOptions = {
    sales: {
        asideTitle: '판매회계',
        asideItems: [
            {name: '전표입력', link: 'receipt'},
            {name: '업무관리', link: 'task'},
            {name: '관리자데이터조회', link: 'admin'},
            {name: '견적서관리', link: 'estimate'},
            {name: '견적서관리 [업무]', link: 'task-estimate'},
            {name: '미수/미지급현황', link: 'remain'},
            {name: '관리비관리', link: 'official'}]
    },
    customer: {
        asideTitle: '고객관리',
        asideItems: [
            {name: '거래처관리', link: 'customer'},
            {name: '소속관리', link: 'affiliation'}]
    },
    stock: {
        asideTitle: '품목/재고',
        asideItems: [
            {name: '품목/재고 관리', link: 'stock'},
            {name: '분류관리', link: 'stock-cate'},
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
            {name: '사원관리', link: 'employee'},
            {name: '부서관리', link: 'dept'}
        ]
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
    },
}

export const AsideKeyOfValues= Object.values(AsideOptions).reduce((acc, category) => {
    category.asideItems.forEach(({ name, link }) => {
        acc[link] = name;
    });
    return acc;
}, {} as Record<string, string>);