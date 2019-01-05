/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');
const auth = require('./auth.json');

// Create an instance of a Discord client
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
    // Process ! commands
    if (message.content.substring(0, 1) == '!') {
        processCommand(client, message);
    }
});

function processCommand(client, message) {
    var args = message.content.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);

    switch (cmd) {
        case 'ping':
            message.channel.send('pong');
            console.log(args);
            break;
    }
};

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);