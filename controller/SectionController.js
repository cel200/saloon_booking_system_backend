const Section = require("../models/Section");

const SectionController = {

  // ✅ Get sections by gender using req.body
  getSectionsByGender: async (req, res) => {
    try {
      const { gender } = req.body;

      if (!gender) {
        return res.status(400).json({
          success: false,
          message: "Gender is required"
        });
      }

      const sections = await Section.find({
        gender: { $regex: new RegExp(`^${gender}$`, "i") },
        isActive: true
      });

      return res.status(200).json({
        success: true,
        count: sections.length,
        data: sections
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch sections",
        error: error.message
      });
    }
  },
  
  addSection: async (req, res) => {
  try {
    const { name, gender } = req.body;

    if (!name || !gender) {
      return res.status(400).json({
        success: false,
        message: "Name and gender are required"
      });
    }

    const newSection = await Section.create({
      name,
      gender
    });

    return res.status(201).json({
      success: true,
      message: "Section created successfully",
      data: newSection
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add section",
      error: error.message
    });
  }
},
getSection:async(req,res)=>{
  try {
     const listSection = await Section.find();
      return res.status(201).json({
      success: true,
      message: "Section listed successfully",
      data: listSection
    });
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: "Failed to list section",
      error: error.message
    });
  }
}
};

module.exports = SectionController;