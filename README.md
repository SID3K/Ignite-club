
# Ignite Club

REST API built using **Node.js** and **MongoDB** for managing club classes and member bookings.

---

## Getting Started

### Installation

```bash
git clone https://github.com/<your-username>/ignite-club-booking.git
cd ignite-club-booking
npm install
```

---

### Running the Server

```bash
npm start
```

The app will start on `http://localhost:5000` (or your configured `PORT`).

---

## Environment Variables

Create a `.env` file in the project root and add the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://siddarth:koppera@cluster0.imbjyzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

---

## API Endpoints

All responses follow RESTful conventions and return appropriate status codes.

---

### Create Member

**POST** `/api/members`

Create a new member.

#### Sample Request Body:

```json
{
  "memberName": "Siddarth Reddy",
  "username": "siddreddy",
  "email": "sidd@example.com"
}
```

---

### Get All Members

**GET** `/api/members`

Returns a list of all members.  
_No query parameters._

---

### Create Class

**POST** `/api/classes`

Creates a new class.

#### Sample Request Body:

```json
{
  "className": "Yoga Session",
  "startDate": "2025-07-15",
  "endDate": "2025-07-20",
  "startTime": "08:00",
  "duration": "60",
  "capacity": "20"
}
```

---

### Get All Classes

**GET** `/api/classes`

Returns all created classes.  
_No query parameters._

---

### Create Booking

**POST** `/api/bookings`

Books a class for a member.

#### Sample Request Body:

```json
{
  "username": "siddreddy",
  "classId": "64f15c3e6d4eab001efb5faa",
  "participationDate": "2025-07-18"
}
```

---

### Search Bookings

**GET** `/api/bookings`

Search bookings by:

- `username`  
- `startDate` and `endDate`

At least one of these must be provided.

#### Sample Query Parameters:

```
/api/bookings?username=siddreddy
```

```
/api/bookings?startDate=2025-07-01&endDate=2025-07-31
```

---

## Testing the API

Use any REST client like **Postman** to test the API.

---

## Project Structure (to be added)

<Coming Soon>

---

## 🧑‍💻 Author

**Siddarth Reddy**  
[GitHub](https://github.com/sid3k)  
Email: siddarthareddykoppera3000@example.com
---

