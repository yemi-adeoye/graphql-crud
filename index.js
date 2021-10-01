const express = require('express');
const app = express();
const PORT = 3030;
const schema = require('./schema');
const { graphqlHTTP } = require('express-graphql');

app.get('/', (req, res) => {
  res.send('<a href="/graphql">Go to GraphQL UI</a>');
});
let restaurants = [
  {
    id: 1,
    name: 'WoodsHill',
    description:
      'American cuisine, farm to table, with fresh produce every day',
    dishes: [
      {
        name: 'Swordfish grill',
        price: 27,
      },
      {
        name: 'Roasted Broccily ',
        price: 11,
      },
    ],
  },
  {
    id: 2,
    name: 'Fiorellas',
    description:
      'Italian-American home cooked food with fresh pasta and sauces',
    dishes: [
      {
        name: 'Flatbread',
        price: 1.45,
      },
      {
        name: 'Carbonara',
        price: 1.15,
      },
      {
        name: 'Spaghetti',
        price: 19,
      },
    ],
  },
  {
    id: 3,
    name: 'Karma',
    description:
      'Malaysian-Chinese-Japanese fusion, with great bar and bartenders',
    dishes: [
      {
        name: 'Dragon Roll',
        price: 12,
      },
      {
        name: 'Pancake roll ',
        price: 11,
      },
      {
        name: 'Cod cakes',
        price: 13,
      },
    ],
  },
];

const root = {
  restaurants: () => {
    return restaurants;
  },

  restaurant: ({ id }) => {
    let restaurant;
    restaurants.forEach((res) => {
      if (res.id == id) {
        restaurant = res;
      }
    });
    return restaurant;
  },
  insertRestaurant: ({ input }) => {
    restaurants.push({
      id: input.id,
      description: input.description,
      name: input.name,
      dishes: input.dishes,
    });
    return input;
  },
  editRestaurant: ({ id, input }) => {
    let data;

    restaurants.forEach((restaurant, count) => {
      if (restaurant.id == id) {
        data = { restaurant, count };
      }
    });

    const { restaurant: restaurantToEdit, count: index } = data;

    const { name, dish, description } = input;

    const editedRestaurant = { ...restaurantToEdit, name, dish, description };

    restaurants[index] = editedRestaurant;

    return editedRestaurant;
  },
  deleteRestaurant: ({ id }) => {
    let lengthBeforeDel = restaurants.length;
    restaurants = restaurants.filter((restaurant, item) => {
      return restaurant.id != id;
    });

    let deleted = restaurants.length < lengthBeforeDel ? true : false;

    return deleted;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    rootValue: root,
    schema,
  })
);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
