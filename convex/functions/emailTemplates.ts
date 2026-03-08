export const buildEmailTemplate = (
  url: string,
  subject: string,
  text: string,
) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Verify Your Email Address</title>
      <style>
        /* Reset styles */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { margin: 0; padding: 0; width: 100%; height: 100%; }
        
        /* Base styles */
        body {
          background-color: #f9fafb;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #1f2937;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
        }
        
        .email-header {
          text-align: center;
          padding: 40px 20px 20px;
        }
        
        .logo-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background-color: #2563eb;
          border-radius: 8px;
          margin-bottom: 16px;
        }
        
        .email-title {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin: 0;
          line-height: 1.3;
        }
        
        .email-body {
          padding: 0 40px 40px;
        }
        
        .text-block {
          margin: 0 0 20px;
          color: #374151;
          line-height: 1.6;
        }
        
        .verification-box {
          background-color: #f3f4f6;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 32px 24px;
          text-align: center;
          margin: 32px 0;
        }
        
        .verification-label {
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 12px;
        }
        
        .verification-code {
          font-family: 'Courier New', Courier, monospace;
          font-size: 36px;
          font-weight: 700;
          color: #111827;
          letter-spacing: 0.1em;
          margin: 0 0 8px;
        }
        
        .expiry-text {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }
        
        .cta-button {
          display: inline-block;
          padding: 14px 32px;
          background-color: #2563eb;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          margin: 20px 0;
          transition: background-color 0.2s;
        }
        
        .cta-button:hover {
          background-color: #1d4ed8;
        }
        
        .link-box {
          background-color: #f9fafb;
          border-radius: 6px;
          padding: 16px;
          word-break: break-all;
          font-family: 'Courier New', Courier, monospace;
          font-size: 13px;
          color: #6b7280;
          margin: 16px 0;
        }
        
        .muted-text {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
        }
        
        .email-footer {
          border-top: 1px solid #e5e7eb;
          padding: 24px 40px;
          text-align: center;
        }
        
        .footer-text {
          font-size: 12px;
          color: #9ca3af;
          margin: 0 0 16px;
          line-height: 1.6;
        }
        
        .footer-links {
          margin: 0;
          padding: 0;
        }
        
        .footer-link {
          color: #9ca3af;
          text-decoration: none;
          font-size: 12px;
          margin: 0 12px;
        }
        
        .footer-link:hover {
          color: #374151;
        }
        
        /* Mobile responsive */
        @media only screen and (max-width: 600px) {
          .email-body { padding: 0 20px 20px !important; }
          .email-header { padding: 30px 20px 15px !important; }
          .email-footer { padding: 20px !important; }
          .email-title { font-size: 20px !important; }
          .verification-code { font-size: 28px !important; }
          .verification-box { padding: 24px 16px !important; }
        }
      </style>
    </head>
    <body>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 40px 20px;">
            <div class="email-container">
              <!-- Header -->
              <div class="email-header">
                <div class="logo-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h1 class="email-title">${subject}</h1>
              </div>
              
              <!-- Body -->
              <div class="email-body">
                <p class="text-block">
                  ${text}
                </p>
                
                <!-- CTA Button -->
                <div style="text-align: center;">
                  <a href="${url}" class="cta-button">${subject}</a>
                </div>
                
                <p class="muted-text">
                  If you didn't create an account, you can safely ignore this email.
                </p>
              </div>
              
              <!-- Footer -->
              <div class="email-footer">
                <div class="footer-links">
                  <a href="#" class="footer-link">Privacy Policy</a>
                  <a href="#" class="footer-link">Terms of Service</a>
                  <a href="#" class="footer-link">Contact Us</a>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return { subject, text, html };
};
