// const AddService = require("../models/AddService");
// const RegisterStaff = require("../models/RegisterStaff");
// const cloudinary = require("../config/cloudinary");
// const AddServiceController = {

//   // ✅ ADD SERVICE
//   addService: async (req, res) => {
//     try {
//       const { serviceName, duration, price, section, description } = req.body;

//       const service = await AddService.create({
//         serviceName,
//         duration,
//         price,
//         section,
//         description,
//         image: req.file ? req.file.path : null, // Cloudinary URL
//       });

//       return res.status(201).json({
//         success: true,
//         message: "Service created successfully",
//         data: service,
//       });

//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Failed to add service",
//         error: error.message,
//       });
//     }
//   },

//   // ✅ LIST SERVICES
//  listService: async (req, res) => {
//   try {
//    const { gender, section } = req.body || {};

//     let filter = {};

//     // add section filter only if provided
//     if (section) {
//       filter.section = section;
//     }

//     const list = await AddService.find(filter).populate({
//       path: "section",
//       match: gender ? { gender: gender } : {}  // apply gender filter only if provided
//     });

//     // remove services where section didn't match gender
//     const filteredList = gender
//       ? list.filter(service => service.section !== null)
//       : list;

//     return res.status(200).json({
//       success: true,
//       count: filteredList.length,
//       data: filteredList,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to list services",
//       error: error.message,
//     });
//   }
// },

//   // ✅ UPDATE SERVICE (with image update support)
//   updateService: async (req, res) => {
//     try {
//       const { id, serviceName, duration, price, section, description } = req.body;

//       if (!id) {
//         return res.status(400).json({
//           success: false,
//           message: "Service ID is required",
//         });
//       }

//       const service = await AddService.findById(id);
//       if (!service) {
//         return res.status(404).json({
//           success: false,
//           message: "Service not found",
//         });
//       }

//       // 🔥 If new image uploaded → delete old image from Cloudinary
//       if (req.file && service.image) {
//         const publicId = service.image.split("/").pop().split(".")[0];
//         await cloudinary.uploader.destroy(`salon_services/${publicId}`);
//       }

//       // Update fields
//       if (serviceName) service.serviceName = serviceName;
//       if (duration) service.duration = duration;
//       if (price !== undefined) service.price = price;
//       if (section) service.section = section;
//       if (description) service.description = description;
//       if (req.file) service.image = req.file.path;

//       await service.save();

//       return res.status(200).json({
//         success: true,
//         message: "Service updated successfully",
//         data: service,
//       });

//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Failed to update service",
//         error: error.message,
//       });
//     }
//   },

//   // ✅ DELETE SERVICE (delete image from Cloudinary too)
//   deleteService: async (req, res) => {
//     try {
//       const { id } = req.body;

//       const service = await AddService.findById(id);
//       if (!service) {
//         return res.status(404).json({
//           success: false,
//           message: "Service not found",
//         });
//       }

//       // 🔥 Delete image from Cloudinary
//       if (service.image) {
//         const publicId = service.image.split("/").pop().split(".")[0];
//         await cloudinary.uploader.destroy(`salon_services/${publicId}`);
//       }

//       await AddService.findByIdAndDelete(id);

//       return res.status(200).json({
//         success: true,
//         message: "Service deleted successfully",
//       });

//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Failed to delete service",
//         error: error.message,
//       });
//     }
//   },
// };

// // module.exports = AddServiceController;
// module.exports = AddServiceController;

const AddService = require("../models/AddService");
const RegisterStaff = require("../models/RegisterStaff");
const cloudinary = require("../config/cloudinary");
const AddServiceController = {

  // ✅ ADD SERVICE
  addService: async (req, res) => {
    try {
      const { serviceName, duration, price, section, description,isfeatured } = req.body;

      const service = await AddService.create({
        serviceName,
        duration,
        price,
        section,
        description,
        image: req.file ? req.file.path : null, // Cloudinary URL
        isfeatured
      });

      return res.status(201).json({
        success: true,
        message: "Service created successfully",
        data: service,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to add service",
        error: error.message,
      });
    }
  },
 getFeaturedServices : async (req, res) => {
  try {
    const services = await AddService.find({ isFeatured: true })
      .populate("section");

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
},
  // ✅ LIST SERVICES
 listService: async (req, res) => {
  try {
   const { gender, section } = req.body || {};

    let filter = {};

    // add section filter only if provided
    if (section) {
      filter.section = section;
    }

    const list = await AddService.find(filter).populate({
      path: "section",
      match: gender ? { gender: gender } : {}  // apply gender filter only if provided
    });

    // remove services where section didn't match gender
    const filteredList = gender
      ? list.filter(service => service.section !== null)
      : list;

    return res.status(200).json({
      success: true,
      count: filteredList.length,
      data: filteredList,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to list services",
      error: error.message,
    });
  }
},

  // ✅ UPDATE SERVICE (with image update support)
  updateService: async (req, res) => {
    try {
      const { id, serviceName, duration, price, section, description,isFeatured } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Service ID is required",
        });
      }

      const service = await AddService.findById(id);
      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      // 🔥 If new image uploaded → delete old image from Cloudinary
      if (req.file && service.image) {
        const publicId = service.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`salon_services/${publicId}`);
      }

      // Update fields
      if (serviceName) service.serviceName = serviceName;
      if (duration) service.duration = duration;
      if (price !== undefined) service.price = price;
      if (section) service.section = section;
      if (description) service.description = description;
      if(isFeatured) service.isFeatured = isFeatured;
      if (req.file) service.image = req.file.path;

      await service.save();

      return res.status(200).json({
        success: true,
        message: "Service updated successfully",
        data: service,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update service",
        error: error.message,
      });
    }
  },

  // ✅ DELETE SERVICE (delete image from Cloudinary too)
  deleteService: async (req, res) => {
    try {
      const { id } = req.body;

      const service = await AddService.findById(id);
      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      // 🔥 Delete image from Cloudinary
      if (service.image) {
        const publicId = service.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`salon_services/${publicId}`);
      }

      await AddService.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Service deleted successfully",
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete service",
        error: error.message,
      });
    }
  },
};

// module.exports = AddServiceController;
module.exports = AddServiceController;