document.addEventListener('DOMContentLoaded', () => {
    const whatsappNumber = '919429107235';
    const whatsappWidget = document.createElement('aside');
    whatsappWidget.className = 'whatsapp-widget';
    whatsappWidget.innerHTML = `
        <div class="whatsapp-panel" aria-hidden="true">
            <div class="whatsapp-panel-header">
                <div class="whatsapp-panel-icon"><i class="fab fa-whatsapp"></i></div>
                <div>
                    <h2>Start a Conversation</h2>
                    <p>Hi! Click below to chat with us on WhatsApp.</p>
                </div>
            </div>
            <div class="whatsapp-panel-body">
                <p class="whatsapp-greeting">Hello! Welcome to Ciplon Plasto. Thank you for contacting us via our website.</p>
                <a class="whatsapp-agent" href="https://wa.me/${whatsappNumber}?text=Hello%20Ciplon%20Plasto%2C%20I%20need%20help%20with%20PET%20preforms." target="_blank" rel="noopener noreferrer">
                    <span class="whatsapp-agent-avatar"><i class="fab fa-whatsapp"></i></span>
                    <span class="whatsapp-agent-copy"><strong>Ciplon Plasto</strong><small>Chat with Ciplon Plasto</small></span>
                    <i class="fab fa-whatsapp whatsapp-agent-link"></i>
                </a>
            </div>
        </div>
        <div class="whatsapp-tooltip" aria-hidden="true">Need Help? Chat with us</div>
        <button class="whatsapp-launcher" type="button" aria-label="Open WhatsApp chat" aria-expanded="false">
            <i class="fab fa-whatsapp whatsapp-open-icon"></i>
            <i class="fas fa-times whatsapp-close-icon"></i>
        </button>
    `;
    document.body.appendChild(whatsappWidget);

    const whatsappLauncher = whatsappWidget.querySelector('.whatsapp-launcher');
    const whatsappPanel = whatsappWidget.querySelector('.whatsapp-panel');
    const whatsappTooltip = whatsappWidget.querySelector('.whatsapp-tooltip');

    whatsappLauncher.addEventListener('click', () => {
        const isOpen = whatsappWidget.classList.toggle('is-open');
        whatsappLauncher.setAttribute('aria-expanded', String(isOpen));
        whatsappLauncher.setAttribute('aria-label', isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat');
        whatsappPanel.setAttribute('aria-hidden', String(!isOpen));
        whatsappTooltip.setAttribute('aria-hidden', String(isOpen));
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        mainNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.querySelector('.form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name')?.toString().trim();
            const phone = formData.get('phone')?.toString().trim();
            const email = formData.get('email')?.toString().trim();
            const message = formData.get('message')?.toString().trim();

            if (!name || !phone || !email || !message) {
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.style.color = '#b00020';
                return;
            }

            const subject = encodeURIComponent('New Inquiry from ' + name);
            const body = encodeURIComponent(
                'Name: ' + name + '\n' +
                'Company: ' + (formData.get('company') || '') + '\n' +
                'Phone: ' + phone + '\n' +
                'Email: ' + email + '\n' +
                'Product Requirement: ' + (formData.get('interest') || '') + '\n\n' +
                'Message:\n' + message
            );

            window.location.href = 'mailto:infociplon@gmail.com?subject=' + subject + '&body=' + body;

            formMessage.textContent = 'Thank you! Your inquiry has been prepared for email. We will contact you soon.';
            formMessage.style.color = '#0b5d70';
            contactForm.reset();
        });
    }
});
