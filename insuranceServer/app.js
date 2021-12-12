const express = require('express');
const cors = require('cors');
const policyRoutes = require('./routes/policy.route');

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(policyRoutes);

app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
})

app.listen(3000);