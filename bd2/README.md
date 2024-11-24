# TripWithUs API

Welcome to **TripWithUs**, a global hotel listing platform started by passionate travelers from Bangalore! 🌍  
We are currently focusing on listing hotels across various categories and locations, aiming to make your travel experience seamless and memorable.

---

## 📜 Features

- **Sort Hotels**: By pricing, rating, or reviews.
- **Filter Hotels**: By amenities, country, or category.
- **Comprehensive Listings**: Retrieve all hotels with a single endpoint.

---

## 📘 API Endpoints

### 1. **Sort Hotels by Pricing**

**Endpoint**: `/hotels/sort/pricing`  
**Method**: `GET`  
**Description**: Sort hotels by pricing in either ascending (`low-to-high`) or descending (`high-to-low`) order.

**Request Parameters**:

- `pricing` (string): Sorting order (`low-to-high` or `high-to-low`).

---

### 2. **Sort Hotels by Ratings**

**Endpoint**: `/hotels/sort/rating`  
**Method**: `GET`  
**Description**: Sort hotels based on their ratings in ascending (`low-to-high`) or descending (`high-to-low`) order.

**Request Parameters**:

- `rating` (string): Sorting order (`low-to-high` or `high-to-low`).

---

### 3. **Sort Hotels by Reviews**

**Endpoint**: `/hotels/sort/reviews`  
**Method**: `GET`  
**Description**: Sort hotels by reviews in ascending (`least-to-most`) or descending (`most-to-least`) order.

**Request Parameters**:

- `reviews` (string): Sorting order (`least-to-most` or `most-to-least`).

---

### 4. **Filter Hotels by Amenity**

**Endpoint**: `/hotels/filter/amenity`  
**Method**: `GET`  
**Description**: Filter hotels by a specific amenity (e.g., spa, bar, pool).

**Request Parameters**:

- `amenity` (string): Amenity to filter by.

---

### 5. **Filter Hotels by Country**

**Endpoint**: `/hotels/filter/country`  
**Method**: `GET`  
**Description**: Filter hotels by country (e.g., India, USA, France).

**Request Parameters**:

- `country` (string): Country to filter by.

---

### 6. **Filter Hotels by Category**

**Endpoint**: `/hotels/filter/category`  
**Method**: `GET`  
**Description**: Filter hotels by category (e.g., luxury, budget, mid-range).

**Request Parameters**:

- `category` (string): Category to filter by.

---

### 7. **Get All Hotels**

**Endpoint**: `/hotels`  
**Method**: `GET`  
**Description**: Retrieve all available hotels.

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
**Email**: support@tripwithus.com  
**Phone**: +91-7**56\*\***8

Happy Travels with TripWithUs! 🏨 ✈️ 🌏
