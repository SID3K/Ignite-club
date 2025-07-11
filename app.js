const express = require('express');
const classRoutes = require('./routes/classRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const memberRoutes = require('./routes/memberRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use('/api/classes', classRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/members', memberRoutes);
app.use(errorHandler);


module.exports = app;