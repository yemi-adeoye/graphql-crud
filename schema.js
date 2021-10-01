const { buildSchema } = require('graphql');

const schema = buildSchema(`

    type Dish {
        price: Float
        name: String
    }
    type Restaurant {
        id: ID
        name: String
        description: String
        dishes: [Dish]
    }

    type Query {
        restaurants: [Restaurant]
        restaurant(id: Int): Restaurant
    }
    input DishInput {
        price: Float
        name: String
    }

    input RestaurantInput{
        id: ID
        name: String
        description: String
        dishes: [DishInput]
        
    }

    type Mutation {
        insertRestaurant(input: RestaurantInput): Restaurant
        deleteRestaurant(id: ID!): Boolean
        editRestaurant(id: ID, input: RestaurantInput): Restaurant
    }
`);

module.exports = schema;
