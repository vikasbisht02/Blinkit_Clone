import { useState } from "react";

const categories = [
  {
    name: "Fruits & Vegetables",
    products: [
      {
        id: 1,
        name: "Apples",
        description: "Fresh red apples",
        price: 80,
        image: "/images/apples.jpg",
      },
      {
        id: 2,
        name: "Carrots",
        description: "Organic carrots",
        price: 40,
        image: "/images/carrots.jpg",
      },
      {
        id: 3,
        name: "Bananas",
        description: "Ripe bananas",
        price: 50,
        image: "/images/bananas.jpg",
      },
      {
        id: 4,
        name: "Tomatoes",
        description: "Farm fresh tomatoes",
        price: 30,
        image: "/images/tomatoes.jpg",
      },
      {
        id: 5,
        name: "Potatoes",
        description: "Premium quality potatoes",
        price: 25,
        image: "/images/potatoes.jpg",
      },
      {
        id: 6,
        name: "Spinach",
        description: "Fresh green spinach",
        price: 35,
        image: "/images/spinach.jpg",
      },
      {
        id: 7,
        name: "Onions",
        description: "Handpicked onions",
        price: 28,
        image: "/images/onions.jpg",
      },
      {
        id: 8,
        name: "Ginger",
        description: "Fresh ginger root",
        price: 120,
        image: "/images/ginger.jpg",
      },
    ],
  },
  {
    name: "Dairy Products",
    products: [
      {
        id: 9,
        name: "Milk",
        description: "1L Fresh Milk",
        price: 50,
        image: "/images/milk.jpg",
      },
      {
        id: 10,
        name: "Cheese",
        description: "Cheddar Cheese 200g",
        price: 120,
        image: "/images/cheese.jpg",
      },
      {
        id: 11,
        name: "Butter",
        description: "Salted Butter 500g",
        price: 200,
        image: "/images/butter.jpg",
      },
      {
        id: 12,
        name: "Yogurt",
        description: "Natural Yogurt 1kg",
        price: 90,
        image: "/images/yogurt.jpg",
      },
      {
        id: 13,
        name: "Paneer",
        description: "Fresh cottage cheese 250g",
        price: 80,
        image: "/images/paneer.jpg",
      },
    ],
  },
  {
    name: "Bakery & Snacks",
    products: [
      {
        id: 14,
        name: "Brown Bread",
        description: "Whole wheat bread",
        price: 40,
        image: "/images/bread.jpg",
      },
      {
        id: 15,
        name: "Cookies",
        description: "Assorted cookies",
        price: 150,
        image: "/images/cookies.jpg",
      },
      {
        id: 16,
        name: "Cake",
        description: "Chocolate cake 500g",
        price: 350,
        image: "/images/cake.jpg",
      },
      {
        id: 17,
        name: "Donuts",
        description: "Glazed donuts pack of 6",
        price: 180,
        image: "/images/donuts.jpg",
      },
      {
        id: 18,
        name: "Bun",
        description: "Bun 6 pieces",
        price: 20,
        image: "/images/bun.jpg",
      },
    ],
  },
  {
    name: "Beverages",
    products: [
      {
        id: 19,
        name: "Orange Juice",
        description: "Freshly squeezed",
        price: 150,
        image: "/images/orangejuice.jpg",
      },
      {
        id: 20,
        name: "Green Tea",
        description: "Organic green tea",
        price: 120,
        image: "/images/greentea.jpg",
      },
      {
        id: 21,
        name: "Coffee",
        description: "Premium ground coffee 250g",
        price: 350,
        image: "/images/coffee.jpg",
      },
      {
        id: 22,
        name: "Cola",
        description: "Chilled cola 1.5L",
        price: 80,
        image: "/images/cola.jpg",
      },
      {
        id: 23,
        name: "MangoJuice",
        description: "Chilled Mango Juice 1.5L",
        price: 80,
        image: "/images/mango.jpg",
      },
    ],
  },
  {
    name: "Meat & Seafood",
    products: [
      {
        id: 24,
        name: "Chicken",
        description: "Fresh whole chicken",
        price: 250,
        image: "/images/chicken.jpg",
      },
      {
        id: 25,
        name: "Beef",
        description: "Lean beef cuts",
        price: 450,
        image: "/images/beef.jpg",
      },
      {
        id: 26,
        name: "Fish",
        description: "Fresh fish fillets",
        price: 320,
        image: "/images/fish.jpg",
      },
      {
        id: 27,
        name: "Prawns",
        description: "Jumbo prawns 500g",
        price: 600,
        image: "/images/prawns.jpg",
      },
      {
        id: 28,
        name: "Goat",
        description: "Goat 500g",
        price: 600,
        image: "/images/pig.jpg",
      },
      {
        id: 29,
        name: "Pig",
        description: "Pig 500g",
        price: 500,
        image: "/images/pig.jpg",
      },
    ],
  },
  {
    name: "Frozen Food",
    products: [
      {
        id: 30,
        name: "Frozen Peas",
        description: "Green peas 1kg",
        price: 120,
        image: "/images/peas.jpg",
      },
      {
        id: 31,
        name: "French Fries",
        description: "Frozen potato fries",
        price: 150,
        image: "/images/fries.jpg",
      },
      {
        id: 32,
        name: "Chicken Nuggets",
        description: "Frozen nuggets pack",
        price: 280,
        image: "/images/nuggets.jpg",
      },
      {
        id: 33,
        name: "Pig Nuggets",
        description: "Pig nuggets pack",
        price: 250,
        image: "/images/nuggets.jpg",
      },
      {
        id: 34,
        name: "Mutton Nuggets",
        description: "Mutton nuggets pack",
        price: 300,
        image: "/images/nuggets.jpg",
      },
    ],
  },
  {
    name: "Household Essentials",
    products: [
      {
        id: 35,
        name: "Dishwashing Liquid",
        description: "Lemon-scented",
        price: 100,
        image: "/images/dishwash.jpg",
      },
      {
        id: 36,
        name: "Laundry Detergent",
        description: "2kg pack",
        price: 250,
        image: "/images/detergent.jpg",
      },
      {
        id: 37,
        name: "Toilet Paper",
        description: "Pack of 10 rolls",
        price: 300,
        image: "/images/toiletpaper.jpg",
      },
      {
        id: 38,
        name: "Harpical Cleaner",
        description: "500ml bottle",
        price: 70,
        image: "/images/harpic.jpg",
      },
      {
        id: 39,
        name: "Toothpage",
        description: "100mg pack",
        price: 50,
        image: "/images/toothpaste.jpg",
      },
    ],
  },
  {
    name: "Health & Personal Care",
    products: [
      {
        id: 40,
        name: "Toothpaste",
        description: "Fluoride protection",
        price: 60,
        image: "/images/toothpaste.jpg",
      },
      {
        id: 41,
        name: "Shampoo",
        description: "Anti-dandruff",
        price: 250,
        image: "/images/shampoo.jpg",
      },
      {
        id: 42,
        name: "Hand Sanitizer",
        description: "Alcohol-based",
        price: 100,
        image: "/images/sanitizer.jpg",
      },
      {
        id: 43,
        name: "Soap",
        description: "Moisturizing bar",
        price: 50,
        image: "/images/soap.jpg",
      },
      {
        id: 44,
        name: "Conditioner",
        description: "Conditioning bar",
        price: 50,
        image: "/images/conditioner.jpg",
      },
    ],
  },
  {
    name: "Pet Supplies",
    products: [
      {
        id: 45,
        name: "Dog Food",
        description: "Premium dry food 5kg",
        price: 800,
        image: "/images/dogfood.jpg",
      },
      {
        id: 46,
        name: "Cat Food",
        description: "Tuna flavor 3kg",
        price: 600,
        image: "/images/catfood.jpg",
      },
      {
        id: 47,
        name: "Bird Feed",
        description: "Mixed grains",
        price: 250,
        image: "/images/birdfeed.jpg",
      },
      {
        id: 48,
        name: "turtle Feed",
        description: "Mixed grains",
        price: 250,
        image: "/images/turle.jpg",
      },
      {
        id: 49,
        name: "Parrat Feed",
        description: "1 kg chilli",
        price: 250,
        image: "/images/chilli.jpg",
      },
    ],
  },
  {
    name: "Electronics & Accessories",
    products: [
      {
        id: 50,
        name: "Power Bank",
        description: "10000mAh",
        price: 1500,
        image: "/images/powerbank.jpg",
      },
      {
        id: 51,
        name: "USB Cable",
        description: "Fast charging",
        price: 300,
        image: "/images/usb.jpg",
      },
      {
        id: 52,
        name: "Wireless Earbuds",
        description: "Noise canceling",
        price: 3500,
        image: "/images/earbuds.jpg",
      },
      {
        id: 53,
        name: "Battry",
        description: "Samsang battery ",
        price: 2000,
        image: "/images/battery.jpg",
      },
      {
        id: 54,
        name: "Touch",
        description: "Bright screen",
        price: 1000,
        image: "/images/touch.jpg",
      },
    ],
  },
  {
    name: "Chicken, Meat & Fish",
    products: [
      {
        id: 55,
        name: "Chicken",
        description: "Fresh chicken meat",
        price: 250,
        image: "/images/chicken.jpg",
      },
      {
        id: 56,
        name: "Mutton",
        description: "Premium quality mutton",
        price: 600,
        image: "/images/mutton.jpg",
      },
      {
        id: 57,
        name: "Fish & Seafood",
        description: "Fresh fish and seafood",
        price: 400,
        image: "/images/fish.jpg",
      },
      {
        id: 58,
        name: "Sausage",
        description: "Tasty sausages and salami",
        price: 300,
        image: "/images/sausage.jpg",
      },
      {
        id: 59,
        name: "Pig",
        description: "Tasty sausages and salami",
        price: 200,
        image: "/images/pig.jpg",
      },
    ],
  },
  {
    name: "Dairy, Bread & Eggs",
    products: [
      {
        id: 60,
        name: "Milk",
        description: "1L Fresh Milk",
        price: 50,
        image: "/images/milk.jpg",
      },
      {
        id: 61,
        name: "Cheese",
        description: "Cheddar Cheese 200g",
        price: 120,
        image: "/images/cheese.jpg",
      },
      {
        id: 62,
        name: "Butter",
        description: "Salted Butter 500g",
        price: 200,
        image: "/images/butter.jpg",
      },
      {
        id: 63,
        name: "Eggs",
        description: "Farm fresh eggs (12pcs)",
        price: 80,
        image: "/images/eggs.jpg",
      },
      {
        id: 64,
        name: "Chilli Powder",
        description: "250 gm",
        price: 80,
        image: "/images/chilli.jpg",
      },
    ],
  },
  {
    name: "Sweet Tooth",
    products: [
      {
        id: 65,
        name: "Chocolates",
        description: "Assorted chocolate packs",
        price: 150,
        image: "/images/chocolates.jpg",
      },
      {
        id: 66,
        name: "Ice Cream",
        description: "Delicious ice cream tubs",
        price: 200,
        image: "/images/icecream.jpg",
      },
      {
        id: 67,
        name: "Indian Sweets",
        description: "Traditional Indian sweets",
        price: 300,
        image: "/images/sweets.jpg",
      },
      {
        id: 68,
        name: "Candies",
        description: "Various flavored candies",
        price: 20,
        image: "/images/candies.jpg",
      },
      {
        id: 69,
        name: "Gum",
        description: "Various flavored Gum",
        price: 20,
        image: "/images/gum.jpg",
      },
    ],
  },
  {
    name: "Tea, Coffee & Health Drinks",
    products: [
      {
        id: 70,
        name: "Tea",
        description: "Premium loose-leaf tea",
        price: 250,
        image: "/images/tea.jpg",
      },
      {
        id: 71,
        name: "Coffee",
        description: "Roasted ground coffee",
        price: 300,
        image: "/images/coffee.jpg",
      },
      {
        id: 72,
        name: "Green Tea",
        description: "Healthy green tea bags",
        price: 200,
        image: "/images/greentea.jpg",
      },
      {
        id: 73,
        name: "Milk Drinks",
        description: "Nutritious flavored milk",
        price: 100,
        image: "/images/milkdrink.jpg",
      },
      {
        id: 74,
        name: "Armound milk",
        description: "Nutritious flavored milk",
        price: 100,
        image: "/images/armound.jpg",
      },
    ],
  },
  {
    name: "Beauty & Cosmetics",
    products: [
      {
        id: 75,
        name: "Lipstick",
        description: "Matte finish lipstick",
        price: 500,
        image: "/images/lipstick.jpg",
      },
      {
        id: 76,
        name: "Foundation",
        description: "Long-lasting foundation",
        price: 800,
        image: "/images/foundation.jpg",
      },
      {
        id: 77,
        name: "Shampoo",
        description: "Hair care shampoo",
        price: 300,
        image: "/images/shampoo.jpg",
      },
      {
        id: 78,
        name: "Nail Polish",
        description: "Glossy nail polish",
        price: 200,
        image: "/images/nailpolish.jpg",
      },
      {
        id: 79,
        name: "Eye Liner",
        description: "Glossy Eye liner",
        price: 200,
        image: "/images/eyeliner.jpg",
      },
      {
        id: 80,
        name: "Nai cutter",
        description: "Sharp Nail Cutter",
        price: 100,
        image: "/images/nailcutter.jpg",
      },
    ],
  },
];


const Home = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="px-4 py-6 sm:px-10">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Shop by Category</h1>

      <div className="space-y-8">
        {categories.map((category, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">{category.name}</h2>
            
            <div className="overflow-x-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 min-w-max">
                {category.products.map((product) => (
                  <div key={product.id} className="border shadow-lg rounded-lg p-4 bg-white w-40 sm:w-48">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <p className="font-bold text-gray-800">₹{product.price}</p>
                    <button
                      className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
