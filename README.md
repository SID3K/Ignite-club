
# Ignite Club

A RESTful API built with Node.js and MongoDB for managing daily club classes, member registrations, and class bookings.

---

## Getting Started

### Installation

```bash
git clone https://github.com/SID3K/Ignite-club.git
cd Ignite-club
npm install
```

---

## Environment Variables

Create a `.env` file in the project root and add the following:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
```

---

### Running the Server

```bash
npm start
```

The app will start on `http://localhost:5000`   .

---

## 📌 Usage Instructions

Before booking a class, make sure to follow these steps:

1. **Create a Member**  
   Use the `POST /api/members` endpoint to create a member.

2. **Create a Class**  
   Use the `POST /api/classes` endpoint to create one or more class instances.

3. **View Classes**
   Use the `GET /api/classes` endpoint to fetch all created classes.

4. **Book a Class**  
   Once both member and class are created, use the `POST /api/bookings` endpoint to book the class using the `username` and `classId`.

Refer to the sample request bodies under each API Endpoints section for correct structure.

---

## API Endpoints

All responses follow RESTful conventions and return appropriate status codes.

---

### Create Member

**POST** `/api/members`

Create a new member.

#### Sample Request Body:

**Field Descriptions:**
- `memberName` – required, name of the member  
- `username` – required, unique identifier for the member  
- `email` – optional 

```json
{
  "memberName": "Siddarth Reddy",
  "username": "sidd",
  "email": "siddarth@gmail.com"
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

**Field Descriptions:**
- `className` – required, string  
- `startDate` – required, format: `YYYY-MM-DD`  
- `endDate` – required, must be **after** `startDate`  
- `startTime` – required, format: `HH:mm` (24-hour time)  
- `duration` – required, in minutes  
- `capacity` – required, must be >= 1  

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

**Field Descriptions:**
- `username` – required, must match an existing member's username  
- `classId` – required, must be a valid MongoDB ObjectId representing a class scheduled on a specific date  
- `participationDate` – required, format: `YYYY-MM-DD`, must match the date of the class  

```json
{
  "username": "sidd",
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
/api/bookings?username=sidd
```

```
/api/bookings?startDate=2025-07-01&endDate=2025-07-31
```
```
/api/bookings?username=sidd&startDate=2025-07-01&endDate=2025-07-31
```
---

## Testing the API

Use any REST client like **Postman** to test the API..

---

## Author

**Siddarth Reddy**     
[GitHub](https://github.com/sid3k)   
Email: siddarthareddykoppera3000@gmail.com
---

