
require('dotenv').config();
const fs=require('fs');
const {Client,GatewayIntentBits,Collection,REST,Routes}=require('discord.js');

const client=new Client({
 intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildModeration]
});

client.commands=new Collection();
const commands=[];

fs.readdirSync('./commands').forEach(f=>{
 const cmd=require(`./commands/${f}`);
 client.commands.set(cmd.data.name,cmd);
 commands.push(cmd.data.toJSON());
});

const rest=new REST({version:'10'}).setToken(process.env.TOKEN);
(async()=>{
 try{
  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID),{body:commands});
  console.log("Commands Registered");
 }catch(e){console.error(e);}
})();

fs.readdirSync('./events').forEach(f=>{
 const ev=require(`./events/${f}`);
 client.on(ev.name,(...args)=>ev.execute(...args,client));
});

client.on('interactionCreate',async i=>{
 if(!i.isChatInputCommand()) return;

 if(!i.member.permissions.has("Administrator")){
  return i.reply({content:"Admin only",ephemeral:true});
 }

 const cmd=client.commands.get(i.commandName);
 if(cmd) await cmd.execute(i);
});

client.login(process.env.TOKEN);
