
const { SlashCommandBuilder } = require('discord.js');
const fs=require('fs');

module.exports={
 data:new SlashCommandBuilder()
  .setName('botprotection')
  .setDescription('Toggle botprotection')
  .addBooleanOption(o=>
    o.setName('state')
     .setDescription('Enable or disable botprotection')
     .setRequired(true)
  ),

 async execute(i){
  const state=i.options.getBoolean('state');
  const config=require('../data/config.json');
  config['botProtection']=state;
  fs.writeFileSync('./data/config.json',JSON.stringify(config,null,2));
  i.reply('botprotection set to '+state);
 }
}
