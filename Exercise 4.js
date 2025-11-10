document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const ratingSelect = document.getElementById('rating');
    const satisfactionGroup = document.getElementById('satisfaction-group');
    const allFormGroups = form.querySelectorAll('.form-group');
    
    allFormGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        if (input) {
            input.addEventListener('input', () => validateField(input));
            input.addEventListener('blur', () => validateField(input));
         }
    });

    ratingSelect.addEventListener('change', () => {
        const rating = ratingSelect.value;
        if (rating === 'poor' || rating === 'average') {
            satisfactionGroup.style.display = 'block';
            satisfactionGroup.querySelector('textarea').required = true;
        } else {
            satisfactionGroup.style.display = 'none';
            satisfactionGroup.querySelector('textarea').required = false;
        }
    });

    form.addEventListener('submit', (event) => {
        let formIsValid = true;
        allFormGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            if (input && !validateField(input)) {
                formIsValid = false;
            }
        });

         if (!formIsValid) {
            event.preventDefault();
            alert('Please correct the highlighted fields before submitting.');
        }
    });

     function validateField(input) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        const isValid = input.checkValidity();

        if (isValid) {
            formGroup.classList.remove('invalid');
            errorMessage.textContent = '';
        } else {
            formGroup.classList.add('invalid');
            errorMessage.textContent = getValidationMessage(input);
        }
        return isValid;
    }

    function getValidationMessage(input) {
        if (input.validity.valueMissing) {
            return 'Bruv, you cannot do that, you need to fill in this field.';
        }
        if (input.validity.typeMismatch) {
            if (input.type === 'email') {
                return 'May you please insert your email address, and not whatever crap you just put in.';
            }
        }
        return input.validationMessage;
    }

    const radioOptions = document.querySelectorAll('.radio-option');
    radioOptions.forEach(option => {
        option.addEventListener('mouseover', () => {
            option.style.backgroundColor = '#f1f1f1';
        });
        option.addEventListener('mouseout', () => {
            option.style.backgroundColor = '';
        });
    });

    const selectContainer = ratingSelect.closest('.form-group');
    selectContainer.addEventListener('mouseover', () => {
        selectContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    });
    selectContainer.addEventListener('mouseout', () => {
        selectContainer.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    });
});