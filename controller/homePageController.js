

const get_practice_area_data = async(req,res)=>{
    try{
        res.render('practiceArea/practice_area_data',{"areaName":"area"});
    } catch (error) {
    console.error("Error saving blog:", error);
    res.status(500).json({
      message: "Failed to create blog",
      error,
    });
  }
};

module.exports = {
    get_practice_area_data
};