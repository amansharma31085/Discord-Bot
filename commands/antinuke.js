
const { SlashCommandBuilder } = require('discord.js');
const fs=require('fs');

module.exports={
 data:new SlashCommandBuilder()
  .setName('antinuke')
  .setDescription('Toggle antinuke')
  .addBooleanOption(o=>
    o.setName('state')
     .setDescription('Enable or disable antinuke')
     .setRequired(true)
  ),

 async execute(i){
  const state=i.options.getBoolean('state');
  const config=require('../data/config.json');
  config['antiNuke']=state;
  fs.writeFileSync('./data/config.json',JSON.stringify(config,null,2));
  i.reply('antinuke set to '+state);
 }
}
