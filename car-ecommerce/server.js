const express = require('express');
const path = require('path');
const connectDB = require('./models/db');
const carController = require('./controllers/carController');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/cars.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cars.html'));
});

app.get('/api/cars', carController.getAllCars);
app.get('/car/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'car-details.html'));
});
app.get('/api/car/:id', carController.getCarById);
app.post('/api/cars', carController.createCar);
app.get('/add-car.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add-car.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 