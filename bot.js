// Import the discord.js module
const Discord = require('discord.js');
const auth = require('./auth.json');
const request = require('request');

request('https://rocketleague.tracker.network/profile/steam/tasogare', { json: true }, (err, res, body) => {

    if (err) { return console.log(err); }

    console.log(body.url);
    console.log(body.explanation);
});

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
        case 'hooah': 
            message.channel.send('Hoooaaaah!');
            console.log(args);
            break;
    }
};

client.login(auth.token);