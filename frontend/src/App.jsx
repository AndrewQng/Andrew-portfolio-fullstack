import { useContext } from "react";
// Đảm bảo import đúng đuôi .jsx
import { AuthContext } from "./context/AuthContext.jsx"; 
import Login from "./pages/Login.jsx";
import UsersPage from "./pages/UsersPage.jsx"; // Nhớ tạo file này nếu chưa có nhé

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {/* Nếu chưa đăng nhập thì hiện Login, có rồi thì hiện trang Admin */}
      {!user ? <Login /> : <UsersPage />}
    </div>
  );
}

// DÒNG NÀY LÀ QUAN TRỌNG NHẤT ĐỂ FIX LỖI CỦA ÔNG:
export default App;