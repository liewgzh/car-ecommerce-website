fetch('/api/cars')
    .then(response => response.json())
    .then(cars => {
        const carsContainer = document.getElementById('carsContainer');
        cars.forEach(car => {
            const carElement = document.createElement('div');
            carElement.innerHTML = `
                <h3>${car.name}</h3>
                <p>${car.make} ${car.model}</p>
                <p>Price: $${car.price}</p>
                <img src="${car.image}" alt="${car.name}" class="car-image" />
                <a href="/car/${car._id}">View Details</a>
            `;
            carsContainer.appendChild(carElement);
        });
    })
    .catch(error => {
        console.error('Error fetching car data:', error);
    }); 