const Banner = require("./../Models/bannerModal");
const io = require('../socket');

exports.createBanner = async (req, res, next) => {

    if (!req.file) {
        res.status(400).json({msg: "Please attach a file"});
    }

    console.log(req.file);
    const imageUrl = req.file.path.replace(/\\/g, "/");
    console.log(imageUrl);

    let banner = new Banner({
        imageUrl: "https" + '://' + req.hostname + '/' + imageUrl
    })

    banner.save().then((result) => {
        io.getIO().emit('banner:get', result);

        res.status(200).json({msg: "Please attach a file"});
    }).catch((err) => {
        res.status(500).json({msg: "Please attach a file"});

    })


}
exports.getBanners = async (req, res, next) => {
    /* try {

        let banner = await Banner.find({});

        if (banner) {
            res.status(200).json({ banner });
        }

    } catch (error) {
        res.status(500).send(error.message);
    } */
    try {
        const banner = await Banner.find({});

         if(banner){
             res.status(200).json({ status: true, message:'banner fetched successfully', banner: banner })
             io.getIO().emit('banner:get', banner);
 
         }  
     } catch (error) {
         res.status(500).json({message: error.message});
     }
}

exports.getBannerById = async (req, res, next) => {
    try {
        let banner = await Banner.findById(req.params.id);
        if (banner) {
            res.status(201).json({ banner });
        }

    } catch (error) {
        res.status(500).json({msg: "Please attach a file"});

    }
}


exports.updateBanner = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).json({msg: "Please attach a file"});
        }

        console.log(req.file);
        const imageUrl = req.file.path.replace(/\\/g, "/");
        console.log(imageUrl);

        let banner = await Banner.findByIdAndUpdate(req.params.id, {
            imageUrl: "https" + '://' + req.hostname + '/' + imageUrl
        })
        if(banner){
        io.getIO().emit('banner:get', banner);

            res.status(201).json({
                message:"Banner updated Successfully",
                banner
            })
        }
    } catch (error) {
        res.status(500).json({msg: "Please attach a file"});

    }
}

exports.deleteBanner = async (req, res, next) => {
    try {
        let banner = await Banner.findByIdAndDelete(req.params.id);
        if (banner) {
        io.getIO().emit('banner:get', banner);

            res.status(200).json({msg: "Please attach a file"});
        }
    } catch (error) {
        res.status(500).json({msg: "Please attach a file"});

    }
}