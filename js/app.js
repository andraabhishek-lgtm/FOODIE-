/* =====================================================
   FOODIE EXPRESS - Core App Logic
   ===================================================== */

'use strict';

// ---- DATA ----

const CATEGORIES = [
  { id: 'pizza', name: 'Pizza', icon: '🍕', count: 48 },
  { id: 'burger', name: 'Burger', icon: '🍔', count: 36 },
  { id: 'biryani', name: 'Biryani', icon: '🍛', count: 29 },
  { id: 'south-indian', name: 'South Indian', icon: '🥘', count: 22 },
  { id: 'chinese', name: 'Chinese', icon: '🥡', count: 31 },
  { id: 'desserts', name: 'Desserts', icon: '🍰', count: 40 },
  { id: 'beverages', name: 'Beverages', icon: '🧃', count: 25 },
  { id: 'healthy', name: 'Healthy', icon: '🥗', count: 18 },
  { id: 'fast-food', name: 'Fast Food', icon: '🌮', count: 44 },
  { id: 'vegetarian', name: 'Vegetarian', icon: '🥦', count: 33 },
];

const RESTAURANTS = [
  {
    id: 1,
    name: 'Spice Garden',
    cuisine: 'North Indian, Mughlai',
    rating: 4.7,
    ratingCount: 2340,
    deliveryTime: '25-35',
    distance: '1.2 km',
    minOrder: 199,
    deliveryFee: 30,
    status: 'open',
    featured: true,
    discount: '40% OFF up to ₹120',
    tags: ['North Indian', 'Mughlai', 'Biryani'],
    img: '../images/photo-1517248135467-4c7edcad34c4.webp',
    category: 'biryani',
    priceRange: '$$',
  },
  {
    id: 2,
    name: 'The Burger Lab',
    cuisine: 'American, Fast Food',
    rating: 4.5,
    ratingCount: 1890,
    deliveryTime: '20-30',
    distance: '0.8 km',
    minOrder: 149,
    deliveryFee: 25,
    status: 'open',
    featured: true,
    discount: '20% OFF',
    tags: ['Burgers', 'Wraps', 'Shakes'],
    img: '../images/photo-1555396273-367ea4eb4db5.webp',
    category: 'burger',
    priceRange: '$$',
  },
  {
    id: 3,
    name: 'Pizza Paradise',
    cuisine: 'Italian, Continental',
    rating: 4.6,
    ratingCount: 3120,
    deliveryTime: '30-40',
    distance: '1.5 km',
    minOrder: 249,
    deliveryFee: 0,
    status: 'open',
    featured: false,
    discount: 'Free Delivery',
    tags: ['Pizza', 'Pasta', 'Calzone'],
    img: '../images/photo-1414235077428-338989a2e8c0.webp',
    category: 'pizza',
    priceRange: '$$$',
  },
  {
    id: 4,
    name: 'Dragon Palace',
    cuisine: 'Chinese, Pan Asian',
    rating: 4.3,
    ratingCount: 1450,
    deliveryTime: '35-45',
    distance: '2.1 km',
    minOrder: 199,
    deliveryFee: 35,
    status: 'open',
    featured: false,
    discount: '15% OFF',
    tags: ['Chinese', 'Thai', 'Dim Sum'],
    img: '../images/photo-1537047902294-62a40c20a6ae.webp',
    category: 'chinese',
    priceRange: '$$',
  },
  {
    id: 5,
    name: 'Green Bowl',
    cuisine: 'Healthy, Salads, Vegan',
    rating: 4.8,
    ratingCount: 987,
    deliveryTime: '20-30',
    distance: '0.5 km',
    minOrder: 179,
    deliveryFee: 20,
    status: 'open',
    featured: true,
    discount: '10% OFF',
    tags: ['Healthy', 'Vegan', 'Salads'],
    img: '../images/photo-1512621776951-a57141f2eefd.webp',
    category: 'healthy',
    priceRange: '$$$',
  },
  {
    id: 6,
    name: 'Sweet Tooth',
    cuisine: 'Desserts, Bakery, Ice Cream',
    rating: 4.9,
    ratingCount: 2100,
    deliveryTime: '15-25',
    distance: '0.3 km',
    minOrder: 99,
    deliveryFee: 15,
    status: 'open',
    featured: false,
    discount: '₹50 OFF on ₹300+',
    tags: ['Desserts', 'Cakes', 'Ice Cream'],
    img: '../images/photo-1551024506-0bccd828d307.webp',
    category: 'desserts',
    priceRange: '$$',
  },
  {
    id: 7,
    name: 'The Biryani House',
    cuisine: 'Biryani, Hyderabadi',
    rating: 4.6,
    ratingCount: 4560,
    deliveryTime: '30-40',
    distance: '1.8 km',
    minOrder: 199,
    deliveryFee: 30,
    status: 'open',
    featured: true,
    discount: '30% OFF up to ₹90',
    tags: ['Biryani', 'Kebabs', 'Hyderabadi'],
    img: '../images/photo-1563379091339-03b21ab4a4f8.webp',
    category: 'biryani',
    priceRange: '$$',
  },
  {
    id: 8,
    name: 'Dosa Delight',
    cuisine: 'South Indian, Breakfast',
    rating: 4.4,
    ratingCount: 1230,
    deliveryTime: '20-35',
    distance: '1.0 km',
    minOrder: 149,
    deliveryFee: 20,
    status: 'closed',
    featured: false,
    discount: null,
    tags: ['Dosa', 'Idli', 'South Indian'],
    img: '../images/photo-1668236543090-82eba5ee5976.webp',
    category: 'south-indian',
    priceRange: '$',
  },
  {
    id: 9,
    name: 'Taco Fiesta',
    cuisine: 'Mexican, Fast Food',
    rating: 4.2,
    ratingCount: 876,
    deliveryTime: '25-35',
    distance: '1.6 km',
    minOrder: 179,
    deliveryFee: 30,
    status: 'open',
    featured: false,
    discount: 'Buy 2 Get 1 Free',
    tags: ['Mexican', 'Tacos', 'Nachos'],
    img: '../images/photo-1562967914-608f82629710.webp',
    category: 'fast-food',
    priceRange: '$$',
  },
  {
    id: 10,
    name: 'Smoothie Bar',
    cuisine: 'Beverages, Juices, Smoothies',
    rating: 4.5,
    ratingCount: 654,
    deliveryTime: '15-20',
    distance: '0.4 km',
    minOrder: 99,
    deliveryFee: 15,
    status: 'open',
    featured: false,
    discount: '2nd at 50% OFF',
    tags: ['Smoothies', 'Juices', 'Shakes'],
    img: '../images/photo-1544145945-f90425340c7e.webp',
    category: 'beverages',
    priceRange: '$',
  },
  {
    id: 11,
    name: 'Pasta Palace',
    cuisine: 'Italian, Continental',
    rating: 4.6,
    ratingCount: 1340,
    deliveryTime: '30-40',
    distance: '2.0 km',
    minOrder: 249,
    deliveryFee: 40,
    status: 'open',
    featured: false,
    discount: '25% OFF',
    tags: ['Pasta', 'Pizza', 'Risotto'],
    img: '../images/photo-1555396273-367ea4eb4db5.webp',
    category: 'pizza',
    priceRange: '$$$',
  },
  {
    id: 12,
    name: 'Street Food Corner',
    cuisine: 'Indian Street Food, Chaat',
    rating: 4.3,
    ratingCount: 2670,
    deliveryTime: '20-30',
    distance: '0.9 km',
    minOrder: 99,
    deliveryFee: 20,
    status: 'open',
    featured: false,
    discount: '₹30 OFF',
    tags: ['Chaat', 'Pav Bhaji', 'Bhel'],
    img: '../images/photo-1504674900247-0877df9cc836.webp',
    category: 'fast-food',
    priceRange: '$',
  },
  {
    id: 13,
    name: 'Mumbai Tadka',
    cuisine: 'North Indian, Maharashtrian',
    rating: 4.5,
    ratingCount: 3210,
    deliveryTime: '25-35',
    distance: '1.4 km',
    minOrder: 179,
    deliveryFee: 25,
    status: 'open',
    featured: true,
    discount: '20% OFF up to ₹80',
    tags: ['Vada Pav', 'Pav Bhaji', 'North Indian'],
    img: '../images/photo-1601050690597-df0568f70950.webp',
    category: 'biryani',
    priceRange: '$$',
  },
  {
    id: 14,
    name: 'Sushi Sumo',
    cuisine: 'Japanese, Pan Asian',
    rating: 4.7,
    ratingCount: 1120,
    deliveryTime: '35-50',
    distance: '2.8 km',
    minOrder: 399,
    deliveryFee: 50,
    status: 'open',
    featured: true,
    discount: 'Free Miso Soup',
    tags: ['Sushi', 'Ramen', 'Tempura'],
    img: '../images/photo-1553621042-f6e147245754.webp',
    category: 'chinese',
    priceRange: '$$$',
  },
  {
    id: 15,
    name: 'Andhra Spice',
    cuisine: 'South Indian, Telugu, Andhra',
    rating: 4.6,
    ratingCount: 2890,
    deliveryTime: '20-35',
    distance: '1.1 km',
    minOrder: 149,
    deliveryFee: 20,
    status: 'open',
    featured: false,
    discount: '15% OFF',
    tags: ['Pesarattu', 'Gongura', 'Biryani'],
    img: '../images/photo-1455619452474-d2be8b1e70cd.webp',
    category: 'south-indian',
    priceRange: '$$',
  },
  {
    id: 16,
    name: 'The Waffle Bar',
    cuisine: 'Desserts, Belgian Waffles, Crepes',
    rating: 4.8,
    ratingCount: 1760,
    deliveryTime: '15-25',
    distance: '0.7 km',
    minOrder: 149,
    deliveryFee: 20,
    status: 'open',
    featured: false,
    discount: '₹40 OFF on ₹250+',
    tags: ['Waffles', 'Crepes', 'Gelato'],
    img: '../images/photo-1562376552-0d160a2f238d.webp',
    category: 'desserts',
    priceRange: '$$',
  },
  {
    id: 17,
    name: 'Wok & Roll',
    cuisine: 'Chinese, Noodles, Stir Fry',
    rating: 4.4,
    ratingCount: 980,
    deliveryTime: '30-40',
    distance: '1.9 km',
    minOrder: 199,
    deliveryFee: 30,
    status: 'open',
    featured: false,
    discount: 'Buy 1 Get 1 Noodles',
    tags: ['Noodles', 'Stir Fry', 'Momos'],
    img: '../images/photo-1562802378-063ec186a863.webp',
    category: 'chinese',
    priceRange: '$$',
  },
  {
    id: 18,
    name: 'Protein Kitchen',
    cuisine: 'Healthy, High-Protein, Keto',
    rating: 4.7,
    ratingCount: 670,
    deliveryTime: '20-30',
    distance: '1.3 km',
    minOrder: 299,
    deliveryFee: 35,
    status: 'open',
    featured: false,
    discount: '10% OFF',
    tags: ['Keto', 'High Protein', 'Bowls'],
    img: '../images/photo-1490645935967-10de6ba17061.webp',
    category: 'healthy',
    priceRange: '$$$',
  },
  {
    id: 19,
    name: 'Wrap Republic',
    cuisine: 'Fast Food, Rolls, Kathi Wraps',
    rating: 4.2,
    ratingCount: 1540,
    deliveryTime: '15-25',
    distance: '0.6 km',
    minOrder: 99,
    deliveryFee: 15,
    status: 'open',
    featured: false,
    discount: '3 Wraps at ₹249',
    tags: ['Wraps', 'Kathi Rolls', 'Fries'],
    img: '../images/photo-1534938665420-4193effeacc4.webp',
    category: 'fast-food',
    priceRange: '$',
  },
  {
    id: 20,
    name: 'Boba & Brews',
    cuisine: 'Beverages, Bubble Tea, Cold Coffee',
    rating: 4.6,
    ratingCount: 890,
    deliveryTime: '15-20',
    distance: '0.5 km',
    minOrder: 99,
    deliveryFee: 15,
    status: 'open',
    featured: false,
    discount: '2nd Drink 50% OFF',
    tags: ['Bubble Tea', 'Cold Coffee', 'Frappes'],
    img: '../images/photo-1558618666-fcd25c85cd64.webp',
    category: 'beverages',
    priceRange: '$$',
  },
];

