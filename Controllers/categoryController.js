const Category = require('./../Models/categoryModal');


exports.postCategory = async(req, res,next) => {
  
    
        const mainCategory = req.body.mainCategory;
        const subCategory = req.body.subCategory;
        

        const category = new Category({   
            mainCategory: mainCategory,
            subCategory: subCategory,
            
        });
        category.save().then((result) => {
            console.log("category Created!");
            
            res.status(201).json({
                result,
                message: "Category Created",
            });
          io.getIO().emit('Category:create', {action: 'created', category})

        }).catch((err) => {
          res.status(500).json({
            status: false,
            message: err.message
        })
        })
};

exports.getCategory = async(req, res,next) => {
    try {
        const category = await Category.find({}).populate("category");

        if(category){
            res.status(200).json({ status: true, message:'category fetched successfully', category: category })
            io.getIO().emit('get:category', category);

        }  
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

exports.getCategoryById = async(req, res,next) => {
    try {
        const id = req.params.id;

        const category = await Category.findById(id);

        if(category){
            res.status(200).json({ status: true, message:'category Found', category: category })
            io.getIO().emit('getById:category', category);

        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.updateCategory = async(req, res,next) => {
    try {
        const id = req.params.id;

        const category = await Category.findByIdAndUpdate(id, req.body);


        if(category){
            res.status(200).json({ status: true, message:'category updated successfully', category: category })
            io.getIO().emit('put:category', category);
        }

        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


exports.deleteCategory = async(req, res,next) => {
    try {
        const id = req.params.id;

        const category = await Category.findByIdAndDelete(id);

        if(category){
            res.status(200).json({ status: true, message:'category deleted successfully', category: category })
            io.getIO().emit('delete:category', category);
        }c

        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}