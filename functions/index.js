const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();

// Set this in your Firebase environment config: functions.config().sendgrid.key
const SENDGRID_API_KEY = functions.config().sendgrid.key;
const FROM_EMAIL = functions.config().sendgrid.from || 'no-reply@yourdomain.com';
const COMPANY_NAME = 'LeadBryte Solutions';

sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendNewsletterWelcome = functions.firestore
  .document('newsletter_subscribers/{subscriberId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const email = data.email;
    if (!email) return null;

    const msg = {
      to: email,
      from: FROM_EMAIL,
      subject: `Welcome to the ${COMPANY_NAME} Newsletter!`,
      text: `Thank you for subscribing to our newsletter. You'll receive updates and news from us soon!`,
      html: `<p>Thank you for subscribing to <b>${COMPANY_NAME}</b>'s newsletter.<br>You'll receive updates and news from us soon!</p>`
    };
    try {
      await sgMail.send(msg);
      console.log(`Welcome email sent to ${email}`);
    } catch (err) {
      console.error('SendGrid error:', err);
    }
    return null;
  });
