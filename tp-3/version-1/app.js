const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const db = require('./db'); // MySQL database connection
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users = {}; // To store user IDs
const connections = {}; // To store WebSocket connections


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// ------------------------------- app.post whit Stored procedures -------------------------------

app.post('/login', (req, res) => {
    const { txtName, txtLastname, txtPassword } = req.body;

    db.query('CALL sp_login_user(?, ?, ?)', [txtName, txtLastname, txtPassword], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en la base de datos');
        }

        // If no results are found, redirect to the home page
        if (results[0].length > 0) {
            const account = results[0][0]; // We take the first result (it should be only one)
            req.session.logged = true;
            req.session.userId = account.id; // Store user ID in session
            req.session.userName = `${account.name} ${account.lastname}`; // Store full name

            users[req.session.userId] = account.id; // Add userId to users object
            res.redirect('/chat'); // Redirect to chat
        } else {
            res.redirect('/'); // Redirect to login if user is not found
        }
    });
});

app.get('/chat', (req, res) => {
    if (req.session.logged) {
        res.render('chat', { userId: req.session.userId }); // Pass userId to the chat page
    } else {
        res.redirect('/');
    }
});

// WebSocket connection handler
wss.on('connection', (connection) => {
    const clientId = guid(); // Generate unique clientId
    connections[clientId] = { connection }; // Store connection in connections object

    connection.on('message', (message) => {
        const result = JSON.parse(message);

        // Register userId to WebSocket connection
        if (result.method === "register") {
            const userId = result.userId; // Get userId from message
            connections[clientId].userId = userId; // Assign userId to this connection

            // Query the database for name and lastname
            db.query('SELECT name, lastname FROM user WHERE id = ?', [userId], (err, results) => {
                if (err) throw err;
                if (results.length > 0) {
                    const { name, lastname } = results[0];
                    connections[clientId].fullName = `${name} ${lastname}`; // Store full name in connections

                    // Broadcast updated user list
                    broadcastUserList();
                }
            });
        }

        // Handle incoming messages
        if (result.method === "message") {
            const recipientId = result.receiver; // Get recipient userId
            
            // Send the message to the recipient, decrypted
            for (const id in connections) {
                if (connections[id].userId == recipientId && connections[id].connection.readyState === WebSocket.OPEN) {
                    connections[id].connection.send(JSON.stringify({
                        method: "message",
                        sender: connections[clientId].fullName, // Send sender's full name
                        data: result.data
                    }));
                }
            }

            // No need to send the message back to the sender, since the frontend already handles it.
        }
    });

    connection.on('close', () => {
        delete connections[clientId]; // Remove user on disconnect
        broadcastUserList(); // Update user list
        console.log(`User ${clientId} disconnected`);
    });
});


// Broadcast user list to all connections
function broadcastUserList() {
    const userList = Object.values(connections).map(user => ({
        userId: user.userId,
        fullName: user.fullName
    })); // List of online users with full names
    for (const id in connections) {
        if (connections[id].connection.readyState === WebSocket.OPEN) {
            connections[id].connection.send(JSON.stringify({ method: "userList", users: userList }));
        }
    }
}

// Helper function to generate unique client IDs
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// Definition of the encryption algorithm and key size
const algorithm = 'aes-256-cbc';
const sharedKey = crypto.randomBytes(32); // The server encryption key
const iv = crypto.randomBytes(16); // The initialization vector (IV)

// API to get the shared key
app.get('/getSharedKey', (req, res) => {
    res.json({ key: sharedKey.toString('hex'), iv: iv.toString('hex') }); // Returns the key and IV in hexadecimal format
});


// Start the server
server.listen(5000, () => {
    console.log('Server running on port 5000...');
});
