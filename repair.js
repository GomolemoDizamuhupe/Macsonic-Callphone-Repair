

// Repair Form Functionality & Validation
// This script provides comprehensive form controls and validation

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const customerName = document.getElementById('customer_name');
    const customerEmail = document.getElementById('customer_email');
    const deviceSelect = document.getElementById('device');
    const fileInput = document.getElementById('file');
    const issueDescription = document.getElementById('issue');

    // Helper function to show error messages
    function showError(input, message) {
        // Remove any existing error message
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create and display new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.style.marginBottom = '10px';
        errorDiv.textContent = message;

        // Add error styling to input
        input.style.borderColor = '#e74c3c';
        input.style.backgroundColor = '#ffe6e6';

        // Insert error message after the input
        input.parentElement.insertBefore(errorDiv, input.nextSibling);
    }

    // Helper function to show success state
    function showSuccess(input) {
        // Remove any existing error message
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add success styling to input
        input.style.borderColor = '#27ae60';
        input.style.backgroundColor = '#e8f8f5';
    }

    // Helper function to reset input styling
    function resetInput(input) {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    // Validate name field
    function validateName() {
        const nameValue = customerName.value.trim();

        if (nameValue === '') {
            showError(customerName, 'Name is required');
            return false;
        }

        if (nameValue.length < 2) {
            showError(customerName, 'Name must be at least 2 characters long');
            return false;
        }

        if (!/^[a-zA-Z\s'-]+$/.test(nameValue)) {
            showError(customerName, 'Name can only contain letters, spaces, hyphens, and apostrophes');
            return false;
        }

        showSuccess(customerName);
        return true;
    }

    // Validate email field
    function validateEmail() {
        const emailValue = customerEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            showError(customerEmail, 'Email is required');
            return false;
        }

        if (!emailRegex.test(emailValue)) {
            showError(customerEmail, 'Please enter a valid email address (e.g., example@email.com)');
            return false;
        }

        showSuccess(customerEmail);
        return true;
    }

    // Validate device selection
    function validateDevice() {
        if (deviceSelect.value === '') {
            showError(deviceSelect, 'Please select a device type');
            return false;
        }

        showSuccess(deviceSelect);
        return true;
    }

    // Validate file upload (optional but with size/type checks if provided)
    function validateFile() {
        const file = fileInput.files[0];

        // File is optional, so if nothing is selected, it's valid
        if (!file) {
            resetInput(fileInput);
            return true;
        }

        // Check file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            showError(fileInput, 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
            return false;
        }

        // Check file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            showError(fileInput, 'File size must be less than 5MB');
            return false;
        }

        showSuccess(fileInput);
        return true;
    }

    // Validate issue description
    function validateIssue() {
        const issueValue = issueDescription.value.trim();

        if (issueValue === '') {
            showError(issueDescription, 'Issue description is required');
            return false;
        }

        if (issueValue.length < 10) {
            showError(issueDescription, 'Please provide a more detailed description (at least 10 characters)');
            return false;
        }

        if (issueValue.length > 500) {
            showError(issueDescription, 'Description is too long (maximum 500 characters)');
            return false;
        }

        showSuccess(issueDescription);
        return true;
    }

    // Real-time validation on input events
    customerName.addEventListener('blur', validateName);
    customerName.addEventListener('input', function () {
        if (this.value.trim() !== '') {
            validateName();
        }
    });

    customerEmail.addEventListener('blur', validateEmail);
    customerEmail.addEventListener('input', function () {
        if (this.value.trim() !== '') {
            validateEmail();
        }
    });

    deviceSelect.addEventListener('change', validateDevice);

    fileInput.addEventListener('change', validateFile);

    issueDescription.addEventListener('blur', validateIssue);
    issueDescription.addEventListener('input', function () {
        if (this.value.trim() !== '') {
            validateIssue();
        }
    });

    // Form submission handler
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isDeviceValid = validateDevice();
        const isFileValid = validateFile();
        const isIssueValid = validateIssue();

        // Check if all validations passed
        if (isNameValid && isEmailValid && isDeviceValid && isFileValid && isIssueValid) {
            // Form is valid - collect data
            const formData = {
                name: customerName.value.trim(),
                email: customerEmail.value.trim(),
                device: deviceSelect.value,
                deviceName: deviceSelect.options[deviceSelect.selectedIndex].text,
                issue: issueDescription.value.trim(),
                hasImage: fileInput.files.length > 0,
                imageInfo: fileInput.files[0] ? {
                    name: fileInput.files[0].name,
                    size: (fileInput.files[0].size / 1024).toFixed(2) + ' KB',
                    type: fileInput.files[0].type
                } : null,
                timestamp: new Date().toLocaleString()
            };

            // Display success message
            displaySuccessMessage(formData);

            // Reset form after successful submission
            setTimeout(() => {
                form.reset();
                resetAllInputs();
            }, 3000);
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Display success message
    function displaySuccessMessage(data) {
        // Create success message container
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #27ae60;
      color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      z-index: 1000;
      max-width: 500px;
      text-align: center;
      animation: slideIn 0.3s ease-out;
    `;

        successDiv.innerHTML = `
      <h2 style="margin-top: 0; font-size: 1.8rem;">✓ Booking Confirmed!</h2>
      <p style="font-size: 1.1rem; margin: 15px 0;">
        Thank you, <strong>${data.name}</strong>!
      </p>
      <p style="font-size: 0.95rem; line-height: 1.6;">
        Your ${data.deviceName.toLowerCase()} repair has been booked.<br>
        We'll contact you at <strong>${data.email}</strong> shortly.<br>
        ${data.hasImage ? '<br>📷 Image uploaded successfully!' : ''}
      </p>
      <p style="font-size: 0.85rem; margin-top: 15px; opacity: 0.9;">
        This message will close automatically...
      </p>
    `;

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translate(-50%, -60%);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
      }
    `;
        document.head.appendChild(style);

        // Add overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 999;
    `;

        document.body.appendChild(overlay);
        document.body.appendChild(successDiv);

        // Log to console for debugging
        console.log('Repair booking submitted:', data);

        // Remove success message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
            overlay.remove();
            style.remove();
        }, 3000);
    }

    // Reset all input styling
    function resetAllInputs() {
        resetInput(customerName);
        resetInput(customerEmail);
        resetInput(deviceSelect);
        resetInput(fileInput);
        resetInput(issueDescription);
    }

    // Add character counter to textarea
    const charCounter = document.createElement('div');
    charCounter.style.cssText = 'font-size: 0.85rem; color: #666; margin-top: 5px; text-align: right;';
    issueDescription.parentElement.insertBefore(charCounter, issueDescription.nextSibling);

    issueDescription.addEventListener('input', function () {
        const length = this.value.length;
        charCounter.textContent = `${length}/500 characters`;

        if (length > 500) {
            charCounter.style.color = '#e74c3c';
        } else if (length >= 10) {
            charCounter.style.color = '#27ae60';
        } else {
            charCounter.style.color = '#666';
        }
    });

    // Initial character count
    charCounter.textContent = '0/500 characters';
});