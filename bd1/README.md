# FlipDeal API

Welcome to **FlipDeal**, your one-stop destination for premium fitness products! 🚴‍♂️🏋️‍♀️  
We currently offer three items in our catalog: **Shoes**, **Bags**, and **Jackets**.

FlipDeal also introduces the **Prime Membership Program** that offers exclusive discounts to its members, ensuring the best deals on fitness essentials.

---

## 📜 Features

- **Diverse Product Range**: Start small with quality products like shoes, bags, and jackets.
- **Prime Membership Benefits**: Unlock discounts and exclusive deals as a Prime Member.
- **Smart APIs**: Designed to deliver seamless integration for essential eCommerce features like cart management, tax calculations, shipping cost estimates, and more.

---

## 📘 API Endpoints

### 1. **Calculate Cart Total**

**Endpoint**: `/cart-total`  
**Method**: `GET`  
**Description**: Updates the total price of the cart whenever a new item is added.

**Request Parameters**:

- `price` (float): Price of the new item.
- `current_cart_total` (float): The current total price of the cart.

**Response**:

- `updated_cart_total` (float): The new total price of the cart.

---

### 2. **Apply Membership Discount**

**Endpoint**: `/membership-discount`  
**Method**: `GET`  
**Description**: Applies discounts for Prime Members on the cart total.

**Request Parameters**:

- `cart_total` (float): Total price of the cart before discount.
- `membership_status` (boolean): Indicates if the user is a Prime Member.

**Response**:

- `discounted_cart_total` (float): The total price of the cart after the discount.

---

### 3. **Calculate Tax**

**Endpoint**: `/calculate-tax`  
**Method**: `GET`  
**Description**: Calculates a 5% tax on the total cart amount.

**Request Parameters**:

- `cart_total` (float): Total price of the cart before tax.

**Response**:

- `tax_amount` (float): Calculated tax amount.
- `total_with_tax` (float): Total cart price including tax.

---

### 4. **Estimate Delivery Time**

**Endpoint**: `/estimate-delivery`  
**Method**: `GET`  
**Description**: Provides the estimated delivery time based on the shipping method and delivery distance.

**Request Parameters**:

- `shipping_method` (string): Selected shipping method (e.g., "standard", "express").
- `delivery_distance` (float): Distance in kilometers/miles.

**Response**:

- `estimated_delivery_time` (string): Estimated delivery time.

---

### 5. **Calculate Shipping Cost**

**Endpoint**: `/shipping-cost`  
**Method**: `GET`  
**Description**: Calculates shipping costs based on the weight of items and delivery distance.

**Request Parameters**:

- `weight` (float): Total weight of the items in kilograms.
- `delivery_distance` (float): Distance in kilometers/miles.

**Response**:

- `shipping_cost` (float): Calculated shipping cost.

---

### 6. **Calculate Loyalty Points**

**Endpoint**: `/loyalty-points`  
**Method**: `GET`  
**Description**: Calculates loyalty points for the purchase. Earn **2 points per $1 spent**.

**Request Parameters**:

- `cart_total` (float): Total price of the cart.

**Response**:

- `loyalty_points` (integer): Total loyalty points earned.

---

## 🚀 Getting Started

1. Clone this repository.
2. Set up the environment with necessary dependencies.
3. Use the provided API endpoints for seamless integration into your frontend.

---

## 🛠️ Tech Stack

- **Backend**: RESTful API build in Express.js
- **Programming Language**: JavaScript
- **Database**: NA

---

## 🌟 Contributions

We welcome contributions! Feel free to fork this repository and submit a pull request to improve the codebase or add features.

---

## 📞 Support

For queries or support, please contact us at:  
**Email**: support@flipdeal.com  
**Phone**: +91-7**56\*\***8

Happy Shopping with FlipDeal! 🎉