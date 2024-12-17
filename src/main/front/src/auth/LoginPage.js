import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 간단한 폼 검증
        if (!email || !password) {
            setError("모든 필드를 입력해주세요.");
            return;
        }

        // 간단한 로그인 로직 (추후 백엔드 연동 필요)
        if (email === "admin@example.com" && password === "password") {
            navigate("/dashboard"); // 대시보드로 이동
        } else {
            setError("이메일 또는 비밀번호가 잘못되었습니다.");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>로그인</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                {error && <p style={styles.error}>{error}</p>}
                <input
                    style={styles.input}
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
