# Lucky Draw

This is a MERN stack project based on the concept of Lucky Draw

Link to live project [https://luckydrawproject.herokuapp.com/](https://luckydrawproject.herokuapp.com/)

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

The detail description of all API endpoints [https://documenter.getpostman.com/view/11040481/TzCL7nf8](https://documenter.getpostman.com/view/11040481/TzCL7nf8)

## API Endpoints for User
| Type  | URL | Endpoint |
| ------------- | ------------- | ------------- |
| Post | /api/users/ | Register User |
| Post | /api/users/login | For login |
| Post | /api/users/generateevent | Admin only endpoint for generating event giving Date, Price and Ticket Quantity | 
| Get | /api/users/findwinner | Admin only endpoint for finding random winner on current date |
| Get | /api/users/bookticket/:ticketId | Route for booking a ticket |
| Get | /api/users/mytickets | Route for getting all booked ticket by current user |

## API Endpoints for Tickets
| Type  | URL | Endpoint |
| ------------- | ------------- | ------------- |
| Get | /api/tickets/alltickets | Get all tickets |
| Get | /api/tickets/availabletickets | Get all available tickets |
| Get | /api/tickets/bookedtickets | Get all booked tickets | 

## API Endpoints for Events
| Type  | URL | Endpoint |
| ------------- | ------------- | ------------- |
| Get | /api/events/allevents | Get all events |
| Get | /api/events/futureevents | Get all future events |
| Get | /api/events/lastwinners | Get all last winners in one week |

## Rules
- One User One Ticket for on Event
- Ticket can be booked only till 7:00 am before event at 8:00 am on current date
- Event can be generated by passing date in mm/dd/yyyy format, price and quantity of tickets
- If event on that date already present only new tickets will be generated


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

## Different Navbars

### Normal Navbar
![Normal Navbar](/images/navbar1.png)

### User SignedIn Navbar
![User SignedIn Navbar](/images/navbar2.png)

### Admin SignedIn Navbar
![Admin SignedIn Navbar](/images/navbar3.png)

## Different Screens

### Main Screen
![Main Screen](/images/main_screen.png)

### Winners Screen
![Winners Screen](/images/winners_screen.png)

### SignIn Screen
![SignIn Screen](/images/signin_screen.png)

### Register Screen
![Register Screen](/images/signup_screen.png)

### User MyTickets Screen
![User MyTickets Screen](/images/mytickets_screen.png)
