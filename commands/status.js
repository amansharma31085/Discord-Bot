
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports={
 data:new SlashCommandBuilder()
  .setName('status')
  .setDescription('Show all system status'),

 async execute(i){
  const c=require('../data/config.json');
  const e=new EmbedBuilder()
   .setTitle("SYSTEM STATUS")
   .setColor("Blue")
   .addFields(
    {name:"AntiNuke",value:String(c.antiNuke)},
    {name:"AntiRaid",value:String(c.antiRaid)},
    {name:"AutoRestore",value:String(c.autoRestore)},
    {name:"BotProtection",value:String(c.botProtection)},
    {name:"Logs",value:String(c.logs)}
   );
  i.reply({embeds:[e]});
 }
}
