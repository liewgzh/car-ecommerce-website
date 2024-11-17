document.getElementById('addCarForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const response = await fetch('/api/cars', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Car added successfully!');
            window.location.href = '/cars.html'; // Redirect to the cars page
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error adding car:', error);
    }
});