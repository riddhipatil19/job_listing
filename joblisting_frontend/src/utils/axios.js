import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api", // ✅ adjust if backend uses a different prefix
    withCredentials: true, // ✅ optional: include cookies in requests (useful for auth)
});

export default instance;
