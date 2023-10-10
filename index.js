const express = require('express');
const redis = require('redis');

const client = redis.createClient({
    url: 'rediss://red-cki1jcsldqrs73f8h1t0:AOLw9I9xkrr7oStAOg8SDO57VC9kThyF@oregon-redis.render.com:6379'
});

// Connect to Redis
client.connect();

// Check if the connection is successful
client.on('ready', () => {
    console.log('Connected to Redis!');
    // Once the connection is successful, you can start using Redis commands
    // For example, to set a value in Redis:
    // Set a value in Redis with a callback function
    client.set('my-key', 'my-value', (err, reply) => {
        if (err) {
            console.error(err);
            return;
        }

        // The value was set successfully
        console.log(reply);
    });

    // To get a value from Redis:
    client.get('my-key', (err, reply) => {
        if (err) {
            console.error(err);
            return;
        }

        // The value is in the `reply` variable
        console.log(reply);
    });
});

// Handle errors
client.on('error', (err) => {
    console.error(err);
});




const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Set the port for the server


// Create a route for the root URL
app.get('/getdatafromredis', (req, res) => {
    var query = req.query;
    var key = query.key;
    var value = query.value;
    console.log(query);
    client.get(key)
    .then(function(output) {
        var output = {
            value: 'Hello World!',
            res: output
        }
        res.send(output);
    })
    
});

app.get('/', (req, res) => {
    var output = {
        value: 'Hello Universe!',
        res: res
    }
    res.send(output);
    
});

app.get('/setdatainredis', (req, res) => {
    var query = req.query;
    var key = query.key;
    var value = query.value;
    console.log(query);
    client.set(key, value)
    .then(function(res, err){
        console.log(res);
    })
    var output = {
        value: 'Hello World!',
        res: res
    }
    res.send(output);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});
