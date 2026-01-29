const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth').router;
const investRoutes = require('./routes/invest');
const mpesaCallback = require('./routes/mpesaCallback');
const adminRoutes = require('./routes/admin');

require('dotenv').config();
require('./cron');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/invest', investRoutes);
app.use('/api/invest/mpesa', mpesaCallback);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
