
const { SlashCommandBuilder } = require('discord.js');
const data=require('../data/snapshot.json');

module.exports={
 data:new SlashCommandBuilder()
  .setName('restore')
  .setDescription('Restore server'),

 async execute(i){
  const g=i.guild;

  for(const c of data.channels){
    await g.channels.create({
      name:c.name,
      type:c.type,
      parent:c.parent,
      permissionOverwrites:c.perms
    }).then(ch=>ch.setPosition(c.position));
  }

  i.reply("Server restored");
 }
}
