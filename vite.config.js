// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   host: "0.0.0.0", // lắng nghe tất cả interface -> truy cập từ LAN được
  //   port: 2402, // thay nếu muốn dùng port khác
  //   strictPort: false, // nếu port bận sẽ thử port khác
  //   // Nếu muốn HMR hoạt động ổn định trên LAN, bật cấu hình hmr bên dưới
  //   hmr: {
  //     protocol: "ws",
  //     // host: "192.168.1.42", // (tùy) hoặc để vite tự xử lý
  //     // port: 5173
  //   },
  // },
});