const MENU_ITEMS = [
  // Spice Garden (id: 1)
  { id: 101, restaurantId: 1, name: 'Chicken Biryani', category: 'Biryani', price: 299, originalPrice: 349, rating: 4.8, isVeg: false, isSpicy: true, description: 'Aromatic basmati rice cooked with tender chicken, saffron and whole spices.', img: '../images/photo-1563379091339-03b21ab4a4f8.webp', popular: true },
  { id: 102, restaurantId: 1, name: 'Paneer Butter Masala', category: 'Curries', price: 249, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: false, description: 'Creamy tomato-based curry with soft paneer cubes, rich in flavour.', img: '../images/photo-1585937421612-70a008356fbe.webp', popular: true },
  { id: 103, restaurantId: 1, name: 'Dal Makhani', category: 'Curries', price: 199, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: false, description: 'Slow-cooked black lentils in a rich buttery tomato cream sauce.', img: '../images/photo-1546833999-b9f581a1996d.webp', popular: false },
  { id: 104, restaurantId: 1, name: 'Mutton Rogan Josh', category: 'Curries', price: 389, originalPrice: 420, rating: 4.7, isVeg: false, isSpicy: true, description: 'Slow-braised mutton in Kashmiri spices with aromatic gravy.', img: '../images/photo-1574484284002-952d92456975.webp', popular: false },
  { id: 105, restaurantId: 1, name: 'Garlic Naan', category: 'Breads', price: 49, originalPrice: null, rating: 4.4, isVeg: true, isSpicy: false, description: 'Soft fluffy naan topped with garlic butter and cilantro.', img: '../images/photo-1590502593747-42a996133562.webp', popular: true },
  { id: 106, restaurantId: 1, name: 'Mango Lassi', category: 'Beverages', price: 89, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: false, description: 'Thick creamy yogurt blended with fresh Alphonso mangoes.', img: '../images/photo-1602343168117-bb8ffe3e2e9f.webp', popular: false },

  // The Burger Lab (id: 2)
  { id: 201, restaurantId: 2, name: 'Classic Smash Burger', category: 'Burgers', price: 249, originalPrice: 299, rating: 4.8, isVeg: false, isSpicy: false, description: 'Double smash patty with American cheese, special sauce on brioche.', img: '../images/photo-1568901346375-23c9450c58cd.webp', popular: true },
  { id: 202, restaurantId: 2, name: 'Veggie Delight Burger', category: 'Burgers', price: 199, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: false, description: 'Crispy veggie patty with fresh lettuce, tomato and mayo.', img: '../images/photo-1520072959219-c595dc870360.webp', popular: true },
  { id: 203, restaurantId: 2, name: 'Loaded Fries', category: 'Sides', price: 149, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: false, description: 'Crispy fries loaded with cheese sauce, jalapeños and sour cream.', img: '../images/photo-1630384060421-cb20d0e0649d.webp', popular: true },
  { id: 204, restaurantId: 2, name: 'BBQ Chicken Burger', category: 'Burgers', price: 279, originalPrice: 320, rating: 4.7, isVeg: false, isSpicy: false, description: 'Grilled chicken with smoky BBQ sauce, crunchy slaw and pickles.', img: '../images/photo-1553979459-d2229ba7433b.webp', popular: false },
  { id: 205, restaurantId: 2, name: 'Chocolate Milkshake', category: 'Shakes', price: 169, originalPrice: null, rating: 4.8, isVeg: true, isSpicy: false, description: 'Thick rich chocolate milkshake with whipped cream and brownie chunks.', img: '../images/photo-1576092768241-dec231879fc3.webp', popular: false },
  { id: 206, restaurantId: 2, name: 'Spicy Jalapeño Burger', category: 'Burgers', price: 269, originalPrice: null, rating: 4.6, isVeg: false, isSpicy: true, description: 'Beef patty with pickled jalapeños, pepper jack cheese and chipotle mayo.', img: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 207, restaurantId: 2, name: 'Mushroom Swiss Burger', category: 'Burgers', price: 219, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: false, description: 'Juicy veggie patty topped with sautéed mushrooms and melted Swiss cheese.', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 208, restaurantId: 2, name: 'Onion Rings', category: 'Sides', price: 109, originalPrice: null, rating: 4.4, isVeg: true, isSpicy: false, description: 'Crispy golden battered onion rings served with tangy dipping sauce.', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 209, restaurantId: 2, name: 'Chicken Wings (6 pcs)', category: 'Sides', price: 229, originalPrice: 259, rating: 4.7, isVeg: false, isSpicy: true, description: 'Crispy chicken wings tossed in smoky buffalo sauce with ranch dip.', img: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 210, restaurantId: 2, name: 'Mac & Cheese Bites', category: 'Sides', price: 129, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: false, description: 'Breaded and fried macaroni cheese balls with a gooey cheesy centre.', img: 'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 211, restaurantId: 2, name: 'Vanilla Milkshake', category: 'Shakes', price: 149, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: false, description: 'Classic creamy vanilla shake topped with whipped cream and a cherry.', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 212, restaurantId: 2, name: 'Strawberry Shake', category: 'Shakes', price: 159, originalPrice: null, rating: 4.7, isVeg: true, isSpicy: false, description: 'Fresh strawberries blended with ice cream, topped with whipped cream.', img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 213, restaurantId: 2, name: 'Oreo Shake', category: 'Shakes', price: 179, originalPrice: null, rating: 4.9, isVeg: true, isSpicy: false, description: 'Crushed Oreo cookies blended with vanilla ice cream to silky perfection.', img: 'https://images.unsplash.com/photo-1619158401201-8fa2f5252b3c?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },

  // Pizza Paradise (id: 3)
  { id: 301, restaurantId: 3, name: 'Margherita Pizza', category: 'Pizzas', price: 299, originalPrice: null, rating: 4.7, isVeg: true, isSpicy: false, description: 'Classic Neapolitan pizza with San Marzano tomatoes and mozzarella.', img: '../images/photo-1513104890138-7c749659a591.webp', popular: true },
  { id: 302, restaurantId: 3, name: 'Pepperoni Pizza', category: 'Pizzas', price: 399, originalPrice: 449, rating: 4.9, isVeg: false, isSpicy: false, description: 'Loaded with premium pepperoni on rich tomato sauce and mozzarella.', img: '../images/photo-1628840042765-356cda07504e.webp', popular: true },
  { id: 303, restaurantId: 3, name: 'BBQ Chicken Pizza', category: 'Pizzas', price: 449, originalPrice: 499, rating: 4.8, isVeg: false, isSpicy: false, description: 'Smoky BBQ base with grilled chicken, red onions and bell peppers.', img: '../images/photo-1565299624946-b28f40a0ae38.webp', popular: false },
  { id: 304, restaurantId: 3, name: 'Pasta Arrabbiata', category: 'Pasta', price: 279, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: true, description: 'Penne pasta in spicy tomato sauce with garlic and fresh basil.', img: '../images/photo-1621996346565-e3dbc646d9a9.webp', popular: false },
  { id: 305, restaurantId: 3, name: 'Tiramisu', category: 'Desserts', price: 199, originalPrice: null, rating: 4.9, isVeg: true, isSpicy: false, description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone.', img: '../images/photo-1551024506-0bccd828d307.webp', popular: true },

  // Dragon Palace (id: 4)
  { id: 401, restaurantId: 4, name: 'Chicken Fried Rice', category: 'Rice', price: 199, originalPrice: null, rating: 4.4, isVeg: false, isSpicy: false, description: 'Wok-tossed egg fried rice with juicy chicken and seasonal vegetables.', img: '../images/photo-1603133872878-684f208fb84b.webp', popular: true },
  { id: 402, restaurantId: 4, name: 'Dim Sum Platter', category: 'Starters', price: 299, originalPrice: 349, rating: 4.6, isVeg: false, isSpicy: false, description: 'Assorted steamed and fried dim sums with ginger soy dipping sauce.', img: '../images/photo-1563245372-f21724e3856d.webp', popular: true },
  { id: 403, restaurantId: 4, name: 'Hot & Sour Soup', category: 'Soups', price: 149, originalPrice: null, rating: 4.3, isVeg: false, isSpicy: true, description: 'Classic tangy spicy soup with mushrooms, tofu and bamboo shoots.', img: '../images/photo-1547592180-85f173990554.webp', popular: false },
  { id: 404, restaurantId: 4, name: 'Kung Pao Chicken', category: 'Main Course', price: 279, originalPrice: null, rating: 4.5, isVeg: false, isSpicy: true, description: 'Stir-fried chicken with peanuts, dried chillies and Sichuan pepper.', img: '../images/photo-1525755662778-989d0524087e.webp', popular: false },

  // Green Bowl (id: 5)
  { id: 501, restaurantId: 5, name: 'Acai Bowl', category: 'Bowls', price: 289, originalPrice: null, rating: 4.9, isVeg: true, isSpicy: false, description: 'Frozen acai blended with banana, topped with granola, fruits and honey.', img: '../images/photo-1534353436294-0dbd4bdac845.webp', popular: true },
  { id: 502, restaurantId: 5, name: 'Caesar Salad', category: 'Salads', price: 249, originalPrice: null, rating: 4.7, isVeg: true, isSpicy: false, description: 'Crisp romaine with parmesan, croutons and classic Caesar dressing.', img: '../images/photo-1512621776951-a57141f2eefd.webp', popular: true },
  { id: 503, restaurantId: 5, name: 'Green Detox Smoothie', category: 'Smoothies', price: 199, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: false, description: 'Spinach, cucumber, apple, lemon and ginger blended fresh.', img: '../images/photo-1610970881699-44a5587cabec.webp', popular: false },
  { id: 504, restaurantId: 5, name: 'Quinoa Buddha Bowl', category: 'Bowls', price: 329, originalPrice: 369, rating: 4.8, isVeg: true, isSpicy: false, description: 'Quinoa with roasted veggies, avocado, chickpeas and tahini dressing.', img: '../images/photo-1512621776951-a57141f2eefd.webp', popular: false },

  // Sweet Tooth (id: 6)
  { id: 601, restaurantId: 6, name: 'Chocolate Lava Cake', category: 'Cakes', price: 189, originalPrice: null, rating: 4.9, isVeg: true, isSpicy: false, description: 'Warm chocolate cake with gooey molten centre, served with vanilla ice cream.', img: '../images/photo-1606890658317-7d14490b76fd.webp', popular: true },
  { id: 602, restaurantId: 6, name: 'Belgian Waffle', category: 'Waffles', price: 179, originalPrice: 199, rating: 4.8, isVeg: true, isSpicy: false, description: 'Crispy fluffy waffle with maple syrup, fresh berries and whipped cream.', img: '../images/photo-1562376552-0d160a2f238d.webp', popular: true },
  { id: 603, restaurantId: 6, name: 'Mango Cheesecake', category: 'Cakes', price: 229, originalPrice: null, rating: 4.7, isVeg: true, isSpicy: false, description: 'Silky smooth cheesecake with Alphonso mango coulis on buttery crust.', img: '../images/photo-1621303837174-89787a7d4729.webp', popular: false },
  { id: 604, restaurantId: 6, name: 'Kulfi Falooda', category: 'Ice Cream', price: 149, originalPrice: null, rating: 4.8, isVeg: true, isSpicy: false, description: 'Traditional Indian ice cream with basil seeds, rose syrup and vermicelli.', img: '../images/photo-1568909344668-6f14a07b56a0.webp', popular: true },

  // Wok & Roll (id: 17)
  { id: 1701, restaurantId: 17, name: 'Hakka Noodles', category: 'Noodles', price: 179, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: false, description: 'Wok-tossed hakka noodles with fresh vegetables in a light soy sauce.', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1702, restaurantId: 17, name: 'Schezwan Chicken Noodles', category: 'Noodles', price: 219, originalPrice: 249, rating: 4.7, isVeg: false, isSpicy: true, description: 'Spicy Schezwan sauce tossed noodles with juicy chicken strips and spring onions.', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1703, restaurantId: 17, name: 'Singapore Noodles', category: 'Noodles', price: 229, originalPrice: null, rating: 4.4, isVeg: false, isSpicy: true, description: 'Thin rice vermicelli with shrimp, char siu pork and curry powder.', img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1704, restaurantId: 17, name: 'Veg Chow Mein', category: 'Noodles', price: 169, originalPrice: null, rating: 4.3, isVeg: true, isSpicy: false, description: 'Crispy pan-fried noodles with seasonal vegetables in oyster sauce.', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1705, restaurantId: 17, name: 'Steamed Veg Momos (8 pcs)', category: 'Momos', price: 149, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: false, description: 'Soft steamed dumplings stuffed with cabbage, carrot and ginger, with red chutney.', img: '../images/photo-1563245372-f21724e3856d.webp', popular: true },
  { id: 1706, restaurantId: 17, name: 'Pan Fried Chicken Momos (8 pcs)', category: 'Momos', price: 179, originalPrice: 199, rating: 4.6, isVeg: false, isSpicy: false, description: 'Juicy chicken momos pan-fried till golden, served with spicy dipping sauce.', img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1707, restaurantId: 17, name: 'Tandoori Momos (6 pcs)', category: 'Momos', price: 199, originalPrice: null, rating: 4.8, isVeg: false, isSpicy: true, description: 'Charcoal-grilled momos marinated in tandoori spices, served with mint chutney.', img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1708, restaurantId: 17, name: 'Chicken Stir Fry in Black Bean', category: 'Stir Fry', price: 259, originalPrice: null, rating: 4.6, isVeg: false, isSpicy: false, description: 'Tender chicken strips wok-tossed with broccoli and bell peppers in black bean sauce.', img: '../images/photo-1525755662778-989d0524087e.webp', popular: true },
  { id: 1709, restaurantId: 17, name: 'Tofu & Veggie Stir Fry', category: 'Stir Fry', price: 219, originalPrice: null, rating: 4.4, isVeg: true, isSpicy: false, description: 'Crispy tofu with seasonal vegetables stir-fried in a garlic ginger sauce.', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1710, restaurantId: 17, name: 'Prawn Stir Fry', category: 'Stir Fry', price: 299, originalPrice: 349, rating: 4.7, isVeg: false, isSpicy: true, description: 'Juicy prawns wok-tossed with snow peas, baby corn and chilli garlic sauce.', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1711, restaurantId: 17, name: 'Hot & Sour Soup', category: 'Soups', price: 139, originalPrice: null, rating: 4.4, isVeg: false, isSpicy: true, description: 'Classic tangy spicy broth with mushrooms, tofu, bamboo shoots and egg ribbons.', img: '../images/photo-1547592180-85f173990554.webp', popular: false },
  { id: 1712, restaurantId: 17, name: 'Sweet Corn Veg Soup', category: 'Soups', price: 119, originalPrice: null, rating: 4.3, isVeg: true, isSpicy: false, description: 'Creamy sweet corn soup with mixed vegetables and a dash of white pepper.', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1713, restaurantId: 17, name: 'Egg Fried Rice', category: 'Rice', price: 189, originalPrice: null, rating: 4.5, isVeg: false, isSpicy: false, description: 'Wok-tossed fluffy egg fried rice with spring onions, soy and sesame oil.', img: '../images/photo-1603133872878-684f208fb84b.webp', popular: true },
  { id: 1714, restaurantId: 17, name: 'Schezwan Fried Rice', category: 'Rice', price: 199, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: true, description: 'Spicy Schezwan rice loaded with vegetables in fiery chilli sauce.', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },

  // Protein Kitchen (id: 18)
  { id: 1801, restaurantId: 18, name: 'Grilled Chicken Power Bowl', category: 'Bowls', price: 349, originalPrice: 399, rating: 4.8, isVeg: false, isSpicy: false, description: 'Grilled chicken breast over brown rice with steamed broccoli, avocado and lemon tahini.', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1802, restaurantId: 18, name: 'Quinoa Veggie Bowl', category: 'Bowls', price: 299, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: false, description: 'Tri-colour quinoa with roasted sweet potato, chickpeas, kale and tahini dressing.', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1803, restaurantId: 18, name: 'Tuna Poke Bowl', category: 'Bowls', price: 399, originalPrice: null, rating: 4.7, isVeg: false, isSpicy: true, description: 'Fresh tuna cubes marinated in soy sesame over sushi rice with edamame and mango.', img: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1804, restaurantId: 18, name: 'Grilled Salmon Steak', category: 'High Protein', price: 499, originalPrice: 549, rating: 4.9, isVeg: false, isSpicy: false, description: 'Atlantic salmon fillet with herb crust, served with steamed asparagus and quinoa.', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1805, restaurantId: 18, name: 'Chicken Breast & Broccoli', category: 'High Protein', price: 389, originalPrice: null, rating: 4.7, isVeg: false, isSpicy: false, description: 'Juicy lean chicken breast with garlic broccoli, bell peppers and brown rice.', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1806, restaurantId: 18, name: 'Paneer Tikka Bowl', category: 'High Protein', price: 329, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: true, description: 'Spiced paneer cubes with roasted vegetables over protein-rich lentil rice.', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1807, restaurantId: 18, name: 'Egg White Omelette', category: 'High Protein', price: 249, originalPrice: null, rating: 4.4, isVeg: true, isSpicy: false, description: '4-egg white omelette stuffed with spinach, mushrooms and low-fat cheese.', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1808, restaurantId: 18, name: 'Keto Chicken Stir Fry', category: 'Keto', price: 369, originalPrice: null, rating: 4.6, isVeg: false, isSpicy: true, description: 'Sliced chicken with zucchini, bell peppers and cauliflower in a soy ginger sauce.', img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1809, restaurantId: 18, name: 'Avocado Egg Salad', category: 'Keto', price: 279, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: false, description: 'Creamy avocado with hard-boiled eggs, cherry tomatoes and olive oil dressing.', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1810, restaurantId: 18, name: 'Keto Cauliflower Rice', category: 'Keto', price: 249, originalPrice: null, rating: 4.3, isVeg: true, isSpicy: false, description: 'Riced cauliflower sautéed with garlic, herbs and nutritional yeast. Zero carbs.', img: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1811, restaurantId: 18, name: 'Peanut Butter Protein Shake', category: 'Shakes', price: 219, originalPrice: null, rating: 4.8, isVeg: true, isSpicy: false, description: 'Natural peanut butter blended with banana, whey protein and almond milk.', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1812, restaurantId: 18, name: 'Green Detox Smoothie', category: 'Shakes', price: 199, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: false, description: 'Spinach, cucumber, pineapple, ginger and chia seeds blended with coconut water.', img: '../images/photo-1610970881699-44a5587cabec.webp', popular: false },
  { id: 1813, restaurantId: 18, name: 'Mango Whey Protein Shake', category: 'Shakes', price: 229, originalPrice: null, rating: 4.7, isVeg: true, isSpicy: false, description: 'Alphonso mango with whey protein, Greek yoghurt and a touch of turmeric.', img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },

  // Dosa Delight (id: 8)
  { id: 801, restaurantId: 8, name: 'Masala Dosa', category: 'Dosas', price: 89, originalPrice: null, rating: 4.7, isVeg: true, isSpicy: false, description: 'Crispy golden dosa filled with spiced potato masala, served with sambar and chutneys.', img: '../images/photo-1668236543090-82eba5ee5976.webp', popular: true },
  { id: 802, restaurantId: 8, name: 'Ghee Roast Dosa', category: 'Dosas', price: 109, originalPrice: null, rating: 4.8, isVeg: true, isSpicy: false, description: 'Extra crispy dosa roasted in pure ghee for a rich buttery flavour.', img: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 803, restaurantId: 8, name: 'Mysore Masala Dosa', category: 'Dosas', price: 99, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: true, description: 'Crispy dosa smeared with spicy Mysore chutney and loaded with potato filling.', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 804, restaurantId: 8, name: 'Rava Dosa', category: 'Dosas', price: 99, originalPrice: null, rating: 4.4, isVeg: true, isSpicy: false, description: 'Lacy semolina dosa with a crispy texture, served with coconut chutney.', img: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 805, restaurantId: 8, name: 'Set Dosa (3 pcs)', category: 'Dosas', price: 79, originalPrice: null, rating: 4.3, isVeg: true, isSpicy: false, description: 'Three soft spongy dosas served with veg sagu and coconut chutney.', img: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 806, restaurantId: 8, name: 'Idli (2 pcs)', category: 'Idli & Vada', price: 59, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: false, description: 'Soft steamed rice cakes served with sambar and fresh coconut chutney.', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 807, restaurantId: 8, name: 'Idli Vada Combo', category: 'Idli & Vada', price: 99, originalPrice: null, rating: 4.7, isVeg: true, isSpicy: false, description: '2 soft idlis and 1 crispy vada with sambar and three chutneys.', img: 'https://images.unsplash.com/photo-1605197161470-b0b5df064e00?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 808, restaurantId: 8, name: 'Medu Vada (2 pcs)', category: 'Idli & Vada', price: 69, originalPrice: null, rating: 4.4, isVeg: true, isSpicy: false, description: 'Crispy donut-shaped urad dal fritters served with sambar and chutney.', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 809, restaurantId: 8, name: 'Bisi Bele Bath', category: 'Rice', price: 149, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: true, description: 'Karnataka-style spiced rice and lentil dish with vegetables and ghee.', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 810, restaurantId: 8, name: 'Lemon Rice', category: 'Rice', price: 99, originalPrice: null, rating: 4.3, isVeg: true, isSpicy: false, description: 'Tangy South Indian lemon rice with mustard seeds, curry leaves and peanuts.', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 811, restaurantId: 8, name: 'Filter Coffee', category: 'Beverages', price: 49, originalPrice: null, rating: 4.9, isVeg: true, isSpicy: false, description: 'Authentic South Indian filter coffee decoction with frothy steamed milk.', img: '../images/photo-1602343168117-bb8ffe3e2e9f.webp', popular: true },
  { id: 812, restaurantId: 8, name: 'Masala Chai', category: 'Beverages', price: 39, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: false, description: 'Ginger-cardamom spiced tea brewed strong with full-fat milk.', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 813, restaurantId: 8, name: 'Buttermilk', category: 'Beverages', price: 39, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: false, description: 'Chilled salted buttermilk with curry leaves, ginger and green chilli. A South Indian staple.', img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },

  // Andhra Spice (id: 15)
  { id: 1501, restaurantId: 15, name: 'Gongura Mutton', category: 'Curries', price: 379, originalPrice: 420, rating: 4.9, isVeg: false, isSpicy: true, description: 'Andhra\'s pride — tender mutton slow-cooked with tangy gongura leaves in fiery spices.', img: '../images/photo-1574484284002-952d92456975.webp', popular: true },
  { id: 1502, restaurantId: 15, name: 'Gongura Chicken', category: 'Curries', price: 329, originalPrice: null, rating: 4.8, isVeg: false, isSpicy: true, description: 'Juicy chicken cooked with fresh sorrel leaves, green chillies and Andhra spices.', img: '../images/photo-1585937421612-70a008356fbe.webp', popular: true },
  { id: 1503, restaurantId: 15, name: 'Gutti Vankaya Curry', category: 'Curries', price: 219, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: true, description: 'Baby brinjals stuffed with peanut-sesame masala and cooked in tangy gravy.', img: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1504, restaurantId: 15, name: 'Kodi Pulusu', category: 'Curries', price: 299, originalPrice: null, rating: 4.7, isVeg: false, isSpicy: true, description: 'Andhra-style chicken curry in tamarind and onion gravy with aromatic spices.', img: '../images/photo-1546833999-b9f581a1996d.webp', popular: false },
  { id: 1505, restaurantId: 15, name: 'Andhra Chicken Biryani', category: 'Biryani', price: 349, originalPrice: 399, rating: 4.8, isVeg: false, isSpicy: true, description: 'Spicy dum biryani with full-leg chicken, whole spices and caramelised onions.', img: '../images/photo-1563379091339-03b21ab4a4f8.webp', popular: true },
  { id: 1506, restaurantId: 15, name: 'Pesarattu', category: 'Breakfast', price: 89, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: false, description: 'Andhra green moong dosa topped with ginger and onion, served with allam chutney.', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1507, restaurantId: 15, name: 'Pulihora', category: 'Breakfast', price: 119, originalPrice: null, rating: 4.4, isVeg: true, isSpicy: false, description: 'Traditional Andhra tamarind rice tempered with mustard, chillies and peanuts.', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1508, restaurantId: 15, name: 'Mirchi Bajji', category: 'Starters', price: 99, originalPrice: null, rating: 4.5, isVeg: true, isSpicy: true, description: 'Large green chillies stuffed with spiced potato, dipped in gram flour batter and fried.', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=280&fit=crop&fm=webp&q=80', popular: true },
  { id: 1509, restaurantId: 15, name: 'Andhra Prawn Fry', category: 'Starters', price: 279, originalPrice: null, rating: 4.7, isVeg: false, isSpicy: true, description: 'Prawns marinated in Andhra masala and dry-fried to a spicy golden finish.', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1510, restaurantId: 15, name: 'Curd Rice', category: 'Rice', price: 119, originalPrice: null, rating: 4.4, isVeg: true, isSpicy: false, description: 'Creamy yoghurt rice tempered with mustard, ginger, green chilli and pomegranate.', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1511, restaurantId: 15, name: 'Rasam', category: 'Soups', price: 79, originalPrice: null, rating: 4.6, isVeg: true, isSpicy: true, description: 'Thin peppery tamarind-tomato broth with mustard and curry leaf tempering.', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=280&fit=crop&fm=webp&q=80', popular: false },
  { id: 1512, restaurantId: 15, name: 'Filter Coffee', category: 'Beverages', price: 49, originalPrice: null, rating: 4.8, isVeg: true, isSpicy: false, description: 'Rich South Indian filter coffee decoction with frothy hot milk.', img: '../images/photo-1602343168117-bb8ffe3e2e9f.webp', popular: true },
];

const TESTIMONIALS = [
  { id: 1, name: 'Priya Sharma', role: 'Food Blogger', rating: 5, text: 'FoodieExpress has completely changed how I order food. The delivery is always on time and the food arrives hot and fresh. Highly recommend!', avatar: '../images/photo-1494790108377-be9c29b29330.webp' },
  { id: 2, name: 'Rahul Mehta', role: 'Software Engineer', rating: 5, text: 'Best food delivery app I\'ve used. The variety of restaurants is amazing and the tracking feature is super accurate. 10/10 experience!', avatar: '../images/photo-1507003211169-0a1dd7228f2d.webp' },
  { id: 3, name: 'Ananya Patel', role: 'College Student', rating: 4, text: 'Love the offers and deals on this app! The UI is clean and ordering is super easy. The customer support is also very responsive.', avatar: '../images/photo-1438761681033-6461ffad8d80.webp' },
];

const OFFERS = [
  { id: 1, tag: '🔥 Hot Deal', title: '40% OFF Your First Order', desc: 'Valid on all restaurants for new users only.', code: 'FIRST40', color: 'orange' },
  { id: 2, tag: '👑 Premium', title: 'Free Delivery Weekend', desc: 'Enjoy free delivery on all orders this weekend.', code: 'FREEDEL', color: 'purple' },
  { id: 3, tag: '🌿 Healthy Pick', title: '₹100 OFF on Healthy Food', desc: 'Order from our healthy restaurant partners.', code: 'HEALTH100', color: 'teal' },
];

// ---- UTILITIES ----

/* Close mobile menu and navigate — called from inline onclick on every mobile nav link */
function mobileNavigate(url) {
  var menu = document.getElementById('mobileMenu');
  var hamburger = document.getElementById('hamburger');
  if (menu) menu.classList.remove('open');
  if (hamburger) hamburger.classList.remove('open');
  document.body.style.overflow = '';
  window.location.href = url;
}

function getBasePath() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../' : './';
}

function getPageName() {
  const path = window.location.pathname;
  const segments = path.split('/');
  const file = segments[segments.length - 1];
  return file.replace('.html', '') || 'index';
}

function formatCurrency(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function generateId() {
  return 'FE' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
}

// ---- THEME ----

const ThemeManager = {
  key: 'fe-theme',

  get() {
    return localStorage.getItem(this.key) || 'light';
  },

  set(theme) {
    localStorage.setItem(this.key, theme);
    document.documentElement.setAttribute('data-theme', theme);
    this.updateIcon(theme);
  },

  toggle() {
    const current = this.get();
    const next = current === 'dark' ? 'light' : 'dark';
    this.set(next);
    return next;
  },

  init() {
    const theme = this.get();
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem(this.key)) {
      this.set('dark');
    } else {
      this.set(theme);
    }
  },

  updateIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
};

// ---- TOAST NOTIFICATIONS ----

const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toastContainer');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      this.container.id = 'toastContainer';
      document.body.appendChild(this.container);
    }
  },

  show(title, message = '', type = 'info', duration = 4000) {
    if (!this.container) this.init();

    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.setProperty('--duration', duration + 'ms');
    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <div class="toast-content">
        <h4>${title}</h4>
        ${message ? `<p>${message}</p>` : ''}
      </div>
      <button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>
      <div class="toast-progress"></div>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, duration);

    return toast;
  },

  success(title, msg) { return this.show(title, msg, 'success'); },
  error(title, msg) { return this.show(title, msg, 'error'); },
  info(title, msg) { return this.show(title, msg, 'info'); },
  warning(title, msg) { return this.show(title, msg, 'warning'); },
};

