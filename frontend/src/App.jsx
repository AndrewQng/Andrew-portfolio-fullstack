import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    // Bọn AuthProvider đã bọc ở ngoài main.jsx rồi
    // Giờ App chỉ cần gọi bộ Routes ra là xong
    <AppRoutes />
  );
}

export default App;