
const { SlashCommandBuilder } = require('discord.js');

module.exports={
 data:new SlashCommandBuilder()
  .setName('secure')
  .setDescription('Full lockdown'),

 async execute(i){
  i.guild.channels.cache.forEach(async c=>{
    await c.permissionOverwrites.edit(i.guild.roles.everyone,{SendMessages:false});
  });
  i.reply("LOCKDOWN ENABLED");
 }
}
