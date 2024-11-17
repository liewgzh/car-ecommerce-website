const Car = require('../models/car');

class CarController {
    async getAllCars(req, res) {
        try {
            const cars = await Car.find();
            res.json(cars);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching cars' });
        }
    }

    async getCarById(req, res) {
        try {
            const car = await Car.findById(req.params.id);
            if (car) {
                res.json(car);
            } else {
                res.status(404).json({ message: 'Car not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching car details' });
        }
    }

    async createCar(req, res) {
        const { name, make, model, year, price } = req.body;
        const image = req.file ? `/images/${req.file.filename}` : '';
        const newCar = new Car({ name, make, model, year, price, image });
        try {
            await newCar.save();
            res.status(201).json(newCar);
        } catch (error) {
            res.status(400).json({ message: 'Error creating car' });
        }
    }
}

module.exports = new CarController(); 