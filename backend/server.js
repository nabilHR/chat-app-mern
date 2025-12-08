const express = require('express');

const app = express();

const PORT = 7070;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}! `);
})


