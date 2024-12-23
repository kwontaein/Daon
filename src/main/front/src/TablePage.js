import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import './TablePage.css'; // 스타일링 파일 연결

export const TablePage = () => {
    const navigate = useNavigate();
    const tableData = [
        {
            id: 1,
            password: "******",
            address: "123 Main St",
            address_detail: "Apt 4B",
            name: "홍길동",
            eng_name: "John Doe",
            ch_name: "홍길동",
            email: "example1@gmail.com",
            join_date: "2022-01-15",
            birthday: "1990-01-01",
            married: "Yes",
            memo: "New user",
            tel: "123-456-7890",
            phone: "010-1234-5678",
            user_class: "VIP",
            user_role: "Admin",
            position: "Manager",
            zipcode: "12345"
        },
        // 추가 데이터 항목을 여기에 입력
    ];

    const handleManageClick = (user) => {
        navigate(`/manage/${user.id}`, {state: {user}});
    };

    return (
        <div className="table-container">
            <h1>User Table</h1>
            <table className="user-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Chinese Name</th>
                    <th>English Name</th>
                    <th>Email</th>
                    <th>Tel</th>
                    <th>Phone</th>
                    <th>User Class</th>
                    <th>User Role</th>
                    <th>Position</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((row) => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.ch_name}</td>
                        <td>{row.eng_name}</td>
                        <td>{row.email}</td>
                        <td>{row.tel}</td>
                        <td>{row.phone}</td>
                        <td>{row.user_class}</td>
                        <td>{row.user_role}</td>
                        <td>{row.position}</td>
                        <td>
                            <button onClick={() => handleManageClick(row)}>Manage</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};