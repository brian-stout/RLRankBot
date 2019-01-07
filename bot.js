// Import the discord.js module
const Discord = require('discord.js');
const auth = require('./auth.json');
const request = require('request');
const cheerio = require('cheerio'),
    cheerioTableparser = require('cheerio-tableparser');

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

async function processCommand(client, message) {
    var arg = message.content.substring(1).split(' ');
    var cmd = arg[0];

    arg = arg.splice(1);

    switch (cmd) {
        case 'hooah': 
            message.channel.send('Hoooaaaah!');
            break;
        case 'rank':
            var rank = await getRank(arg[0], arg[1]);
            var highestRank = await getHighestRank(rank);
            message.channel.send(highestRank);
            break;
    }
};

async function getRank(platform, id) {
    var string = `https://rocketleague.tracker.network/profile/${platform}/${id}`;

    return new Promise(function (resolve, reject) {

        request(string, function (error, response, body) {

            var regex = /\{\sname:\s\'[\w\s\-]+\',\sdata:\s\[((\d){0,4}(,)?){0,10}\]\s\}/g;
            var ranks = { "unranked": 0, "1v1": 0, "2v2": 0, "3v3": 0, "solo3v3": 0, "hoops": 0, "rumble": 0, "dropshot": 0, "snowday": 0 };
            var result;

            do {
                result = regex.exec(body);
                if (result) {
                    result = result[0]
                    result = result.replace(/name:/, '"name":');
                    result = result.replace(/data:/, '"data":');
                    result = result.replace(/\'/, '"');
                    result = result.replace(/\'/, '"');
                    result = JSON.parse(result);

                    switch (result["name"]) {
                        case 'Un-Ranked':
                            ranks["unranked"] = result["data"];
                            break;
                        case 'Ranked Duel 1v1':
                            ranks["1v1"] = result["data"];
                        case 'Ranked Doubles 2v2':
                            ranks["2v2"] = result["data"];
                            break;
                        case 'Ranked Standard 3v3':
                            ranks["3v3"] = result["data"];
                            break;
                        case 'Ranked Solo Standard 3v3':
                            ranks["solo3v3"] = result["data"];
                            break;
                        case 'Hoops':
                            ranks["hoops"] = result["data"];
                            break;
                        case 'Rumble':
                            ranks["rumble"] = result["data"];
                            break;
                        case 'Dropshot':
                            ranks["dropshot"] = result["data"];
                            break;
                        case 'Snowday':
                            ranks["snowday"] = result["data"];
                            break;
                    }
                }
            } while (result);

            resolve(ranks);
        });
    });
}

async function getHighestRank(ranks) {
    var highestRank = 0;

    return new Promise(function (resolve, reject) {
        for (let mmr of ranks['1v1']) {
            if (mmr > highestRank) {
                highestRank = mmr;
            }
        }

        for (let mmr of ranks['2v2']) {
            if (mmr > highestRank) {
                highestRank = mmr;
            }
        }

        for (let mmr of ranks['3v3']) {
            if (mmr > highestRank) {
                highestRank = mmr;
            }
        }

        for (let mmr of ranks['solo3v3']) {
            if (mmr > highestRank) {
                highestRank = mmr;
            }
        }

        resolve(highestRank);

    });
}

client.login(auth.token);