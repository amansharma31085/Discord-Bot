
const { SlashCommandBuilder } = require('discord.js');
const fs=require('fs');

module.exports={
 data:new SlashCommandBuilder()
  .setName('autorestore')
  .setDescription('Toggle autorestore')
  .addBooleanOption(o=>
    o.setName('state')
     .setDescription('Enable or disable autorestore')
     .setRequired(true)
  ),

 async execute(i){
  const state=i.options.getBoolean('state');
  const config=require('../data/config.json');
  config['autoRestore']=state;
  fs.writeFileSync('./data/config.json',JSON.stringify(config,null,2));
  i.reply('autorestore set to '+state);
 }
}