// ---- NAVIGATION ----

const Nav = {
  hamburger: null,
  mobileMenu: null,
  navbar: null,
  isOpen: false,

  init() {
    this.navbar = document.getElementById('navbar');

    // Checkbox drives open/close via CSS :checked — JS only locks body scroll
    const toggle = document.getElementById('hamburgerToggle');
    if (toggle) {
      toggle.addEventListener('change', () => {
        this.isOpen = toggle.checked;
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
      });
    }

    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Active link — nav
    const page = getPageName();
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links .nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const cleanHref = href.replace('../', '').replace('./', '').split('/').pop();
      const isActive = (cleanHref && currentPath.includes(cleanHref)) ||
                       (page === 'index' && (href.includes('index') || href === '#'));
      link.classList.toggle('active', isActive);
    });

    // User dropdown
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    if (userMenuBtn && userDropdown) {
      userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('open');
      });

      document.addEventListener('click', () => userDropdown.classList.remove('open'));
    }
  },

  toggleMobile() {
    const toggle = document.getElementById('hamburgerToggle');
    if (toggle) toggle.checked = !toggle.checked;
    this.isOpen = toggle ? toggle.checked : false;
    document.body.style.overflow = this.isOpen ? 'hidden' : '';
  },

  closeMobile() {
    this.isOpen = false;
    const toggle = document.getElementById('hamburgerToggle');
    if (toggle) toggle.checked = false;
    document.body.style.overflow = '';
  },

  onScroll() {
    if (!this.navbar) return;
    const scrolled = window.scrollY > 60;
    this.navbar.classList.toggle('scrolled', scrolled);
    this.navbar.classList.toggle('nav-scrolled', scrolled);
  }
};

