
const { SlashCommandBuilder } = require('discord.js');
const fs=require('fs');

module.exports={
 data:new SlashCommandBuilder()
  .setName('whitelist')
  .setDescription('Whitelist a user')
  .addUserOption(o=>
    o.setName('user')
     .setDescription('User to whitelist')
     .setRequired(true)
  ),

 async execute(i){
  const u=i.options.getUser('user');
  const d=require('../data/whitelist.json');
  if(!d.users.includes(u.id)){
   d.users.push(u.id);
   fs.writeFileSync('./data/whitelist.json',JSON.stringify(d,null,2));
  }
  i.reply("Whitelisted");
 }
}
