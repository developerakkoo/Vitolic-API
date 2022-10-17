const City = require('../Models/cityModel');

exports.createCity = async (req, res, next) => {
    try {
        let city = await City.create(req.body);

        if (city) {
            res.status(200).json({ success: true, city })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.getCity = async (req, res, next) => {
    try {
        city

        let city = await City.find({});
        if (city) {
            res.status(200).json({ success: true, count: city.length, city })

        }

    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}


exports.getCityById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let city = await City.findById(id);
        if (city) {
            res.status(200).json({ success: true, city })

        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.updateCity = async (req, res, next) => {
    try {
        const id = req.params.id;
        let city = await City.findByIdAndUpdate(id, req.body);

        if (city) {
            res.status(200).json({ success: true, message: "Updated city" })

        }

    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.deleteCity = async (req, res, next) => {
    try {
        const id = req.params.id;
        let city = await City.findByIdAndDelete(id);

        if (city) {
            res.status(200).json({ success: true, message: "Deleted city" })

        }

    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}