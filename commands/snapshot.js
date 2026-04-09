
const { SlashCommandBuilder } = require('discord.js');
const fs=require('fs');

module.exports={
 data:new SlashCommandBuilder()
  .setName('snapshot')
  .setDescription('Save server snapshot'),

 async execute(i){
  const g=i.guild;
  const data={
   channels:g.channels.cache.map(c=>({
    name:c.name,type:c.type,parent:c.parentId,position:c.rawPosition,
    perms:c.permissionOverwrites.cache.map(p=>({id:p.id,allow:p.allow.bitfield,deny:p.deny.bitfield}))
   }))
  };
  fs.writeFileSync('./data/snapshot.json',JSON.stringify(data,null,2));
  i.reply("Snapshot saved");
 }
}
