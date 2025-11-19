# LeadBryte Newsletter Email Automation

## 1. Prerequisites
- Node.js and Firebase CLI installed
- A SendGrid account (free tier is fine)

## 2. Setup Steps

1. **Install dependencies**
   ```bash
   cd functions
   npm install
   ```

2. **Set SendGrid API key in Firebase config**
   ```bash
   firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY" sendgrid.from="your_verified_sender@example.com"
   ```
   - Replace `YOUR_SENDGRID_API_KEY` with your real SendGrid API key
   - Replace `your_verified_sender@example.com` with a sender email verified in SendGrid

3. **Deploy the function**
   ```bash
   firebase deploy --only functions
   ```

## 3. How it works
- When a new document is added to `newsletter_subscribers`, the Cloud Function triggers and sends a welcome email to the subscriber.

## 4. Customization
- Edit the email subject or HTML in `functions/index.js` as needed.

---

If you need help with SendGrid setup or Firebase CLI, let me know!
