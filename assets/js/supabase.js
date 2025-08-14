/* =====================================
   SUPABASE CONFIGURATION & EMAIL VERIFICATION - From your current website
   ===================================== */

// TODO: Update these with your actual Supabase credentials
const SUPABASE_URL = 'https://YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'your-actual-anon-key';

// Initialize Supabase client (only if Supabase script is loaded)
let supabaseClient = null;

function initializeSupabase() {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase initialized successfully');
    } else {
        console.warn('Supabase library not loaded');
    }
}

// Email verification functionality
function handleEmailVerification() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const type = urlParams.get('type');
    
    if (token && type === 'email') {
        verifyEmailToken(token);
    }
}

// Verify email token
async function verifyEmailToken(token) {
    if (!supabaseClient) {
        showMessage('Verification system not available', 'error');
        return;
    }
    
    try {
        const { data, error } = await supabaseClient.auth.verifyOtp({
            token_hash: token,
            type: 'email'
        });
        
        if (error) {
            showMessage('Email verification failed: ' + error.message, 'error');
        } else {
            showMessage('Email verified successfully! You can now sign in to the app.', 'success');
            
            // Update database to mark email as verified
            if (data.user) {
                await updateEmailVerificationStatus(data.user.id, true);
            }
        }
    } catch (error) {
        console.error('Verification error:', error);
        showMessage('An error occurred during verification', 'error');
    }
}

// Update email verification status in database
async function updateEmailVerificationStatus(userId, verified) {
    if (!supabaseClient) return;
    
    try {
        const { error } = await supabaseClient
            .from('players')
            .update({ email_verified: verified })
            .eq('user_id', userId);
            
        if (error) {
            console.error('Database update error:', error);
        }
    } catch (error) {
        console.error('Error updating verification status:', error);
    }
}

// Handle verification form submission
function setupVerificationForm() {
    const verificationForm = document.getElementById('verificationForm');
    const verificationCodeInput = document.getElementById('verificationCode');
    
    if (verificationForm && verificationCodeInput) {
        // Auto-format verification code input
        verificationCodeInput.addEventListener('input', function(e) {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Limit to 6 digits
            if (this.value.length > 6) {
                this.value = this.value.substring(0, 6);
            }
            
            // Auto-submit when 6 digits are entered
            if (this.value.length === 6) {
                setTimeout(() => {
                    verificationForm.dispatchEvent(new Event('submit'));
                }, 500);
            }
        });
        
        // Handle form submission
        verificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const code = verificationCodeInput.value;
            
            if (code.length === 6) {
                verifyCode(code);
            } else {
                showMessage('Please enter a 6-digit verification code', 'error');
            }
        });
    }
}

// Verify 6-digit code (demo version)
function verifyCode(code) {
    const statusDiv = document.getElementById('verificationStatus');
    
    // Demo verification - replace with actual verification logic
    if (code === '123456') {
        showMessage('Email verified successfully! You can now use the DieBuddy app.', 'success');
        
        // Redirect to success page or app store after verification
        setTimeout(() => {
            // window.location.href = 'https://your-app-store-link';
        }, 2000);
    } else {
        showMessage('Invalid verification code. Please check your email and try again.', 'error');
        document.getElementById('verificationCode').value = '';
    }
}

// Resend verification email
async function resendVerificationEmail() {
    const email = localStorage.getItem('verification_email');
    
    if (!email) {
        showMessage('No email address found. Please sign up again.', 'error');
        return;
    }
    
    showMessage('Sending new verification email...', 'info');
    
    // TODO: Implement actual email resending logic
    setTimeout(() => {
        showMessage('New verification email sent to ' + email, 'success');
    }, 2000);
}

// Store email for verification if passed as parameter
function storeVerificationEmail() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
        localStorage.setItem('verification_email', email);
    }
}

// Show status messages
function showMessage(message, type) {
    const statusDiv = document.getElementById('verificationStatus') || 
                     document.getElementById('formStatus') ||
                     createStatusDiv();
    
    if (statusDiv) {
        statusDiv.style.display = 'block';
        statusDiv.className = `status-message status-${type}`;
        statusDiv.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center;">
                <span style="margin-right: 8px;">${getStatusIcon(type)}</span>
                ${message}
            </div>
        `;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 5000);
        }
    }
}

// Get appropriate icon for status type
function getStatusIcon(type) {
    switch (type) {
        case 'success': return '✅';
        case 'error': return '❌';
        case 'info': return 'ℹ️';
        default: return '';
    }
}

// Create status div if it doesn't exist
function createStatusDiv() {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'dynamicStatus';
    statusDiv.style.marginTop = '1rem';
    
    // Insert after the first form or at the end of container
    const form = document.querySelector('form');
    const container = document.querySelector('.container');
    
    if (form && form.parentNode) {
        form.parentNode.insertBefore(statusDiv, form.nextSibling);
    } else if (container) {
        container.appendChild(statusDiv);
    }
    
    return statusDiv;
}

// Initialize Supabase functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSupabase();
    handleEmailVerification();
    setupVerificationForm();
    storeVerificationEmail();
});
