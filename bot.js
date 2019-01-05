/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

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