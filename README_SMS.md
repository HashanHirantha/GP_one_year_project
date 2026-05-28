# 🚀 Setting Up Real SMS Alerts for Price Drops

This project includes a **Real SMS alerting system** that notifies subscribed users instantly when a property's price drops. Follow this step-by-step guide to configure and run the SMS gateway using **Twilio**.

---

## 🛠️ How It Works

1. **Subscribe**: A user visits a property details page, clicks **"Get Price Drop Alerts"**, enters their mobile number (e.g. `0769700721`), and subscribes.
2. **Price Drop**: The property owner or an admin edits the property and reduces the price.
3. **SMS Trigger**: The system fetches the subscriber list and triggers an SMS request to the local backend gateway (`http://localhost:3001/api/send-sms`).
4. **Normalization & Delivery**: The backend normalizes the phone number (e.g., converts `0769700721` to E.164 standard `+94769700721`) and invokes the Twilio API to deliver the real SMS message instantly.

---

## 🔑 Step 1: Set Up Twilio Credentials

To send real SMS alerts, you must connect a Twilio account.

1. **Sign Up**: Create a free account at [Twilio](https://www.twilio.com/).
2. **Retrieve Credentials**: Go to your [Twilio Console Dashboard](https://console.twilio.com/) and locate your:
   - **Account SID**
   - **Auth Token**
3. **Get a Twilio Phone Number**: Click **"Get a Trial Number"** in your console. This is your virtual sender number (e.g. `+18559092823`).
4. **Update `.env` file**: Open the `.env` file in the root of this project and fill in your details:

```env
# Twilio Credentials (Required for server.js)
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=your_real_auth_token_here
TWILIO_PHONE_NUMBER=+18559092823
```

> [!IMPORTANT]
> - **TWILIO_PHONE_NUMBER** must be your virtual **Twilio-provided number** (including the leading `+` and country code). Do **NOT** put your personal mobile number (e.g., `0769700721`) in this field, as Twilio cannot use your personal mobile number to send out messages!
> - **Twilio Trial Account Limitation**: By default, Twilio free accounts can **ONLY** send messages to phone numbers that have been verified in the Twilio Console. Before you can receive an alert on your real phone number, you must add and verify it under [Verified Caller IDs in Twilio](https://www.twilio.com/console/phone-numbers/verified). Once you upgrade to a paid account, you can send SMS to any phone number globally.

---

## 💻 Step 2: How to Run the Project

You need to run both the **Vite Frontend** and the **SMS Backend Server** at the same time.

### 1. Install Dependencies
Make sure all dependencies are installed (including backend libraries like `express`, `cors`, `twilio`, and `dotenv`):
```bash
npm install
```

### 2. Run the SMS Backend Server
In your terminal, run the SMS backend server on port `3001`:
```bash
npm run server
```
You should see:
```text
🚀 SMS Backend Server running on http://localhost:3001
Waiting for SMS requests...
```

### 3. Run the Frontend App
In a separate terminal window, run the main Vite application:
```bash
npm run dev
```

---

## 🧪 Step 3: Test Real SMS Alerts

1. Open the application in your browser.
2. Log in and navigate to a property details page.
3. Click **"Get Price Drop Alerts"**.
4. Enter your real mobile number (e.g., `0769700721` - make sure it's added to your **Twilio Verified Caller IDs** first if using a trial account) and subscribe.
5. Log in as the property owner or admin, go to **"Edit Property"**, reduce the price, and click **"Save Changes"**.
6. Check your mobile phone! You will receive an SMS saying:
   > *Price Drop Alert! [Property Title] dropped to Rs. [New Price].*
7. Check the SMS Backend console for detailed logs showing the incoming request, phone number normalization, and successful SID delivery.
