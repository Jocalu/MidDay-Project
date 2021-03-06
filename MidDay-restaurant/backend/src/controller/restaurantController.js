const Restaurant = require('../models/restaurantModel.js');
const Category = require('../models/categoryModel');
require('../models/menuModel');
require('../models/dishModel');
require('../models/bookingModel');
require('../models/userModel');

const restaurantController = () => {
  const getCategories = async (req, res) => {
    try {
      const categories = await Category
        .find({})
        .exec();

      res.json(categories);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  };

  const addMenusRestaurant = async (req, res) => {
    const { restaurantId } = req.params;

    try {
      const restaurant = await Restaurant
        .findById(restaurantId);

      let { menus } = restaurant;
      if (!menus) { menus = []; }
      menus.push(req.body.menu);
      const updatedRestaurant = await Restaurant
        .findByIdAndUpdate(restaurantId, { menus });

      res.json(updatedRestaurant);
    } catch (error) {
      res.status(500);
      res.send('There was an error searching');
    }
  };

  const addDishesRestaurant = async (req, res) => {
    const { restaurantId } = req.params;

    try {
      const restaurant = await Restaurant
        .findById(restaurantId);

      let { dishes } = restaurant;
      if (!dishes) { dishes = []; }
      dishes.push(req.body.dish);
      const updatedRestaurant = await Restaurant
        .findByIdAndUpdate(restaurantId, { dishes });

      res.json(updatedRestaurant);
    } catch (error) {
      res.status(500);
      res.send('There was an error searching');
    }
  };

  const getRestaurant = async (req, res) => {
    const { restaurantId } = req.params;
    try {
      const restaurant = await Restaurant
        .findById(restaurantId)
        .populate(['category', 'menus', 'dishes', 'bookings', {
          path: 'menus',
          populate: [{ path: 'firstCourse' }, { path: 'secondCourse' }, { path: 'dessert' }],
        },
        {
          path: 'bookings',
          populate: [{ path: 'bookingAdmin' }, { path: 'people', populate: [{ path: 'user' }] }],
        },
        ])
        .exec();

      res.json(restaurant);
    } catch (error) {
      res.status(500);
      res.send('There was an error searching');
    }
  };

  const getAllRestaurants = async (req, res) => {
    try {
      const allRestaurants = await Restaurant
        .find({})
        .populate(['category', 'menus', 'dishes', 'bookings', {
          path: 'menus',
          populate: [{ path: 'firstCourse' }, { path: 'secondCourse' }, { path: 'dessert' }],
        },
        {
          path: 'bookings',
          populate: [{ path: 'bookingAdmin' }, { path: 'people', populate: [{ path: 'user' }] }],
        },
        ])
        .exec();

      res.json(allRestaurants);
    } catch (error) {
      res.status(500);
      res.send('There was an error searching');
    }
  };

  const updateRestaurant = async (req, res) => {
    const { restaurantId } = req.params;

    try {
      const updated = await Restaurant
        .findByIdAndUpdate(restaurantId, req.body, { new: true })
        .populate(['category', 'menu'])
        .exec();

      res.json(updated);
    } catch (error) {
      res.status(500);
      res.send('There was an error updating');
    }
  };

  const deleteRestaurant = async (req, res) => {
    const { restaurantId } = req.params;
    try {
      const restaurant = await Restaurant
        .findByIdAndDelete(restaurantId)
        .exec();

      res.json(restaurant);
    } catch (error) {
      res.status(500);
      res.send('Error');
    }
  };

  return {
    getRestaurant,
    getAllRestaurants,
    updateRestaurant,
    deleteRestaurant,
    getCategories,
    addMenusRestaurant,
    addDishesRestaurant,
  };
};

module.exports = restaurantController();
