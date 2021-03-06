const {
  getAllDishes,
  createDish,
  deleteDish,
  getIngredients,
} = require('./dishController');
const Dish = require('../models/dishModel');
const Ingredient = require('../models/ingredientModel');

jest.mock('../models/dishModel');
jest.mock('../models/ingredientModel');

describe('Given a createDish function', () => {
  describe('When is invoked with body name', () => {
    test('Then should call json', () => {
      const req = { body: { name: 'Canelón de carne' } };
      const res = { json: jest.fn() };

      createDish(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
});

describe('Given a getAllDishes function', () => {
  describe('When is invoked', () => {
    test('Then should call json', async () => {
      const res = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn(),
      };
      const req = {};

      Dish.find.mockReturnValue({ });

      await getAllDishes(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  test('Then should call status with value 500', async () => {
    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };
    const req = {};

    Dish.find.mockImplementationOnce(() => { throw new Error('Error'); });

    await getAllDishes(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Given a getIngredients function', () => {
  describe('When is invoked', () => {
    test('Then should call json', async () => {
      const res = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn(),
      };
      const req = {};

      Ingredient.find.mockReturnValue({ exec: jest.fn() });

      await getIngredients(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  test('Then should call status with value 500', async () => {
    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };
    const req = {};

    Ingredient.find.mockImplementationOnce(() => { throw new Error('Error'); });

    await getIngredients(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Given a deleteDish function', () => {
  describe('When is invoked', () => {
    test('Then should call json', async () => {
      const res = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn(),
      };
      const req = {
        params: {
          id: 1,
        },
      };

      Dish.findByIdAndDelete.mockReturnValue({ });

      await deleteDish(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('When is invoked with a first argument truthy', () => {
    test('Then should call send', async () => {
      const res = {
        json: jest.fn(),
        send: jest.fn(),
        status: jest.fn(),
      };
      const req = {
        params: {
          id: 1,
        },
      };

      Dish.findByIdAndDelete
        .mockImplementationOnce((query, callback) => callback(true));

      await deleteDish(req, res);

      expect(res.send).toHaveBeenCalled();
    });
  });
});
