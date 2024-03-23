# travel-guide
It is an online platform that provides travelers' reviews on a wide variety of places, such as hotels, restaurants, tourist attractions, and other places of interest in a specific city. It can be very useful for planning your vacation, seeing the recommendations of people who have visited the place before you.


### Endpoints: 


#### User Management: 

1. **User Registration**: 

   - `POST /api/users/register`: Create a new user. 

2. **User Authentication**: 

   - `POST /api/users/login`: Authenticate user and generate JWT token. 

3. **Profile Management**: 

   - `GET /api/users/profile`: Get user profile. 

   - `PUT /api/users/profile`: Update user profile. 

   - `PUT /api/users/password`: Update user password. 

4. **Admin Management**: 

   - `GET /api/users/admin`: Get list of admin users (admin access required). 

  

#### Reviews and Ratings: 

5. **Reviews**: 

   - `POST /api/reviews`: Create a new review. 

   - `GET /api/reviews/:id`: Get review by ID. 

   - `GET /api/reviews`: Get all reviews. 

   - `PUT /api/reviews/:id`: Update review. 

   - `DELETE /api/reviews/:id`: Delete review. 

6. **Ratings**: 

   - `POST /api/ratings`: Rate an entity (hotel, restaurant, attraction, etc.). 

   - `GET /api/ratings/:id`: Get rating by ID. 

   - `GET /api/ratings/entity/:entityId`: Get all ratings for a specific entity. 

   - `PUT /api/ratings/:id`: Update rating. 

   - `DELETE /api/ratings/:id`: Delete rating. 

  

#### Accommodation Booking: 

7. **Accommodations**: 

   - `POST /api/accommodations`: Create a new accommodation listing. 

   - `GET /api/accommodations/:id`: Get accommodation by ID. 

   - `GET /api/accommodations`: Get all accommodations. 

   - `PUT /api/accommodations/:id`: Update accommodation listing. 

   - `DELETE /api/accommodations/:id`: Delete accommodation listing. 

8. **Booking**: 

   - `POST /api/bookings`: Make a new booking. 

   - `GET /api/bookings/:id`: Get booking by ID. 

   - `GET /api/bookings/user/:userId`: Get all bookings for a user. 

   - `PUT /api/bookings/:id`: Update booking details. 

   - `DELETE /api/bookings/:id`: Cancel booking. 

  

#### Restaurant Listings and Reservations: 

9. **Restaurants**: 

   - `POST /api/restaurants`: Create a new restaurant listing. 

   - `GET /api/restaurants/:id`: Get restaurant by ID. 

   - `GET /api/restaurants`: Get all restaurants. 

   - `PUT /api/restaurants/:id`: Update restaurant listing. 

   - `DELETE /api/restaurants/:id`: Delete restaurant listing. 

10. **Reservation**: 

   - `POST /api/reservations`: Make a new restaurant reservation. 

   - `GET /api/reservations/:id`: Get reservation by ID. 

   - `GET /api/reservations/user/:userId`: Get all reservations for a user. 

   - `PUT /api/reservations/:id`: Update reservation details. 

   - `DELETE /api/reservations/:id`: Cancel reservation. 

  

#### Attractions and Activities: 

11. **Attractions**: 

   - `POST /api/attractions`: Create a new attraction listing. 

   - `GET /api/attractions/:id`: Get attraction by ID. 

   - `GET /api/attractions`: Get all attractions. 

   - `PUT /api/attractions/:id`: Update attraction listing. 

   - `DELETE /api/attractions/:id`: Delete attraction listing. 

12. **Activity Booking**: 

   - `POST /api/bookings/activities`: Make a new activity booking. 

   - `GET /api/bookings/activities/:id`: Get activity booking by ID. 

   - `GET /api/bookings/activities/user/:userId`: Get all activity bookings for a user. 

   - `PUT /api/bookings/activities/:id`: Update activity booking details. 

   - `DELETE /api/bookings/activities/:id`: Cancel activity booking. 

  

### Database Models: 

  

#### User Model: 

```javascript 

{ 

  username: String, 

  email: String, 

  password: String, 

  role: { type: String, enum: ['user', 'admin'], default: 'user' }, 

  // Additional fields for profile management (name, avatar, etc.) 

} 

``` 

  

#### Review Model: 

```javascript 

{ 

  user: { type: Schema.Types.ObjectId, ref: 'User' }, 

  entity: { type: Schema.Types.ObjectId, required: true }, 

  entityType: { type: String, required: true }, 

  rating: { type: Number, required: true }, 

  comment: String, 

  // Additional fields (date, helpful count, etc.) 

} 

``` 

  

#### Accommodation Model: 

```javascript 

{ 

  name: String, 

  location: String, 

  description: String, 

  // Additional fields (price, facilities, images, etc.) 

} 

``` 

  

#### Booking Model: 

```javascript 

{ 

  user: { type: Schema.Types.ObjectId, ref: 'User' }, 

  accommodation: { type: Schema.Types.ObjectId, ref: 'Accommodation' }, 

  // Additional fields (date, duration, total price, status, etc.) 

} 

``` 

  

#### Restaurant Model: 

```javascript 

{ 

  name: String, 

  location: String, 

  cuisine: String, 

  // Additional fields (price range, opening hours, menu, etc.) 

} 

``` 

  

#### Reservation Model: 

```javascript 

{ 

  user: { type: Schema.Types.ObjectId, ref: 'User' }, 

  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' }, 

  // Additional fields (date, time, number of guests, special requests, etc.) 

} 

``` 

  

#### Attraction Model: 

```javascript 

{ 

  name: String, 

  location: String, 

  description: String, 

  // Additional fields (ticket price, opening hours, images, etc.) 

} 

``` 

  

#### Activity Booking Model: 

```javascript 

{ 

  user: { type: Schema.Types.ObjectId, ref: 'User' }, 

  attraction: { type: Schema.Types.ObjectId, ref: 'Attraction' }, 

  // Additional fields (date, time, number of tickets, total price, etc.) 

} 

``` 

  

 
