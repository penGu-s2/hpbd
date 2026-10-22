# 🎂 Trang Chúc Mừng Sinh Nhật Dành Riêng Cho Dân IT

Một trang web chúc mừng sinh nhật nhẹ nhàng, tinh tế và lịch sự dành cho crush. Không mang tính chất thư tình quá đà, tập trung vào trải nghiệm mượt mà:
- 🕯️ **Bánh kem tương tác**: Chạm vào ngọn nến để thổi, nến tắt có khói bay và pháo hoa giấy confetti bung nở.
- 🎵 **Nhạc nền Lofi / Acoustic**: Tự động phát khi nhấn mở quà, có nút đĩa quay bật/tắt ở góc màn hình.
- 💌 **Lời chúc ấm áp & lịch thiệp**: Hiển thị sau khi thổi nến, mang lại cảm giác dễ thương và ý nghĩa.
- 📱 **Responsive**: Hiển thị hoàn hảo trên cả điện thoại (iPhone, Android) và màn hình máy tính.

---

## 🚀 1. Cách mở xem thử ngay lập tức

- Bạn chỉ cần nhấp đúp vào file `index.html` trong thư mục này để mở trên trình duyệt (Chrome, Edge, Firefox, Safari...).

---

## ⚙️ 2. Cách đổi Tên và Lời Chúc

### Cách 1: Truyền tên qua URL (Cực kỳ tiện)
Sau khi đưa trang web lên mạng, bạn chỉ cần gửi link kèm tên:
```text
https://link-cua-ban.vercel.app/?name=Mai+Anh
```
Trang sẽ tự động hiển thị: **"Happy Birthday, Mai Anh! 🎂"**

### Cách 2: Sửa trực tiếp trong code
Mở file `script.js`, ngay ở đầu file:
```javascript
const CONFIG = {
  // Thay đổi tên crush ở đây:
  crushName: "Mai Anh",

  // Thay đổi lời chúc ở đây:
  wishMessage: `Chúc bạn một ngày sinh nhật thật ấm áp, vui vẻ...`
};
```

---

## 🎵 3. Cách đổi bài nhạc nền theo ý thích
Mở file `index.html`, tìm thẻ `<audio id="bgMusic">`:
```html
<audio id="bgMusic" loop preload="auto">
  <!-- Thay link bài hát mp3 của bạn vào thuộc tính src dưới đây -->
  <source src="link-bai-hat.mp3" type="audio/mpeg">
</audio>
```
> Bạn có thể tải file nhạc `.mp3` để chung vào thư mục này, ví dụ `music.mp3` rồi đổi thành `src="music.mp3"`.

---

## 🌐 4. Cách đưa trang web lên mạng để gửi link cho Crush (Miễn phí 100%)

Là dân IT, bạn có nhiều cách siêu nhanh:

### Cách nhanh nhất không cần gõ lệnh (1 phút): **Netlify Drop**
1. Truy cập: [https://app.netlify.com/drop](https://app.netlify.com/drop) (đăng nhập bằng GitHub).
2. Kéo toàn bộ thư mục `HPBD` thả vào khung trình duyệt.
3. Netlify sẽ cấp ngay một đường link HTTPS (ví dụ: `https://happy-birthday-abc.netlify.app`).

### Cách chuyên nghiệp: **GitHub Pages**
1. Tạo một repository mới trên GitHub (ví dụ: `hpbd-crush`).
2. Đẩy toàn bộ code trong thư mục này lên GitHub:
   ```bash
   git init
   git add .
   git commit -m "Happy Birthday"
   git branch -M main
   git remote add origin https://github.com/<username>/hpbd-crush.git
   git push -u origin main
   ```
3. Vào **Settings** của Repo > chọn mục **Pages** > tại **Branch** chọn `main` rồi nhấn **Save**.
4. Sau 1 phút bạn sẽ có link: `https://<username>.github.io/hpbd-crush/?name=TenCrush`.

### Cách xịn xò: **Vercel**
- Chạy lệnh `npx vercel` ngay trong thư mục này, bấm Enter vài lần là có link tức thì!
