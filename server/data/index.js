// Sample data for the backend

import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const recipeIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
]

export const users = [
  {
    _id: userIds[0],
    username: "FlavorFusion",
    password: "$2b$10$6EL4O3Jy6WOHzje6Ck16y.t/K.VdYDryjArU027KnfrE3fNZ8HMcW",
    email: "flavorfusion@gmail.com",
    followers: new Map([
        [userIds[1], true],
    ]),
    following: new Map([
        [userIds[1], true],
        [userIds[2], true],
    ]),
    savedRecipes: new Map([
        [recipeIds[1], true],
        [recipeIds[2], true],
    ]),
    createdAt: "2023-08-23T02:31:53.515Z",
    updatedAt: "2023-08-23T02:31:53.515Z",
    __v: 0,
  },
  {
    _id: userIds[1],
    username: "YummyYam",
    password: "$2b$10$KnhwcnpTKHNP23fj2aedXuOiTa9rIjvbqXnnF3WZ5pMq0jBQ9Ro8W",
    email: "yummyyam@gmail.com",
    followers: new Map([
        [userIds[0], true],
        [userIds[2], true],
    ]),
    following: new Map([
        [userIds[0], true],
    ]),
    savedRecipes: new Map([
        [recipeIds[3], true],
        [recipeIds[4], true],
    ]),
    createdAt: "2023-08-23T02:31:53.515Z",
    updatedAt: "2023-08-23T02:31:53.515Z",
    __v: 0,
  },
  {
    _id: userIds[2],
    username: "DishDelights",
    password: "$2b$10$IwAA/Y2re44HMu9skIe8c.w5cjfMfklBsKtS.Z7Pn55v9DIFHkoo2",
    email: "disgdelight@gmail.com",
    followers: new Map([
        [userIds[0], true],
    ]),
    following: new Map([
        [userIds[1], true],
    ]),
    savedRecipes: new Map([
        [recipeIds[0], true],
    ]),
    createdAt: "2023-08-23T02:31:53.515Z",
    updatedAt: "2023-08-23T02:31:53.515Z",
    __v: 0,
  },
];

export const recipes = [
  {
    _id: recipeIds[0],
    name: "Macaroni Salad",
    description: "A classic pasta salad with a creamy dressing, perfect for picnics and gatherings.",
    ingredients: ["macaroni", "mayonnaise", "ham", "carrots", "onion"],
    instructions: "Boil macaroni, mix with mayonnaise, add diced ham, shredded carrots, and chopped onion. Chill before serving.",
    imagePath: "https://res.cloudinary.com/dinwkz2rq/image/upload/v1693194511/secret-spice/sample/macaroni_salad_bm8gol.jpg",
    cookingTime: 25,
    likes: {},
    averageRating: 0,
    comments: [],
    userOwner: userIds[0],
    createdAt: "2023-08-23T02:39:21.265Z",
    updatedAt: "2023-08-23T02:39:21.265Z",
    __v: 0,
  },
  {
    _id: recipeIds[1],
    name: "Beef Steak",
    description: "A savory Filipino dish featuring marinated and pan-fried beef slices.",
    ingredients: ["beef", "soy sauce", "calamansi", "onion", "garlic"],
    instructions: "Marinate beef in soy sauce, calamansi juice, garlic, and pepper. Pan-fry with sliced onions until beef is cooked and caramelized.",
    imagePath: "https://res.cloudinary.com/dinwkz2rq/image/upload/v1693194512/secret-spice/sample/beef_steak_zkmyb1.jpg",
    cookingTime: 35,
    likes: {},
    averageRating: 0,
    comments: [],
    userOwner: userIds[1],
    createdAt: "2023-08-23T02:38:38.795Z",
    updatedAt: "2023-08-23T02:38:38.795Z",
    __v: 0,
  },
  {
    _id: recipeIds[2],
    name: "Caldereta",
    description: "A hearty Filipino stew made with tender meat and vegetables in a rich tomato sauce.",
    ingredients: ["beef", "potato", "carrots", "bell pepper", "tomato sauce"],
    instructions: "Brown beef, sauté vegetables, add tomato sauce and broth. Simmer until meat is tender and sauce thickens.",
    imagePath: "https://res.cloudinary.com/dinwkz2rq/image/upload/v1693194471/secret-spice/sample/caldereta_zpoqtb.jpg",
    cookingTime: 90,
    likes: {},
    averageRating: 0,
    comments: [],
    userOwner: userIds[1],
    createdAt: "2023-08-23T02:38:14.060Z",
    updatedAt: "2023-08-23T02:38:14.060Z",
    __v: 0,
  },
  {
    _id: recipeIds[3],
    name: "Sinigang",
    description: "A comforting Filipino soup known for its sour and savory flavors.",
    ingredients: ["pork", "tamarind", "vegetables", "onion", "fish sauce"],
    instructions: "Boil pork with tamarind broth, add vegetables and onion. Season with fish sauce. Simmer until pork is tender and flavors meld.",
    imagePath: "https://res.cloudinary.com/dinwkz2rq/image/upload/v1693194470/secret-spice/sample/sinigang_cup5ly.jpg",
    cookingTime: 45,
    likes: {},
    averageRating: 0,
    comments: [],
    userOwner: userIds[2],
    createdAt: "2023-08-23T02:37:35.921Z",
    updatedAt: "2023-08-23T02:37:35.921Z",
    __v: 0,
  },
  {
    _id: recipeIds[4],
    name: "Chicken Adobo",
    description: "A classic Filipino comfort food with a perfect balance of savory and tangy flavors.",
    ingredients: ["chicken", "soy sauce", "vinegar", "garlic", "peppercorns", "bay leaves",
    ],
    instructions: "Combine chicken, soy sauce, vinegar, garlic, peppercorns, and bay leaves in a pot. Let it marinate, then simmer until the chicken is tender and the flavors meld.",
    imagePath: "https://res.cloudinary.com/dinwkz2rq/image/upload/v1693194472/secret-spice/sample/Adobo-chicken-9894-2-500x500_tj5e0m.jpg",
    cookingTime: 60,
    likes: {},
    averageRating: 0,
    comments: [],
    userOwner: userIds[2],
    createdAt: "2023-08-23T02:36:53.317Z",
    updatedAt: "2023-08-23T02:36:53.317Z",
    __v: 0,
  },
];
