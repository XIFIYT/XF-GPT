const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config");
const prefix = config.prefix;
const botname = "XF GEN";
const prefix1 = "x!";
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");
var express = require('express');
var app = express();
const chalk = require('chalk');
const websocket = require("ws")

const colors = require('colors');
  bot.on('ready', msg => {                               
console.log(colors.green(`
██╗  ██╗███████╗     ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗███████╗██╗   ██╗██████╗ 
╚██╗██╔╝██╔════╝    ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██║   ██║██╔══██╗
 ╚███╔╝ █████╗      ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   █████╗  ██║   ██║██████╔╝
 ██╔██╗ ██╔══╝      ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██╔══╝  ██║   ██║██╔══██╗
██╔╝ ██╗██║         ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ███████╗╚██████╔╝██║  ██║
╚═╝  ╚═╝╚═╝          ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝  ╚═╝`))

  console.log(colors.green("Connecté en tant que " + bot.user.tag+ " | Prefix : " + prefix1))
 
  const ActivityType  = require("discord.js")
  bot.user.setActivity({name: bot.user.username});

}); 

bot.on("message", message => {
    if (message.channel.id === config.channel) { 
        if (message.author.bot) return;
        var command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];

        if (command === "gen") {
            if (generated.has(message.author.id)) {
                message.channel.send(
                    "Vous avez un temps de récupération de 60 MINUTES! - " +
                    message.author.tag
                );
            } else {
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                if (!args[0])
                    return message.reply("Veuillez donner un nom!");
                var fs = require("fs");
                const filePath = __dirname + "/comptes/" + args[0] + ".txt";

                const embed = {
                    title: "En rupture de stock!",
                    description: "Ce que vous avez demandé est actuellement en rupture de stock!",
                    color: 0xC1FF72,
                    author: {
                        url: "https://discord.gg/xifi",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };

                fs.readFile(filePath, function (err, data) {
                    if (!err) {
                        data = data.toString();
                        var position = data.toString().indexOf("\n");
                        var firstLine = data.split("\n")[0];
                        if(position == -1)
                        return message.channel.send({ embed });
                        message.author.send(firstLine);
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (err) {
                                const embed = {
                                    title: "Compte " + args[0] + " généré!",
                                    description: "Le compte de votre service demandé a été envoyé en tant que DM!",
                                    color: 0xC1FF72,
                                    timestamp: new Date(),
                                    footer: {
                                        text: "By XIFI"
                                    },
                                    image: {
                                        url:
                                            "https://cdn.discordapp.com/attachments/1118216813050875984/1126035706196799498/Copie_de_M.jpg"
                                    },
                                    author: {
                                        name: botname,
                                        url: "https://discord.gg/xifi",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => {
                                    generated.delete(message.author.id);
                                }, 150000); // 86400000 = 24 H , 150000 = 15 Min
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            message.channel.send("En rupture de stock!");
                        }
                    } else {
                        const embed = {
                            title: "Service non trouvé!",
                            description: "Le service demandé est introuvable!",
                            color: 0xC1FF72,
                            timestamp: new Date(),
                            author: {
                                     url: "https://discord.gg/xifi",
                                icon_url: bot.displayAvatarURL
                            },
                            fields: []
                        };
                        message.channel.send({ embed });
                        return;
                    }
                });
            }
        }
        else
            if (command === "count") {
                const embed = {
                    title: "Stats de " + botname,
                    description: "Nombre  d'utilisateurs: `" + bot.users.cache.size + " membres`\nNombre total de salon: `" + bot.channels.cache.size+ "`\nNombre total de serveur: `" + bot.guilds.cache.size+ " serveur(s)`\n",
                    color: 0xC1FF72,
                    footer: {
                        text: "By XIFI"
                    },
                   
                    author: {
                         name: botname + " - générateur de compte",
                         url: "https://discord.gg/xifi",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            }
            else
             if (command === "support") {
                const embed = {
                    title: "Support",
                    description: "Server XF ENGINE : https://discord.gg/MfUUzqMa5n",
                    color: 0xC1FF72,
                    fields: []
                };
                message.channel.send({ embed });
            } else 
            if (command === "help") {

                const embed = {
                    color: 0xC1FF72,
                    title: botname + ' - générateur de compte',
                    url: 'https://discord.gg/xifi',
                    author: {
                        name: 'Liste des commandes',
                        url: 'https://discord.gg/xifi',
                    },

                    description: `
                     \`\`\`yaml\nprefix: x!\`\`\`
                     \`\`\`yaml\ngen <Nom du service>\`\`\`
                     \`\`\`yaml\ncreate <Nom du service>\`\`\`
                     \`\`\`yaml\nrestock <Nom du service> <Nombre de compte>\`\`\`
                     \`\`\`yaml\nadd <mail:pass> <Nom du service>\`\`\`
                     \`\`\`yaml\nstats\`\`\`
                     \`\`\`yaml\nsupport\`\`\``,
                    footer: {
                        text: 'By XIFI',
                    },
                };
                message.channel.send({ embed });
            }

        if (command === "add") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Vous n'avez pas les autorisations pour faire cela!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            var account = args[0]
            var service = args[1]
            if(!account) return message.reply("Fournissez d'abord une chaîne de compte formatée!")
            if(!service) return message.reply("Fournir d'abord un service!")
            const filePath = __dirname + "/comptes/" + args[1] + ".txt";
            fs.appendFile(filePath, os.EOL + args[0], function (err) {
                if (err) return console.log(err);
                const embed = {
                    title: "Compte ajouté!",
                    description: "Compte ajouté avec succès à `" + service + "`!",
                    color: 0xC1FF72,
                    timestamp: new Date(),
                    footer: {
                       
                        text: "By XIFI"
                    },
                    image: {url:"https://cdn.discordapp.com/attachments/1092091901747929229/1113495484892459059/XF.jpg"},
                    author: {
                        name: botname + " - générateur de compte",
                        url: "https://discord.gg/xifi",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });


        }
        if (command === "create") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Vous n'avez pas les autorisations pour faire cela!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            const filePath = __dirname + "/comptes/" + args[0] + ".txt";
            fs.writeFile(filePath, 'XIFI:XFENGINE', function (err) {
                if (err) throw err;
                const embed = {
                    title: "Service créé!",
                    description: "Service créé avec succès `" + args[0] + "`!",
                    color: 0xC1FF72,
                    timestamp: new Date(),
                    footer: {
                        text: "By XIFI "
                    },
                    image: {url:"https://cdn.discordapp.com/attachments/1118216813050875984/1126066576987267113/Copie_de_Mddd.jpg"},
                    author: {
                        name: botname + " - générateur de compte",
                        url: "https://discord.gg/xifi",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });
        }
        if (command === "restock") {
            const embed = {
                title: "Merci de mettre un service!",
                description: "Veuillez fournir le nom du service réapprovisionné!",
                color: 0xC1FF72,
                timestamp: new Date(),
               
                 
                 author: {                     },
                author: {
                    name: botname + " - générateur de compte ",
                    url: "https://discord.gg/xifi",
                    icon_url: bot.displayAvatarURL
                },
                fields: []
            };
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Vous n'avez pas les autorisations pour faire cela!");
            if (!args[0])
            {
                return message.channel.send({ embed });
            }
            if (!args[1])
            {
                return message.channel.send({ embed });
            }
            else {
            message.channel.send("@everyone\n● Restock de compte: **" + args[0] + "**\n● Nombre de compte restock: **" + args[1] + " compte(s)**\n● Restock par: " + "<@" + message.author.id +">");
            }
        }
    }
});
bot.on('ready', () => {
    console.log(`${bot.user.tag} est connecté`)
    bot.user.setActivity("Onyx Perso [discord.gg/onyxbots]", {type: "STREAMING", url: "https://www.twitch.tv/onyxbotdiscord"});
    const wsClient = new websocket("ws://localhost:30132")
    wsClient.on('open', ws => {
 wsClient.send(JSON.stringify({
    type: "connection",
    id: bot.user.id,
    ws: ws,
    tag: bot.user.tag
 }
 ))
        wsClient.on('message', async data => {   
            console.log(JSON.parse(data))
            let received = JSON.parse(data)
            if(received.cmd == "restart"){
                restart: process.exit()
            }  
            if(received.cmd == "stop"){
                restart: process.kill()
            }            
       
            
            console.log("Onyx Client | by Sown#0001 &  Atoya#9098");
            console.log("---------------------------------------");
            console.log(`[BOT]: ${client.user.username} est On !`);
            console.log(`[PREFIX]: ${config.prefix}`);
            console.log(`[GUILDS]: ${client.guilds.cache.size}`);
            console.log(`[CHANNELS]: ${client.channels.cache.size}`);
            console.log(`[USERS]: ${client.users.cache.size}`)}) 

            
            bot.on('guildCreate', async (guild) => {
            
                console.log(`**J'ai rejoint le serveur*** ${guild.name} [${guild.memberCount}]`)
                wsJoins.send((JSON.stringify(`**${client.user.tag}** ***à rejoins le serveur*** ${guild.name} [${guild.memberCount}]`)))
                }) })
            })
bot.login(config.token);
