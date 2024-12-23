const Food = require("../models/food")

const foodFilteration = (food, payload) => {
    const {
        searchQuery = "",
        maxPrice = Infinity,
        isVeg = false,
        rating = 0,
        discount = 0
    } = payload;

  return food.filter((item) => {
    const searchQueryLowerCase = searchQuery.toLowerCase();
    const isNameMatch =
      item.name.toLowerCase().includes(searchQueryLowerCase) ||
      item.description.toLowerCase().includes(searchQueryLowerCase) ||
      item.category.toLowerCase().includes(searchQueryLowerCase) ||
      searchQueryLowerCase.length === 0;

    const isPriceMatch = item.price <= maxPrice;
    const isRatingMatch = item.rating >= rating;
    const isDiscountMatch = item.discount >= discount;
    const isVegMatch = isVeg ? item.isVeg : true;
    return isNameMatch && isPriceMatch && isRatingMatch && isDiscountMatch && isVegMatch;
  });
};

exports.getFoodItems = async (req, res) => {
  const { restroId = null } = req.query;
  if (restroId) {
    try {
      const food = await Food.find({ restroId });
      if (!food) {
        return res.status(404).json({ 
            status: "error", 
            message: "Food item not found" 
        });
      }
      const data = foodFilteration(food, req.query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    try {
      const food = await Food.find({});
      if (!food) {
        return res.status(404).json({ 
            status: "error", 
            message: "Food item not found" 
        });
      }
      const data = foodFilteration(food, req.query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

exports.getFoodItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ 
          status: "error", 
          message: "Food item not found" 
      });
    }
    return res.status(200).json({ status: "success", food });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.addFoodItem = async (req, res) => {
  const {
    name,
    description,
    details,
    price,
    category,
    isVeg,
    image,
    availableQuantity,
    discount,
    restroId,
  } = req.body;
  try {
    const food = await Food.create({ name, description, details, price, category, isVeg, image, availableQuantity, discount, restroId });
    console.log("Food Item Added Successfully", food);
    return res.status(201).json({ status: "success", message: "Food Item Added Successfully", food });
  } catch (error) {
    console.log("Error in adding food item", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.updateFoodItem = async (req, res) => {
  console.log("Updating Food Item")
    const {
        name,
        description,
        details,
        price,
        category,
        isVeg,
        image,
        availableQuantity,
        discount,
      } = req.body;

      try{
        const food = await Food.findByIdAndUpdate(req.params.id, { name, description, details, price, category, isVeg, image, availableQuantity, discount }, { new: true });
        if (!food) {
          return res.status(404).json({ 
              status: "error", 
              message: "Food item not found" 
          });
        }
        console.log("Food Item Updated Successfully", food);
        return res.status(200).json({ status: "success", message: "Food Item Updated Successfully", food });
      }catch(error){
        console.log("Error in updating food item", error);
        return res.status(500).json({ message: error.message });
      }
}

exports.deleteFoodItem = async (req, res) => {
    try{
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) {
          return res.status(404).json({ 
              status: "error", 
              message: "Food item not found" 
          });
      }
        console.log("Food Item Deleted Successfully", food);
        return res.status(200).json({ status: "success", message: "Food Item Deleted Successfully", food });
    }catch(error){
        console.log("Error in deleting food item", error);
        return res.status(500).json({ message: error.message });
    }
}

// exports.getFoodItems = (req, res) => {
//     const { restroId = null } = req.params;
//     if (restroId) {
//       Food.find({ restroId })
//         .then((food) => {
//           const data = foodFilteration(food, req.params);
//           return res.send({ status: "success", food: data });
//         })
//         .catch((err) => {
//           return res.send({ message: err });
//         });
//     } else {
//       Food.find({})
//         .then((food) => {
//           const data = foodFilteration(food, req.params);
//           return res.send({ status: "success", food: data });
//         })
//         .catch((err) => {
//           return res.send({ message: err });
//         });
//     }
//   };
