const Banner = require("./../Models/bannerModal");


exports.createBanner = async (req, res, next) => {

    if (!req.file) {
        res.status(400).send("Please attach a file");
    }

    console.log(req.file);
    const imageUrl = req.file.path.replace(/\\/g, "/");
    console.log(imageUrl);

    let banner = new Banner({
        imageUrl: req.protocol + '://' + req.hostname + ":" + process.env.PORT + '/' + imageUrl
    })

    banner.save().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err.message);

    })


}
exports.getBanners = async (req, res, next) => {
    try {

        let banner = await Banner.find({});

        if (banner) {
            res.status(200).json({ banner });
        }

    } catch (error) {
        res.status(500).send(error.message);
    }

}

exports.getBannerById = async (req, res, next) => {
    try {
        let banner = await Banner.findById(req.params.id);
        if (banner) {
            res.status(201).json({ banner });
        }

    } catch (error) {
        res.status(500).send(error.message);

    }
}


exports.updateBanner = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).send("Please attach a file");
        }

        console.log(req.file);
        const imageUrl = req.file.path.replace(/\\/g, "/");
        console.log(imageUrl);

        let banner = await Banner.findByIdAndUpdate(req.params.id, {
            imageUrl: req.protocol + '://' + req.hostname + ":" + process.env.PORT + '/' + imageUrl
        })
    } catch (error) {
        res.status(500).send(error.message);

    }
}

exports.deleteBanner = async (req, res, next) => {
    try {
        let banner = await Banner.findByIdAndDelete(req.params.id);
        if (banner) {
            res.status(200).send("Banner Delete Successfully");
        }
    } catch (error) {
        res.status(500).send(error.message);

    }
}