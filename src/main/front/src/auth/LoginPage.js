import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function LoginPage() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 간단한 폼 검증
        if (!id || !password) {
            setError("모든 필드를 입력해주세요.");
            return;
        }

        setServerError(""); // 서버 오류 초기화
        try {
            // 서버로 데이터 전송
            const response = await axios.post("api/SignIn", {
                id: id,
                password: password,
            });
            console.log("서버 응답:", response.data);
        } catch (error) {
            console.error("서버 오류:", error);
            setServerError(
                error.response?.data?.message || "서버와 연결할 수 없습니다."
            );
        }

    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>로그인</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                {error && <p style={styles.error}>{error}</p>}
                <input
                    style={styles.input}
                    type="id"
                    placeholder="이메일"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    style={styles.input}
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button style={styles.button} type="submit">
                    로그인
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
    },
    input: {
        padding: "10px",
        marginBottom: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ddd",
    },
    button: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginBottom: "10px",
        fontSize: "14px",
    },
};

export default LoginPage;