// ---- HEADER / FOOTER INJECTION ----

function buildHeader(base) {
  const user = Auth.getUser();
  const cartCount = Cart.getCount();
  const wishlistCount = parseInt(localStorage.getItem('fe-wishlist-count') || 0);

  return `
  <input type="checkbox" id="hamburgerToggle" class="hamburger-toggle" aria-hidden="true">
  <nav class="navbar" id="navbar">
    <div class="container nav-inner">

      <label for="hamburgerToggle" class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </label>

      <a href="${base}index.html" class="nav-logo">
        <img src="${base}images/stackly_logo_gold.webp" alt="Stackly" style="height:42px;width:auto;display:block">
      </a>

      <div class="nav-search" id="navSearchWrap">
        <span class="search-icon">🔍</span>
        <input type="text" id="navSearchInput" placeholder="Search food or restaurants..." autocomplete="off" />
        <div class="search-dropdown" id="searchDropdown"></div>
      </div>

      <ul class="nav-links">
        <li><a href="${base}index.html" class="nav-link">Home</a></li>
        <li><a href="${base}pages/restaurants.html" class="nav-link">Restaurants</a></li>
        <li><a href="${base}pages/about.html" class="nav-link">About</a></li>
        <li><a href="${base}pages/contact.html" class="nav-link">Contact</a></li>
      </ul>

      <div class="nav-actions">
        <button class="nav-btn" id="themeToggle" title="Toggle Theme" onclick="ThemeManager.toggle()">🌙</button>
        <button class="nav-btn" id="wishlistBtn" title="Wishlist" onclick="window.location='${base}pages/profile.html'">
          ❤️
          ${wishlistCount > 0 ? `<span class="badge-count">${wishlistCount}</span>` : ''}
        </button>
        <button class="nav-btn" id="cartNavBtn" title="Cart" onclick="CartSidebar.open()">
          🛒
          <span class="badge-count" id="cartCountBadge" style="${cartCount === 0 ? 'display:none' : ''}">${cartCount}</span>
        </button>

        ${user ? `
        <div class="user-menu">
          <button id="userMenuBtn" class="nav-btn" style="width:auto;padding:0 4px">
            <img class="nav-avatar" src="${user.avatar && user.avatar.includes('/') ? user.avatar : (getBasePath() + 'images/avatar-default.webp')}" alt="${user.name}" />
          </button>
          <div class="user-dropdown" id="userDropdown">
            <div class="user-dropdown-header">
              <h4>${user.name}</h4>
              <p>${user.email}</p>
            </div>
            <div class="dropdown-item" onclick="window.location='${base}pages/profile.html'">👤 My Profile</div>
            <div class="dropdown-item" onclick="window.location='${base}pages/orders.html'">📦 My Orders</div>
            <div class="dropdown-item" onclick="window.location='${base}pages/profile.html#wishlist'">❤️ Wishlist</div>
            <div class="dropdown-item danger" onclick="Auth.logout()">🚪 Logout</div>
          </div>
        </div>
        ` : `
        <a href="${base}pages/login.html" class="btn btn-primary btn-sm">Login</a>
        `}

      </div>
    </div>
  </nav>

  <div class="mobile-menu" id="mobileMenu">
    <div class="mobile-menu-header">
      <span class="mobile-menu-title">Menu</span>
      <label for="hamburgerToggle" class="mobile-menu-close" aria-label="Close menu">✕</label>
    </div>
    <a href="https://andraabhishek-lgtm.github.io/FOODIE-/index.html" class="mobile-nav-link">🏠 Home</a>
    <a href="https://andraabhishek-lgtm.github.io/FOODIE-/pages/restaurants.html" class="mobile-nav-link">🍽️ Restaurants</a>
    <a href="https://andraabhishek-lgtm.github.io/FOODIE-/pages/about.html" class="mobile-nav-link">ℹ️ About Us</a>
    <a href="https://andraabhishek-lgtm.github.io/FOODIE-/pages/contact.html" class="mobile-nav-link">📞 Contact</a>
    <a href="https://andraabhishek-lgtm.github.io/FOODIE-/pages/faq.html" class="mobile-nav-link">❓ FAQ</a>
    ${user ? `
    <a href="https://andraabhishek-lgtm.github.io/FOODIE-/pages/profile.html" class="mobile-nav-link">👤 Profile</a>
    <a href="https://andraabhishek-lgtm.github.io/FOODIE-/pages/orders.html" class="mobile-nav-link">📦 My Orders</a>
    <div class="mobile-nav-link mobile-nav-logout" onclick="Auth.logout()">🚪 Logout</div>
    ` : `
    <a href="https://andraabhishek-lgtm.github.io/FOODIE-/pages/login.html" class="mobile-nav-link mobile-nav-login">Login / Signup</a>
    `}
  </div>
  <label for="hamburgerToggle" class="mobile-overlay" aria-hidden="true"></label>

  <!-- Cart Sidebar -->
  <div class="cart-overlay" id="cartOverlay" onclick="CartSidebar.close()"></div>
  <div class="cart-sidebar" id="cartSidebar">
    <div class="cart-header">
      <h3>🛒 My Cart</h3>
      <button class="cart-close" onclick="CartSidebar.close()">✕</button>
    </div>
    <div class="cart-body" id="cartSidebarBody"></div>
    <div class="cart-footer" id="cartSidebarFooter"></div>
  </div>

  <!-- Toast container -->
  <div class="toast-container" id="toastContainer"></div>

  <!-- Back to top -->
  <button class="back-to-top" id="backToTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" title="Back to Top">↑</button>
  `;
}

