'use client';

/*import {exportToExcel} from './excel';
import EstimateDocument from "@/public/daonDocu";
import DaonDocu from "@/public/daonDocu";*/
import BarunDocu from "@/public/docu/docuReact/BarunDocu";
import HwasungDocu from "@/public/docu/docuReact/hwasungDocu";
import MeyunginDocu from "@/public/docu/docuReact/meyunginDocu";
import JaccDocu from "@/public/docu/docuReact/jaccDocu";

const TaskExcelDownload = () => {
    /*  const estimateData = {
       estimateDate: '2025-05-20',
       busiNum: '123-45-67890',
       companyName: '다온테크',
       customerName: '홍길동',
       ceoName: '김대표',
       addr: '서울시 강남구 테헤란로 123',
       numberTotalPrice: '1,320,000',
       hangulTotalPrice: '(일백삼십이만원)',
       stockList: [
           {name: '노트북', standard: 'i7 / 16GB', ea: 2, unitPrice: '600,000', totalPrice: '1,200,000', note: '삼성'},
           {name: '마우스', standard: '무선', ea: 2, unitPrice: '60,000', totalPrice: '120,000', note: ''},
       ],
       totalPrice: '1,320,000',
       companyTel: '02-1234-5678',
       companyFax: '02-5678-1234'
   };

         return <DaonDocu data={estimateData}/>;
    */


    /*  const sampleItems = [
          {
              stockName: "상품A",
              stockStandard: "규격1",
              stockEa: 10,
              stockUnitPrice: "5,000",
              stockTotalPrice: "50,000",
              note: "",
          },
          {
              stockName: "상품B",
              stockStandard: "규격2",
              stockEa: 3,
              stockUnitPrice: "12,000",
              stockTotalPrice: "36,000",
              note: "비고내용",
          },
          // ... 더 추가 가능
      ];
      return <HwasungDocu
          estimateDate="2025-05-20"
          customerName="홍길동"
          busiNum="123-45-67890"
          companyName="화성상사"
          ceoName="홍문선"
          addr="서울시 강남구 테헤란로 123"
          items={sampleItems}
          totalPrice="86,000"
          hangulTotalPrice="팔만육천원"
          companyTel="02-1234-5678"
          companyFax="02-8765-4321"
      />
  */
    /* const estimateData = {
         customerName: "홍길동",
         estimateDate: "2025-05-20",
         busiNum: "123-45-67890",
         companyName: "ABC전자",
         ceoName: "김대표",
         addr: "서울시 강남구 테헤란로 123",
         companyTel: "02-123-4567",
         companyFax: "02-987-6543",
         numberTotalPrice: "1,100,000",
         items: [
             {
                 name: "노트북",
                 standard: "i7/16GB",
                 quantity: 2,
                 unitPrice: 500000,
                 totalPrice: 1000000,
                 note: ""
             },
             {
                 name: "마우스",
                 standard: "무선",
                 quantity: 1,
                 unitPrice: 100000,
                 totalPrice: 100000,
                 note: "서비스"
             }
         ]
     };

     return <MeyunginDocu data={estimateData}/>*/

    const estimateData = {
        estimateDate: "2025-05-20",
        customerName: "홍길동",
        busiNum: "123-45-67890",
        companyName: "홍문테크",
        ceoName: "홍문선",
        addr: "서울특별시 중구 세종대로 123",
        hangulTotalPrice: "금이십만원정",
        items: [
            {
                name: "삼성 레이저 프린터",
                standard: "SL-M2020",
                ea: 2,
                unitPrice: "100,000",
                totalPrice: "200,000",
                note: "",
            },
        ],
        totalPrice: "200,000",
        companyTel: "02-1234-5678",
        companyFax: "02-9876-5432",
    };
    return <JaccDocu
        estimateDate={estimateData.estimateDate}
        customerName={estimateData.customerName}
        busiNum={estimateData.busiNum}
        companyName={estimateData.companyName}
        ceoName={estimateData.ceoName}
        addr={estimateData.addr}
        hangulTotalPrice={estimateData.hangulTotalPrice}
        items={estimateData.items}
        totalPrice={estimateData.totalPrice}
        companyTel={estimateData.companyTel}
        companyFax={estimateData.companyFax}
    />

};

export default TaskExcelDownload;