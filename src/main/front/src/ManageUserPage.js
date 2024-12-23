import {useLocation} from 'react-router-dom';
import {useState} from "react";

export const ManageUserPage = () => {
    const location = useLocation();
    const [user, setUser] = useState(location.state?.user || {});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };

    const handleSave = () => {
        console.log("저장된 데이터:", user);
        alert("저장되었습니다.");
    };

    return (
        <div className="user-edit-page">
            <h1>Edit User</h1>
            <form>
                {Object.keys(user).map((key) => (
                    <div key={key} className="form-group">
                        <label>{key}</label>
                        <input
                            type="text"
                            name={key}
                            value={user[key]}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};