function buildFooter(base) {
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
    document.head.appendChild(fa);
  }
  return `
  <footer class="ft-footer">
    <div class="ft-grid">

      <div class="ft-brand">
        <div class="ft-logo">
          <a href="${base}index.html"><img src="${base}images/stackly_logo_gold.webp" alt="Stackly" style="height:48px;width:auto;display:block"></a>
        </div>
        <p class="ft-tagline">Delicious food, delivered fast.</p>
        <a href="${base}pages/restaurants.html" class="ft-cta">ORDER NOW</a>
      </div>

      <div class="ft-col">
        <h4 class="ft-heading">Explore</h4>
        <nav class="ft-nav">
          <a href="${base}index.html" class="ft-link">Home</a>
          <a href="${base}pages/menu.html" class="ft-link">Menu</a>
          <a href="${base}index.html#offers" class="ft-link">Featured Offers</a>
          <a href="${base}pages/restaurants.html" class="ft-link">Top Restaurants</a>
          <a href="${base}pages/restaurants.html" class="ft-link">Cuisines</a>
        </nav>
      </div>

      <div class="ft-col">
        <h4 class="ft-heading">Company</h4>
        <nav class="ft-nav">
          <a href="${base}pages/about.html" class="ft-link">About Us</a>
          <a href="${base}pages/contact.html" class="ft-link">Contact Us</a>
          <a href="${base}pages/careers.html" class="ft-link">Careers</a>
          <a href="${base}pages/partner.html" class="ft-link">Partner With Us</a>
        </nav>
      </div>

      <div class="ft-col">
        <h4 class="ft-heading">Support</h4>
        <nav class="ft-nav">
          <a href="${base}pages/faq.html" class="ft-link">FAQ</a>
          <a href="${base}pages/orders.html" class="ft-link">Track Order</a>
          <a href="${base}pages/refund-policy.html" class="ft-link">Refund Policy</a>
          <a href="${base}pages/contact.html" class="ft-link">Help Center</a>
        </nav>
      </div>

      <div class="ft-col">
        <h4 class="ft-heading">Latest Deals</h4>
        <div class="ft-deals">
          <a href="${base}pages/restaurants.html" class="ft-deal">Flat 40% off on your first order</a>
          <a href="${base}pages/restaurants.html" class="ft-deal">Free delivery on orders above ₹299</a>
          <a href="${base}pages/restaurants.html" class="ft-deal">Buy 2 get 1 free every Friday</a>
        </div>
        <div class="ft-socials">
          <a href="${base}pages/404.html" class="ft-social-btn" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="${base}pages/404.html" class="ft-social-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="${base}pages/404.html" class="ft-social-btn" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>

    </div>

    <hr class="ft-divider" />

    <div class="ft-bottom">
      <p class="ft-copy">© 2026 Foodie. All rights reserved.</p>
      <div class="ft-legal">
        <a href="${base}pages/404.html" class="ft-legal-link">Privacy Policy</a>
        <span class="ft-sep">|</span>
        <a href="${base}pages/404.html" class="ft-legal-link">Terms of Service</a>
      </div>
    </div>

  </footer>
  `;
}

