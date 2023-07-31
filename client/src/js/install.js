const butInstall = document.getElementById('buttonInstall');

// Logic for handling the PWA installation prompt
// TODO: Add an event listener for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt event triggered');
    console.log("event: ", event);
    event.preventDefault();
    // Store the triggered event for later use
    window.deferredPrompt = event;

    // Display the install button by removing the 'hidden' class.
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the 'butInstall' element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }

    // Show the PWA installation prompt
    promptEvent.prompt();

    // Reset the deferred prompt variable since it can only be used once.
    window.deferredPrompt = null;

    // Hide the install button after the prompt is shown.
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an event listener for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
    // Clear the deferredPrompt variable after the PWA is installed
    console.log('PWA installation successful');
    window.deferredPrompt = null;
});
