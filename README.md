# Lucky Draw

This is a MERN stack project based on the concept of Lucky Draw

## Features

- User Login and Registration
- Admin Controls of Creating Events, Generating Ticktets
- Booking ticket for every event at 8:00 am
- Seperate screens for Events, Tickets, Login, Registration

## Modules

The project is divided in three sections at every place
- Events
- Tickets
- Users

The detail description of all API endpoints 

## API Endpoints for User
| Type  | URL | Endpoint |
| ------------- | ------------- | ------------- |
| Post | /api/users/ | Register User |
| Post | /api/users/login | For login |
| Post | /api/users/generateevent | Admin only endpoint for generating event giving Date, Price and Ticket Quantity | 
| Get | /api/users/findwinner | Admin only endpoint for finding random winner on current date |
| Get | /api/users/bookticket/:ticketId | Route for booking a ticket |
| Get | /api/users/mytickets | Route for getting all booked ticket by current user |



## Usage

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb uri
JWT_SECRET = Any secret 
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```
