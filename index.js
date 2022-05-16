const { Client , Intents , Collection}  = require('discord.js')
const client = new Client({intents:32767})
const fs = require('fs')
const { prefix , token} = require('./config.json')

client.once('ready',()=>{
    console.log("봇이 준비되었습니다")
})

client.on('messageCreate' , message=>{
    if(message.content == "핑"){
        message.reply("퐁")
    }
})
client.commands = new Collection()

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try{
        command.execute(message,args)
    } catch (error) {
        console.error(error)
    }
})

client.login("OTY3Nzg0ODk0MzAwMjk1MTg4.YmVV6w.0of9fI6sxRPeBJ5HeIf416_05tI")