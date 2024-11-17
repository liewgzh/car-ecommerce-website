const express = require('express');
const path = require('path');
const connectDB = require('./models/db');
const carController = require('./controllers/carController');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
    }
});

const upload = multer({ storage });

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
app.post('/api/cars', upload.single('image'), carController.createCar);
app.get('/add-car.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add-car.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 