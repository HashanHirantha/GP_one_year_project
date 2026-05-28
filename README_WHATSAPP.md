# 🟢 Setting Up Real WhatsApp Alerts for Price Drops

This project features an **Automated WhatsApp Notification Gateway** that alerts subscribed users instantly when a property's price drops. It uses `whatsapp-web.js` and `qrcode-terminal` to establish a direct connection to a WhatsApp account.

---

## 🛠️ How It Works

1. **Automatic Subscription (Web)**: A user navigates to a property details page, clicks **"Get Price Drop Alerts"**, enters their WhatsApp phone number (e.g., `0771234567`), and subscribes.
2. **Direct WhatsApp Subscription**: Alternatively, users can send a WhatsApp message to your connected number containing:
   `Subscribe to price drop alerts for property [property_id]`
   The backend will parse it, automatically register their number in the database, and reply with a WhatsApp message confirming their subscription!
3. **Price Drops**: The property owner or an admin edits a property and lowers the price.
4. **WhatsApp Delivery**: The backend normalizes the phone number (e.g. `0771234567` ➔ `94771234567@c.us`) and automatically sends a WhatsApp message to the subscriber using your connected WhatsApp session.

---

## 💻 How to Run the Project

You must run both the **Vite Frontend** and the **Notification Backend Server** simultaneously.

### 1. Install Backend Dependencies
Run the following command to install `whatsapp-web.js` and its required terminal QR rendering engine:
```bash
npm install
```

### 2. Run the WhatsApp Backend Server
In your terminal, start the notification backend server on port `3001`:
```bash
npm run server
```
* **First-time Setup (QR Scan)**: The server will display a QR code directly in the terminal:
  ```text
  🚀 Initializing WhatsApp Web Client...
  
  📱 ACTION REQUIRED: Scan the QR code below to connect your WhatsApp account:
  [ ... QR CODE ... ]
  ```
* Open WhatsApp on your phone, go to **Settings** ➔ **Linked Devices** ➔ **Link a Device**, and scan the QR code in the terminal.
* Once scanned, you'll see:
  ```text
  ✅ WhatsApp Web Client is ready! You can now send automatic notifications.
  ```
* **Session Persistence**: The connection session is saved locally in `./.wwebjs_auth`. The next time you start the server, it will log in **automatically** without requiring you to scan the QR code again!

### 3. Run the Frontend App
In a separate terminal window, start the frontend Vite server:
```bash
npm run dev
```

---

## 🧪 How to Test Your Setup

1. Open the application in your browser and log in.
2. Navigate to a property details page.
3. Click **"Get Price Drop Alerts"**.
4. Enter your real WhatsApp-enabled phone number (e.g. `0771234567`) and subscribe.
5. Log in as the property owner or admin, navigate to **"Edit Property"**, reduce the price, and click **"Save Changes"**.
6. Check your WhatsApp app! You will receive a direct WhatsApp message saying:
   > *Price Drop Alert! [Property Title] dropped to Rs. [New Price].*
7. Monitor your terminal for detailed logs displaying the incoming request, normalization, and successful message ID delivery.
