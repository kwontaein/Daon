import React, {useState} from "react";
import axios from "axios";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "이메일을 입력하세요.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "유효한 이메일 형식이 아닙니다.";
        }

        if (!formData.password) {
            newErrors.password = "비밀번호를 입력하세요.";
        } else if (formData.password.length < 6) {
            newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError(""); // 서버 오류 초기화
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                // 서버로 데이터 전송
                const response = await axios.post("api/test", {
                    email: formData.email,
                    password: formData.password,
                });
                console.log("서버 응답:", response.data);
                setSubmitted(true);
            } catch (error) {
                console.error("서버 오류:", error);
                setServerError(
                    error.response?.data?.message || "서버와 연결할 수 없습니다."
                );
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>이메일:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errors.email && <p style={styles.error}>{errors.email}</p>}
                </div>

                <div style={styles.inputGroup}>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errors.password && <p style={styles.error}>{errors.password}</p>}
                </div>

                <div style={styles.inputGroup}>
                    <label>비밀번호 확인:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errors.confirmPassword && (
                        <p style={styles.error}>{errors.confirmPassword}</p>
                    )}
                </div>

                <button type="submit" style={styles.button}>
                    회원가입
                </button>
            </form>

            {serverError && <p style={styles.error}>{serverError}</p>}
            {submitted && (
                <p style={styles.success}>회원가입이 성공적으로 완료되었습니다!</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        width: "300px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    inputGroup: {
        marginBottom: "15px",
    },
    input: {
        padding: "8px",
        marginTop: "5px",
        border: "1px solid #ddd",
        borderRadius: "4px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontSize: "12px",
    },
    success: {
        color: "green",
        fontSize: "14px",
    },
};

export default SignupForm;
