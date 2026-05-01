const elements = {
    form: document.querySelector('form'),
    name: document.getElementById('name'),
    rating: document.querySelectorAll('.rating'),
    comment: document.getElementById('comment'),
    submit: document.getElementById('submit'),
    feedbacksBtn: document.getElementById('feedbacks-btn'),
    formMessage: document.getElementById('form-message')
};

elements.feedbacksBtn.addEventListener('click', () => {
    window.location.href = '/feedbacks.html';
});

function getSelectedRating() {
    const selected = Array.from(elements.rating).find((input) => input.checked);
    return selected ? selected.value : '';
}

function setFormMessage(message, type = '') {
    elements.formMessage.textContent = message;
    elements.formMessage.className = `form-message ${type}`;
}

async function sendFeedback(name, rating, comment) {
    const response = await fetch('http://localhost:3000/feedback-submit', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name,
            rating,
            comment
        })
    });

    if (!response.ok) {
        throw new Error('Failed to submit feedback');
    }

    return response.json();
}

elements.form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = elements.name.value.trim();
    const rating = getSelectedRating();
    const comment = elements.comment.value.trim();

    if (!name || !rating) {
        setFormMessage('Please add your name and select a rating.', 'error');
        return;
    }

    setFormMessage('');
    elements.submit.value = 'Submitting...';
    elements.submit.disabled = true;

    try {
        const result = await sendFeedback(name, rating, comment);

        if (result.success) {
            elements.form.reset();
            setFormMessage('Feedback submitted successfully.', 'success');
        } else {
            setFormMessage(result.message || 'Could not submit feedback. Please try again.', 'error');
        }
    } catch (err) {
        console.log(err);
        setFormMessage('Something went wrong. Please try again.', 'error');
    } finally {
        elements.submit.value = 'Submit';
        elements.submit.disabled = false;
    }
});