function injectLayout() {
  const base = getBasePath();

  // Header
  const headerEl = document.getElementById('header');
  if (headerEl) headerEl.innerHTML = buildHeader(base);

  // Footer
  const footerEl = document.getElementById('footer');
  if (footerEl) footerEl.innerHTML = buildFooter(base);
}

// ---- CART SIDEBAR ----

const CartSidebar = {
  open() {
    document.getElementById('cartOverlay')?.classList.add('open');
    document.getElementById('cartSidebar')?.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.render();
  },

  close() {
    document.getElementById('cartOverlay')?.classList.remove('open');
    document.getElementById('cartSidebar')?.classList.remove('open');
    document.body.style.overflow = '';
  },

  render() {
    const items = Cart.getItems();
    const body = document.getElementById('cartSidebarBody');
    const footer = document.getElementById('cartSidebarFooter');
    if (!body || !footer) return;

    const base = getBasePath();

    if (items.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <div class="empty-icon">🛒</div>
          <h4>Your cart is empty</h4>
          <p>Add items to your cart to get started</p>
          <a href="${base}pages/restaurants.html" class="btn btn-primary btn-sm" onclick="CartSidebar.close()">Browse Restaurants</a>
        </div>`;
      footer.innerHTML = '';
      return;
    }

    body.innerHTML = items.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.onerror=null;this.src=(location.pathname.includes('/pages/')?'../':'./') + 'images/food-placeholder.webp'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatCurrency(item.price * item.qty)}</div>
        </div>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" onclick="Cart.updateQty(${item.id}, ${item.qty - 1}); CartSidebar.render()">−</button>
          <span>${item.qty}</span>
          <button class="cart-qty-btn" onclick="Cart.updateQty(${item.id}, ${item.qty + 1}); CartSidebar.render()">+</button>
          <button class="cart-remove" onclick="Cart.remove(${item.id}); CartSidebar.render()" title="Remove">🗑️</button>
        </div>
      </div>
    `).join('');

    const { subtotal, deliveryFee, discount, tax, total } = Cart.getSummary();
    footer.innerHTML = `
      <div class="cart-coupon">
        <input type="text" id="sidebarCoupon" placeholder="Enter coupon code..." />
        <button class="btn btn-secondary btn-sm" onclick="Cart.applyCoupon(document.getElementById('sidebarCoupon').value, CartSidebar.render.bind(CartSidebar))">Apply</button>
      </div>
      <div class="cart-summary">
        <div class="cart-summary-row"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
        <div class="cart-summary-row"><span>Delivery Fee</span><span>${deliveryFee === 0 ? '<span style="color:var(--success)">FREE</span>' : formatCurrency(deliveryFee)}</span></div>
        ${discount > 0 ? `<div class="cart-summary-row"><span>Discount</span><span class="discount">-${formatCurrency(discount)}</span></div>` : ''}
        <div class="cart-summary-row"><span>GST (5%)</span><span>${formatCurrency(tax)}</span></div>
        <div class="cart-summary-row total"><span>Total</span><span>${formatCurrency(total)}</span></div>
      </div>
      <a href="${base}pages/checkout.html" class="btn btn-primary" style="width:100%" onclick="CartSidebar.close()">Proceed to Checkout →</a>
    `;
  }
};

