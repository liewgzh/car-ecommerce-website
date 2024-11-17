const carId = window.location.pathname.split('/').pop();

fetch(`/api/car/${carId}`)
    .then(response => response.json())
    .then(car => {
        const carDetailsContainer = document.getElementById('carDetailsContainer');
        carDetailsContainer.innerHTML = `
            <h2>${car.name}</h2>
            <p>${car.make} ${car.model}</p>
            <p>Year: ${car.year}</p>
            <p>Price: $${car.price}</p>
            <img src="${car.image}" alt="${car.name}" />
        `;
    })
    .catch(error => {
        console.error('Error fetching car details:', error);
    }); 