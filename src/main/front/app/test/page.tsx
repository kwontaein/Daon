"use client";  // 최상단에 추가
import '@/styles/_global.scss';
import axios from "axios";
import {ReceiptCategory} from "@/model/types/sales/receipt/type";

export default async function TestPage() {

    /**
     * 테스트
     */

    /*
    const response = await axios.post("http://localhost:8080/api/estimatesPaid",);
     console.log("서버 요청 결과:", response.data);*/
    async function test() {
        try {
            const response = await axios.post('http://localhost:8080/api/estimatesPaid', {
                estimateId: 'f9dac47d-a883-489e-b687-9e62e9c9a1a5',
            });
            console.log('성공:', response.data);
        } catch (error) {
            console.log('에러 발생:', error);
        }
    }

    async function testCreateReceipt() {
        // 전송할 요청 바디 예시
        const requestBody = {
            receiptId: 'd92cc9eb-95ee-4ab8-8716-953b556ee371',   // 전표 아이디 (UUID)
            estimateId: '1e2ee6de-5c76-4c9e-ae85-13de6f208c0a',  // 견적서 아이디 (UUID)
            timeStamp: '2025-03-01T10:30:00',                   // 전표 등록일, ISO datetime 문자열 예시
            category: 'SALES',                                  // 전표 분류 (ENUM: e.g. SALES, PURCHASE 등)
            customerId: '906f5020-8c63-4aec-9096-40b287b39bb3',  // 고객 아이디 (UUID)
            itemNumber: 'a10eecab-bd7e-4fb1-bb12-10966a228af5',  // 품목 번호 (UUID)
            quantity: 5,                                        // 사용 품목 수량
            totalPrice: 30000,                                  // 품목 총 가격
            description: '전표 설명 예시',                        // 적요

            // 추가 필드
            searchSDate: '2025-03-01',     // 검색 날짜 시작일
            searchEDate: '2025-03-31',     // 검색 날짜 종료일
            ids: [
                'fc4dd4b1-b610-4a88-b3b9-8bed4285f663',
                '5b18c745-0f93-4d67-9eb1-023e8ef41472',
            ],                             // 여러 개 아이디
            customerName: '홍길동',
            itemName: '테스트 품목',
        };

        try {
            const response = await axios.post('http://localhost:8080/api/saveReceipts', requestBody);
            console.log('성공적으로 전송했습니다:', response.data);
        } catch (error) {
            console.error('전송 중 오류 발생:', error);
        }
    }

    async function testEstimateRequest() {
        try {
            const response = await axios.post('http://localhost:8080/api/updateEstimate', {
                estimateId: 'f9dac47d-a883-489e-b687-9e62e9c9a1a5',
                customerId: '8aba6cda-de15-11ef-9723-d8bbc19e908c',
                estimateDate: '2025-02-18T12:00:00',
                totalAmount: 10000.50,
                items: [
                    {
                        // EstimateItemRequest 예시
                        itemId: null,
                        productName: "테스트 상품2",
                        quantity: 6,
                        unitPrice: 1500
                    }
                ],
                searchSDate: '2025-01-01',
                searchEDate: '2025-12-31',
                companyName: '화성사업자',
                customerName: '테스트 고객',
                itemName: '상품검색용 키워드',
                receipted: false
            });
            console.log('성공:', response.data);
        } catch (error) {
            console.log('에러 발생:', error);
        }
    }

    async function createStock() {
        // 전송할 데이터 (예시)
        const stockData = {
            // stockId: 'a3f36c9f3-174a-4a43-b58f-6d2cdf60f5da',  // 예시 UUID
            name: '샘플품목',
            quantity: 100,
            inPrice: 2500.5,
            outPrice: 3000.0,
            modelName: 'MODEL-1234',
            category: '8ad6affe-de05-11ef-9723-d8bbc19e908c',  // 카테고리 UUID
            taxation: 'TAXATION',  // 예시: 과세 or 면세 (enum 형태일 경우 서버 스펙에 맞게 조정)
            note: '이 품목은 테스트용 메모입니다.',
            stockUseEa: true,  // 재고 관리 여부
            keyWord: '샘플,테스트',  // 키워드
            remain: true,  // 재고 있는 품목만 검색할 때 사용 (검색 조건에 따라 달라짐)
            receiptCategory: 'DEPOSIT',  // "관리비"에 해당하는 enum 또는 문자열
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/api/saveStock', // 실제 API 주소로 변경
                stockData
            );
            console.log('등록 성공:', response.data);
        } catch (error) {
            console.error('등록 실패:', error);
        }
    }

    async function updateStock() {
        // 전송할 데이터 (예시)
        const stockData = {
            stockId: '7484b411-909e-4886-8f0d-01b211131932',  // 예시 UUID
            name: '샘플품목2',
            quantity: 100,
            inPrice: 2500.5,
            outPrice: 3000.0,
            modelName: 'MODEL-1234',
            category: '8ad6affe-de05-11ef-9723-d8bbc19e908c',  // 카테고리 UUID
            taxation: 'TAXATION',  // 예시: 과세 or 면세 (enum 형태일 경우 서버 스펙에 맞게 조정)
            note: '이 품목은 테스트용 메모입니다.',
            stockUseEa: true,  // 재고 관리 여부
            keyWord: '샘플,테스트',  // 키워드
            remain: true,  // 재고 있는 품목만 검색할 때 사용 (검색 조건에 따라 달라짐)
            receiptCategory: 'DEPOSIT',  // "관리비"에 해당하는 enum 또는 문자열
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/api/updateStock', // 실제 API 주소로 변경
                stockData
            );
            console.log('등록 성공:', response.data);
        } catch (error) {
            console.error('등록 실패:', error);
        }
    }

    async function getStock() {
        // 전송할 데이터 (예시)
        const stockData = {
            // stockId: 'a3f36c9f3-174a-4a43-b58f-6d2cdf60f5da',  // 예시 UUID
            name: '임시품목',
            quantity: 100,
            inPrice: 2500,
            outPrice: 3000,
            modelName: 'MODEL-1234',
            category: '8ad6affe-de05-11ef-9723-d8bbc19e908c',  // 카테고리 UUID
            taxation: 'TAXATION',  // 예시: 과세 or 면세 (enum 형태일 경우 서버 스펙에 맞게 조정)
            note: '이 품목은 테스트용 메모입니다.',
            stockUseEa: true,  // 재고 관리 여부
            keyWord: '샘플,테스트',  // 키워드
            remain: false,  // 재고 있는 품목만 검색할 때 사용 (검색 조건에 따라 달라짐)
            receiptCategory: 'DEPOSIT',  // "관리비"에 해당하는 enum 또는 문자열
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/api/getStockList', // 실제 API 주소로 변경
                stockData
            );
            console.log('등록 성공:', response.data);
        } catch (error) {
            console.error('등록 실패:', error);
        }
    }

    async function deleteStock() {
        // 전송할 데이터 (예시)
        const stockData = {
            stockId: '7484b411-909e-4886-8f0d-01b211131932',  // 예시 UUID
        };
        try {
            const response = await axios.post(
                'http://localhost:8080/api/deleteStock', // 실제 API 주소로 변경
                stockData
            );
            console.log('등록 성공:', response.data);
        } catch (error) {
            console.error('등록 실패:', error);
        }
    }

    async function getStockCate() {
        // 전송할 데이터 (예시)

        try {
            const response = await axios.get(
                'http://localhost:8080/api/getStockCateList', // 실제 API 주소로 변경
            );
            console.log('등록 성공:', response.data);
        } catch (error) {
            console.error('등록 실패:', error);
        }
    }

    async function saveStockCate() {
        // 전송할 데이터 (예시)
        const stockCate = {
            stockCateName: '테스트분류2',
            cateKey: 'EXX',
        };
        try {
            const response = await axios.post(
                'http://localhost:8080/api/saveStockCate', // 실제 API 주소로 변경
                stockCate
            );
            console.log('등록 성공:', response.data);
        } catch (error) {
            console.error('등록 실패:', error);
        }
    }

    async function updateStockCate() {
        // 전송할 데이터 (예시)
        const stockCate = {
            stockCateId: '42e55dad-ea16-48d1-ac5a-23d9736535a6',
            stockCateName: '테스트분류',
            cateKey: 'EX',
        };
        try {
            const response = await axios.post(
                'http://localhost:8080/api/updateStockCate', // 실제 API 주소로 변경
                stockCate
            );
            console.log('등록 성공:', response.data);
        } catch (error) {
            console.error('등록 실패:', error);
        }
    }

    async function createUser() {
        try {
            // 전송할 데이터 객체 생성
            const userData = {
                id: '홍길동',
                password: 'password',
                married: true,
                joinDate: '2025-02-21T10:00:00',  // Timestamp 예: 'YYYY-MM-DDTHH:mm:ss'
                birthday: '2025-02-21T00:00:00',
                name: '홍길동',
                engName: 'Hong Gil Dong',
                chName: '洪吉同',
                zipcode: '12345',
                address: '서울특별시 종로구',
                addressDetail: '1번지',
                tel: '02-000-0000',
                phone: '010-0000-0000',
                email: 'test@example.com',
                memo: '가입 테스트',
                userClass: 'STAFF', // 예: enum 값
                userRole: 'MANAGER',    // 예: enum 값
                position: 'WEB'   // 예: enum 값
            };

            // POST 요청
            const response = await axios.post('http://localhost:8080/api/saveEmployee', userData);

            // 요청 성공 시 처리
            console.log('서버 응답:', response.data);
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    }

    async function updateUser() {
        try {
            // 전송할 데이터 객체 생성
            const userData = {
                id: '홍길동',
                password: 'password',
                married: true,
                joinDate: '2025-02-21T10:00:00',  // Timestamp 예: 'YYYY-MM-DDTHH:mm:ss'
                birthday: '2025-02-21T00:00:00',
                name: '홍길동2',
                engName: 'Hong Gil Dong',
                chName: '洪吉同',
                zipcode: '12345',
                address: '서울특별시 종로구',
                addressDetail: '1번지',
                tel: '02-000-0000',
                phone: '010-0000-0000',
                email: 'test@example.com',
                memo: '가입 테스트',
                userClass: 'STAFF', // 예: enum 값
                userRole: 'MANAGER',    // 예: enum 값
                dept: '0x9FD4AD75F40C11EFA0E0D8BBC19E908C'   // 예: enum 값
            };

            // POST 요청
            const response = await axios.post('http://localhost:8080/api/UpdateEmployee', userData);

            // 요청 성공 시 처리
            console.log('서버 응답:', response.data);
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    }

    async function getCompany() {
        // 전송할 데이터 (예시)

        try {
            const response = await axios.get(
                'http://localhost:8080/api/getCompany', // 실제 API 주소로 변경
            );
            console.log('등록 성공:', response.data);
        } catch (error) {
            console.error('등록 실패:', error);
        }
    }


    async function getReceipts() {
        // 전송할 데이터 (예시)
        const receipts = {
            category: ReceiptCategory.EX,
            searchSDate: null,
            searchEDate: null,
            customerId: null,
            stockId: null,
        };
        try {
            const response = await axios.post(
                'http://localhost:8080/api/getReceipts' // 실제 API 주소로 변경
                , receipts
            );
            console.log('등록 성공:', response.data);
        } catch (error) {
            console.error('등록 실패:', error);
        }
    }

    async function getEstimates() {
        // 전송할 데이터 (예시)
        const receipts = {
            category: ReceiptCategory.EX,
            searchSDate: null,
            searchEDate: null,
            customerName: null,
            productName: null,
            task: false,
            condition: false,
        };
        try {
            const response = await axios.post(
                'http://localhost:8080/api/getEstimates' // 실제 API 주소로 변경
                , receipts
            );
            console.log('조회 성공:', response.data);
        } catch (error) {
            console.error('등록 실패:', error);
        }
    }

    async function getEstimate() {
        // 전송할 데이터 (예시)
        const receipts = {
            estimateId: 'bca47abc-c853-4897-9a2f-22c2a24e672d',
        };
        try {
            const response = await axios.post(
                'http://localhost:8080/api/getEstimate' // 실제 API 주소로 변경
                , receipts
            );
            console.log('조회 성공:', response.data);
        } catch (error) {
            console.error('등록 실패:', error);
        }
    }

    async function toReceipt() {
        // 전송할 데이터 (예시)
        const receipts = {
            estimateId: 'bca47abc-c853-4897-9a2f-22c2a24e672d',
        };
        try {
            const response = await axios.post(
                'http://localhost:8080/api/estimatesPaid' // 실제 API 주소로 변경
                , receipts
            );
            console.log('조회 성공:', response.data);
        } catch (error) {
            console.error('등록 실패:', error);
        }
    }

    return (
        <div>
            <div>테스트용 페이지</div>
            <div>
                <button onClick={testEstimateRequest}>견적서입력 테스트</button>
            </div>
            <hr/>
            <div>
                <button onClick={createUser}>유저 가입 테스트</button>
            </div>
            <div>
                <button onClick={updateUser}>유저 수정 테스트</button>
            </div>
            <hr/>
            <div>
                <button onClick={testCreateReceipt}>전표입력 테스트</button>
            </div>
            <hr/>
            <div>
                <button onClick={createStock}>품목저장 테스트</button>
            </div>
            <div>
                <button onClick={updateStock}>품목수정 테스트</button>
            </div>
            <div>
                <button onClick={getStock}>품목리스트</button>
            </div>
            <div>
                <button onClick={deleteStock}>품목삭제</button>
            </div>
            <hr/>
            <div>
                <button onClick={getStockCate}>품목분류 조회</button>
            </div>
            <div>
                <button onClick={saveStockCate}>품목분류 생성</button>
            </div>
            <div>
                <button onClick={updateStockCate}>품목분류 수정</button>
            </div>
            <hr/>
            <div>
                <button onClick={getCompany}>회사목록 조회</button>
            </div>
            <div>
                <button onClick={saveStockCate}>회사목록 생성</button>
            </div>
            <div>
                <button onClick={updateStockCate}>회사목록 수정</button>
            </div>
            <div>
                <button onClick={getReceipts}>전표조회</button>
            </div>
            <hr/>
            <div>
                <button onClick={getEstimates}>견적서조회</button>
            </div>
            <div>
                <button onClick={getEstimate}>견적서조회1</button>
            </div>
            <hr/>
            <div>
                <button onClick={toReceipt}>전표화</button>
            </div>
        </div>
    );
}