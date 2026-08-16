// Daily Sips — menu data, grouped by category
const MENU_DATA = {
  "Signature Sips": [
    { name: "Caramel Cream Latte", price: "140 L.E", icon: "assets/icon_caramel_cream.png" },
    { name: "Iced Salted Caramel", price: "135 L.E", icon: "assets/icon_iced_salted.png" },
    { name: "Tropical Matcha", price: "125 L.E", icon: "assets/icon_tropical_matcha.png" },
    { name: "Matcha Salted Caramel", price: "145 L.E", icon: "assets/icon_matcha_salted.png" },
    { name: "Spanish Latte", price: "125 L.E", icon: "assets/icon_spanish.png" },
    { name: "Pistachio Latte", price: "145 L.E", icon: "assets/icon_pistachio.png" },
    { name: "Lotus Biscoff Latte", price: "140 L.E", icon: "assets/icon_lotus.png" },
    { name: "Mocha", price: "135 L.E", icon: "assets/icon_mocha.png" }
  ],
  "Coffee": [
    { name: "Spanish Latte", price: "125 L.E", icon: "assets/icon_spanish.png" },
    { name: "Mocha", price: "135 L.E", icon: "assets/icon_mocha.png" },
    { name: "Cappuccino", price: "105 / 120 L.E", icon: "assets/icon_spanish.png" },
    { name: "Flat White", price: "115 L.E", icon: "assets/icon_spanish.png" },
    { name: "Americano", price: "90 / 100 L.E", icon: "assets/icon_mocha.png" },
    { name: "Pistachio Latte", price: "145 L.E", icon: "assets/icon_pistachio.png" },
    { name: "Lotus Biscoff Latte", price: "140 L.E", icon: "assets/icon_lotus.png" },
    { name: "Caramel Cream Latte", price: "140 L.E", icon: "assets/icon_caramel_cream.png" }
  ],
  "Frappe": [
    { name: "Caramel Frappe", price: "150 L.E", icon: "assets/icon_caramel_cream.png" },
    { name: "Mocha Frappe", price: "150 L.E", icon: "assets/icon_mocha.png" },
    { name: "Pistachio Frappe", price: "160 L.E", icon: "assets/icon_pistachio.png" },
    { name: "Biscoff Frappe", price: "155 L.E", icon: "assets/icon_lotus.png" },
    { name: "Classic Frappe", price: "125 L.E", icon: "assets/icon_spanish.png" },
    { name: "Matcha Frappe", price: "145 L.E", icon: "assets/icon_tropical_matcha.png" }
  ],
  "Mojitos": [
    { name: "Classic Mint Mojito", price: "110 L.E", icon: "assets/icon_tropical_matcha.png" },
    { name: "Blue Lagoon Mojito", price: "120 L.E", icon: "assets/icon_taro.png" },
    { name: "Passionfruit Mojito", price: "125 L.E", icon: "assets/icon_iced_salted.png" },
    { name: "Strawberry Mojito", price: "120 L.E", icon: "assets/icon_iced_salted.png" },
    { name: "Watermelon Mojito", price: "120 L.E", icon: "assets/icon_tropical_matcha.png" }
  ],
  "Boba": [
    { name: "Taro Boba", price: "130 L.E", icon: "assets/icon_taro.png" },
    { name: "Brown Sugar Boba", price: "135 L.E", icon: "assets/icon_caramel_cream.png" },
    { name: "Matcha Boba", price: "140 L.E", icon: "assets/icon_tropical_matcha.png" },
    { name: "Mango Boba", price: "135 L.E", icon: "assets/icon_iced_salted.png" },
    { name: "Strawberry Boba", price: "135 L.E", icon: "assets/icon_iced_salted.png" }
  ],
  "Matcha": [
    { name: "Tropical Matcha", price: "125 L.E", icon: "assets/icon_tropical_matcha.png" },
    { name: "Matcha Salted Caramel", price: "145 L.E", icon: "assets/icon_matcha_salted.png" },
    { name: "Iced Matcha Latte", price: "120 L.E", icon: "assets/icon_tropical_matcha.png" },
    { name: "Matcha Boba", price: "140 L.E", icon: "assets/icon_tropical_matcha.png" },
    { name: "Hot Matcha Latte", price: "115 L.E", icon: "assets/icon_tropical_matcha.png" }
  ],
  "Shakes": [
    { name: "Cookies & Cream Shake", price: "150 L.E", icon: "assets/icon_lotus.png" },
    { name: "Pistachio Shake", price: "160 L.E", icon: "assets/icon_pistachio.png" },
    { name: "Chocolate Fudge Shake", price: "150 L.E", icon: "assets/icon_mocha.png" },
    { name: "Biscoff Shake", price: "155 L.E", icon: "assets/icon_lotus.png" }
  ],
  "Hot Drinks": [
    { name: "Spanish Latte", price: "125 L.E", icon: "assets/icon_spanish.png" },
    { name: "Cappuccino", price: "105 L.E", icon: "assets/icon_spanish.png" },
    { name: "Americano", price: "90 L.E", icon: "assets/icon_mocha.png" },
    { name: "Hot Mocha", price: "135 L.E", icon: "assets/icon_mocha.png" },
    { name: "Hot Matcha Latte", price: "115 L.E", icon: "assets/icon_tropical_matcha.png" }
  ]
};
