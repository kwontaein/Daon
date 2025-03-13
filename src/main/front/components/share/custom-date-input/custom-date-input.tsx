'use client'
import dayjs from 'dayjs';
import './custom-date-input.scss';
import { RefObject, useMemo, useRef, useState } from 'react';

export default function CustomDateInput({ defaultValue, name, className , dateRef}: {
    defaultValue: Date,
    name: string,
    className?: string,
    dateRef?: RefObject<HTMLInputElement>
}) {
    const initialDate = useMemo(() => dayjs(defaultValue).format('YYYY-MM-DD'), [defaultValue]);
    const [date, setDate] = useState<string>(initialDate);

    const monthInputRef = useRef<HTMLInputElement>(null);
    const dayInputRef = useRef<HTMLInputElement>(null);

    const updateDate = (year: string, month: string, day: string) => {
        setDate(`${year}-${month}-${day}`);
    };

    const dateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };
    

    const yearHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.padStart(4,'0').slice(-4)
        if(e.target.value.length >=5 && e.target.value[0] !=='0'){
            value =e.target.value.slice(0,4)
        }
        updateDate(value, date.split('-')[1], date.split('-')[2]);
        if(value.split('')[0]!=='0'){
            monthInputRef.current.focus();
        }
        
    };

    const monthHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.padStart(2,'0').slice(-2)
        if (Number(value) > 12) value = "12"; // 12 이상 제한
        
        updateDate(date.split('-')[0], value, date.split('-')[2]);
        if(value.split('')[0]!=='0'){
            dayInputRef.current.focus();
        }
    };

    const dayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.padStart(2, '0').slice(-2);
        
        // 값이 31을 초과하면 31로 제한
        if (Number(value) > 31) value = "31";
    
        const month = date.split('-')[1];
        const year = date.split('-')[0];
    
        // 윤년 계산
        const isLeapYear = (year: number) => {
            return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
        };
    
        // 2월의 날짜 제한
        if (month === "02") {
            const maxDay = isLeapYear(Number(year)) ? 29 : 28;
            if (Number(value) > maxDay) value = String(maxDay).padStart(2, '0');
        }
    
        // 4월, 6월, 9월, 11월의 날짜 제한
        if (["04", "06", "09", "11"].includes(month)) {
            if (Number(value) > 30) value = "30";
        }
    
        updateDate(date.split('-')[0], date.split('-')[1], value);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select(); // 포커스 시 텍스트 선택
      };
    return (
        <label className={`custom-date-container ${className}`}>
            <div className="date-container">
                <label>
                    <input className="custom-year" type="number" value={date.split('-')[0]} maxLength={4} onChange={yearHandler} onFocus={handleFocus} />
                    년
                </label>
                <label>
                    <input ref={monthInputRef} className="custom-month" type="number" value={date.split('-')[1]} onChange={monthHandler} onFocus={handleFocus}/>
                    월
                </label>
                <label>
                    <input ref={dayInputRef} className="custom-day" type="number" value={date.split('-')[2]} onChange={dayHandler} onFocus={handleFocus}/>
                    일
                </label>
            </div>
            <input ref={dateRef} className="custom-date" type="date" name={name} value={date} onChange={dateHandler} key={date} />
        </label>
    );
}
