const express = require('express')
const app = express();
require('express-ws')(app);

const PORT = 6500;

app.use(express.static('public'));

app.ws('/colorChange', (ws, req) => {
    ws.on('message', (msg) => {
        console.log(msg);
    });
});

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));
