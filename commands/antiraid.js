
const { SlashCommandBuilder } = require('discord.js');
const fs=require('fs');

module.exports={
 data:new SlashCommandBuilder()
  .setName('antiraid')
  .setDescription('Toggle antiraid')
  .addBooleanOption(o=>
    o.setName('state')
     .setDescription('Enable or disable antiraid')
     .setRequired(true)
  ),

 async execute(i){
  const state=i.options.getBoolean('state');
  const config=require('../data/config.json');
  config['antiRaid']=state;
  fs.writeFileSync('./data/config.json',JSON.stringify(config,null,2));
  i.reply('antiraid set to '+state);
 }
}