// ---- ANIMATIONS ----

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // fade-up sections + stagger-children grids
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'in-view');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    let staggerIdx = 0;
    document.querySelectorAll('.fade-up').forEach(el => {
      el.style.transitionDelay = (staggerIdx * 70) + 'ms';
      fadeObserver.observe(el);
      staggerIdx++;
    });

    document.querySelectorAll('.stagger-children').forEach(el => fadeObserver.observe(el));
  } else {
    document.querySelectorAll('.fade-up, .stagger-children').forEach(el => {
      el.classList.add('visible', 'in-view');
    });
  }
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

// ---- LAZY IMAGE LOADING ----

function initLazyImages() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}

// ---- COUNTER ANIMATION ----

function animateCounter(el, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('en-IN') + (el.dataset.suffix || '');
  }, 16);
}

function initCounters() {
  const counterEls = document.querySelectorAll('[data-counter]');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = 'true';
        animateCounter(entry.target, parseInt(entry.target.dataset.counter));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => observer.observe(el));
}

// ---- WISHLIST ----

const Wishlist = {
  key: 'fe-wishlist',

  get() {
    try { return JSON.parse(localStorage.getItem(this.key)) || []; }
    catch { return []; }
  },

  toggle(id, type = 'restaurant') {
    const list = this.get();
    const existing = list.findIndex(w => w.id === id && w.type === type);
    if (existing > -1) {
      list.splice(existing, 1);
      Toast.info('Removed from Wishlist');
    } else {
      list.push({ id, type });
      Toast.success('Added to Wishlist ❤️');
    }
    localStorage.setItem(this.key, JSON.stringify(list));
    localStorage.setItem('fe-wishlist-count', list.length);
    this.updateBadge();
    return existing === -1;
  },

  has(id, type = 'restaurant') {
    return this.get().some(w => w.id === id && w.type === type);
  },

  updateBadge() {
    const badge = document.querySelector('#wishlistBtn .badge-count');
    const count = this.get().length;
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

// ---- PAGE INIT ----

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  ThemeManager.updateIcon(ThemeManager.get());

  injectLayout();

  Nav.init();
  Toast.init();

  initScrollAnimations();
  initBackToTop();
  initLazyImages();
  initCounters();

  // Search
  const searchInput = document.getElementById('navSearchInput');
  if (searchInput) {
    const dropdown = document.getElementById('searchDropdown');
    const base = getBasePath();

    searchInput.addEventListener('input', debounce(function() {
      const q = this.value.trim().toLowerCase();
      if (!q || q.length < 2) {
        dropdown.classList.remove('open');
        return;
      }

      const results = [
        ...RESTAURANTS.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)).slice(0, 3).map(r => ({ ...r, type: 'restaurant' })),
        ...MENU_ITEMS.filter(m => m.name.toLowerCase().includes(q)).slice(0, 3).map(m => ({ ...m, type: 'food' }))
      ].slice(0, 5);

      if (results.length === 0) {
        dropdown.innerHTML = '<div style="padding:16px;text-align:center;color:var(--text-muted)">No results found</div>';
      } else {
        dropdown.innerHTML = results.map(r => `
          <div class="search-result-item" onclick="window.location='${base}pages/${r.type === 'restaurant' ? 'menu' : 'menu'}.html?id=${r.restaurantId || r.id}'">
            <img src="${r.img}" alt="${r.name}" onerror="this.style.display='none'">
            <div class="result-info">
              <h4>${r.name}</h4>
              <p>${r.type === 'restaurant' ? r.cuisine : 'Food Item · ' + formatCurrency(r.price)}</p>
            </div>
          </div>
        `).join('');
      }

      dropdown.classList.add('open');
    }, 250));

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#navSearchWrap')) {
        dropdown.classList.remove('open');
      }
    });
  }

  // Update cart badge
  Cart.updateBadge();
  Wishlist.updateBadge();

  // Page transition
  document.body.classList.add('page-transition');
});
