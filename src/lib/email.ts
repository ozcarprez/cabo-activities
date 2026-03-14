// src/lib/email.ts
// Email utilities for booking confirmations

interface BookingEmailData {
  bookingNumber: string;
  guestName: string;
  guestEmail: string;
  activityTitle: string;
  activityImage: string;
  date: string;
  time: string;
  duration: string;
  meetingPoint: string;
  adults: number;
  children: number;
  totalAmount: number;
  currency: string;
  operatorName: string;
  cancellationPolicy: string;
}

export function generateBookingConfirmationHTML(data: BookingEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed - CaboXplore</title>
</head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f5f5f5;">
  <div style="max-width:600px;margin:0 auto;background:#fff;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#023E8A,#0077B6,#00B4D8);padding:32px 24px;text-align:center;">
      <h1 style="color:#fff;font-size:24px;margin:0 0 8px;">CaboXplore</h1>
      <p style="color:rgba(255,255,255,0.7);font-size:14px;margin:0;">Your Adventure Awaits</p>
    </div>

    <!-- Confirmation -->
    <div style="padding:32px 24px;text-align:center;">
      <div style="width:64px;height:64px;background:#ecfdf5;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:28px;">✓</span>
      </div>
      <h2 style="color:#0A1628;font-size:22px;margin:0 0 8px;">Booking Confirmed!</h2>
      <p style="color:#666;font-size:14px;margin:0;">
        Reference: <strong style="color:#0077B6;font-family:monospace;font-size:16px;">${data.bookingNumber}</strong>
      </p>
    </div>

    <!-- Activity Details -->
    <div style="padding:0 24px 24px;">
      <div style="background:#f8f9fa;border-radius:12px;overflow:hidden;">
        <img src="${data.activityImage}" alt="${data.activityTitle}" style="width:100%;height:200px;object-fit:cover;" />
        <div style="padding:16px;">
          <h3 style="color:#0A1628;font-size:18px;margin:0 0 4px;">${data.activityTitle}</h3>
          <p style="color:#888;font-size:13px;margin:0 0 16px;">by ${data.operatorName}</p>

          <table style="width:100%;font-size:14px;">
            <tr>
              <td style="color:#888;padding:6px 0;">📅 Date</td>
              <td style="color:#0A1628;text-align:right;padding:6px 0;font-weight:600;">${data.date}</td>
            </tr>
            <tr>
              <td style="color:#888;padding:6px 0;">⏰ Time</td>
              <td style="color:#0A1628;text-align:right;padding:6px 0;font-weight:600;">${data.time}</td>
            </tr>
            <tr>
              <td style="color:#888;padding:6px 0;">⏱ Duration</td>
              <td style="color:#0A1628;text-align:right;padding:6px 0;">${data.duration}</td>
            </tr>
            <tr>
              <td style="color:#888;padding:6px 0;">👥 Guests</td>
              <td style="color:#0A1628;text-align:right;padding:6px 0;">${data.adults} adults${data.children > 0 ? `, ${data.children} children` : ''}</td>
            </tr>
            <tr>
              <td style="color:#888;padding:6px 0;">📍 Meeting Point</td>
              <td style="color:#0A1628;text-align:right;padding:6px 0;font-size:13px;">${data.meetingPoint}</td>
            </tr>
          </table>

          <div style="border-top:1px solid #e5e7eb;margin-top:12px;padding-top:12px;">
            <table style="width:100%;">
              <tr>
                <td style="font-size:16px;font-weight:700;color:#0A1628;">Total Paid</td>
                <td style="font-size:18px;font-weight:700;color:#0077B6;text-align:right;">$${data.totalAmount.toFixed(2)} ${data.currency}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancellation Policy -->
    <div style="padding:0 24px 24px;">
      <div style="background:#ecfdf5;border-radius:8px;padding:12px 16px;">
        <p style="color:#065f46;font-size:13px;margin:0;">
          <strong>🛡 Cancellation Policy:</strong> ${data.cancellationPolicy}
        </p>
      </div>
    </div>

    <!-- CTA -->
    <div style="padding:0 24px 32px;text-align:center;">
      <a href="https://caboxplore.com/dashboard" style="display:inline-block;background:#0077B6;color:#fff;text-decoration:none;padding:12px 32px;border-radius:8px;font-weight:600;font-size:14px;">
        View My Bookings
      </a>
    </div>

    <!-- Footer -->
    <div style="background:#0A1628;padding:24px;text-align:center;">
      <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0 0 4px;">
        © ${new Date().getFullYear()} CaboXplore. All rights reserved.
      </p>
      <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;">
        Made with ♥ in Los Cabos, Mexico
      </p>
    </div>
  </div>
</body>
</html>`;
}

// Send email function (configure with your SMTP provider)
/*
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendBookingConfirmation(data: BookingEmailData) {
  const html = generateBookingConfirmationHTML(data);

  await transporter.sendMail({
    from: `"CaboXplore" <${process.env.SMTP_USER}>`,
    to: data.guestEmail,
    subject: `Booking Confirmed: ${data.activityTitle} — ${data.bookingNumber}`,
    html,
  });
}
*/

export async function sendBookingConfirmation(data: BookingEmailData) {
  console.log(`[Email] Would send confirmation to ${data.guestEmail} for booking ${data.bookingNumber}`);
  return { sent: true, to: data.guestEmail };
}
