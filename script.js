document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.querySelector('.name'); // Use querySelector for class

    let names = ['Vuyelwa', 'Mavooma'];
    let index = 0;

    function toggleName() {
        nameElement.textContent = names[index];
        index = (index + 1) % names.length; // Switch between names
    }

    // Initial call
    toggleName();
    
    // Change name every 2 seconds
    setInterval(toggleName, 2000);
});
