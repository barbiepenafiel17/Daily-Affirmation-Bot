document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscribe-form');
    const messageEl = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Disable the submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = 'Subscribing...';
        messageEl.className = 'message';
        messageEl.textContent = '';

        try {
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                messageEl.className = 'message success';
                messageEl.textContent = '✨ Successfully subscribed! Check your email for daily affirmations.';
                form.reset();
            } else {
                messageEl.className = 'message error';
                messageEl.textContent = `❌ ${data.message || 'Something went wrong. Please try again.'}`;
            }
        } catch (error) {
            messageEl.className = 'message error';
            messageEl.textContent = '❌ Unable to connect to the server. Please try again later.';
        } finally {
            // Re-enable the submit button and restore its text
            submitButton.disabled = false;
            submitButton.innerHTML = 'Subscribe ✨';
        }
    });
});
