'use client';

import {exportToExcel} from './excel';

const TaskExcelDownload = () => {
    const handleDownload = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getTasks`, {
                credentials: 'include',
            }); // 백엔드 API
            if (!res.ok) throw new Error('데이터 불러오기 실패');

            const data = await res.json();
            exportToExcel(data, 'tasks');
        } catch (err) {
            console.error('엑셀 다운로드 에러:', err);
        }
    };

    return (
        <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
            엑셀 다운로드
        </button>
    );
};

export default TaskExcelDownload;