const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 
const websocket = require("ws")
client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();
const colors =require("colors");
console.log(colors.yellow(`
██╗  ██╗███████╗    ██╗ █████╗ 
╚██╗██╔╝██╔════╝    ██║██╔══██╗
 ╚███╔╝ █████╗      ██║███████║
 ██╔██╗ ██╔══╝      ██║██╔══██║
██╔╝ ██╗██║         ██║██║  ██║
╚═╝  ╚═╝╚═╝         ╚═╝╚═╝  ╚═╝`))
client.on('ready', () => {
    console.log(`${client.user.tag} est connecté`)
    client.user.setActivity("Onyx Perso [discord.gg/onyxbots]", {type: "STREAMING", url: "https://www.twitch.tv/onyxbotdiscord"});
    const wsClient = new websocket("ws://localhost:30132")
    wsClient.on('open', ws => {
 wsClient.send(JSON.stringify({
    type: "connection",
    id: client.user.id,
    ws: ws,
    tag: client.user.tag
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

            
            client.on('guildCreate', async (guild) => {
            
                console.log(`**J'ai rejoint le serveur*** ${guild.name} [${guild.memberCount}]`)
                wsJoins.send((JSON.stringify(`**${client.user.tag}** ***à rejoins le serveur*** ${guild.name} [${guild.memberCount}]`)))
                }) })
            })