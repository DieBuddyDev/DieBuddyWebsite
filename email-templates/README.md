# DieBuddy Email Templates

This directory contains email templates for DieBuddy's authentication system.

## Files

### 1. `reset-password-supabase-template.html`
**Use this for Supabase Email Templates**

This is the main template optimized for Supabase's email system. It uses table-based layout for maximum email client compatibility.

**Supabase Variables:**
- `{{ .ConfirmationURL }}` - The full reset password URL with tokens

### 2. `reset-password-email.html`
A modern, responsive version with advanced CSS. Use this if you're sending emails through a custom email service.

**Variables:**
- `{{ .SiteURL }}` - Your website base URL
- `{{ .ClientIP }}` - User's IP address (optional)
- `{{ .Timestamp }}` - Request timestamp (optional)

### 3. `reset-password-text.txt`
Plain text version for email clients that don't support HTML.

## How to Use with Supabase

### Step 1: Copy the Template
1. Open `reset-password-supabase-template.html`
2. Copy the entire contents

### Step 2: Configure in Supabase Dashboard
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **Email Templates**
4. Select **Reset Password** template
5. Paste the HTML template into the editor
6. Click **Save**

### Step 3: Configure Redirect URL
1. In the same dashboard, go to **Authentication** → **URL Configuration**
2. Add your redirect URL:
   ```
   https://diebuddy.com/pages/reset-password.html
   ```
3. Click **Save**

## Supabase Template Variables

Supabase automatically provides these variables:

| Variable | Description |
|----------|-------------|
| `{{ .ConfirmationURL }}` | Full URL with access and refresh tokens for password reset |
| `{{ .Token }}` | Raw token (if you want to build custom URL) |
| `{{ .TokenHash }}` | Hashed token |
| `{{ .SiteURL }}` | Your site URL from Supabase settings |
| `{{ .Email }}` | User's email address |

## Testing the Email

### Test with Supabase
1. In your DieBuddy app, go to the sign-in screen
2. Click "Forgot Password?"
3. Enter your email address
4. Check your inbox for the email

### Preview in Email Clients
It's recommended to test the email in:
- Gmail (web and mobile)
- Outlook
- Apple Mail
- Mobile email clients (iOS, Android)

## Customization

### Change Colors
The DieBuddy brand colors are:
- Primary Red: `#b22222`
- Secondary Red: `#dc143c`
- Dark Background: `#2c3e50`

To customize, search and replace these hex codes in the template.

### Change Logo
Replace the 🎲 emoji with:
- An `<img>` tag pointing to your logo URL
- Different emoji
- Text-only logo

### Add More Info
You can add additional sections like:
- Password requirements reminder
- Security tips
- App download links
- Social media links

## Troubleshooting

### Email Not Sending
1. Check Supabase email settings are configured
2. Verify SMTP settings (if using custom SMTP)
3. Check spam folder

### Link Not Working
1. Verify redirect URL is added to Supabase allowed list
2. Check that your website is deployed and accessible
3. Ensure the reset-password.html page exists at the correct path

### Formatting Issues
1. Some email clients strip CSS - the table-based template handles this
2. Test in multiple email clients
3. Keep design simple for maximum compatibility

## Support

For issues with:
- **Email templates**: Check Supabase documentation
- **DieBuddy app**: Visit [diebuddy.com/pages/contact.html](https://diebuddy.com/pages/contact.html)
- **Template customization**: Modify the HTML/CSS as needed

## License

© 2025 DieBuddy. All rights reserved.
