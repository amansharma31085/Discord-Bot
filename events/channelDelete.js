
const { AuditLogEvent } = require('discord.js');
const { track } = require('../utils/tracker');

module.exports={
 name:'channelDelete',
 async execute(channel){
  const config=require('../data/config.json');
  if(!config.antiNuke) return;

  const logs=await channel.guild.fetchAuditLogs({limit:1,type:AuditLogEvent.ChannelDelete});
  const entry=logs.entries.first();
  if(!entry) return;

  const user=entry.executor;
  const whitelist=require('../data/whitelist.json').users;
  if(whitelist.includes(user.id)) return;

  const count=track(user.id);

  if(count>=2){
    const member=await channel.guild.members.fetch(user.id);
    await member.ban({reason:"NUKE DETECTED"});

    if(config.autoRestore){
      await channel.guild.channels.create({
        name:channel.name,
        type:channel.type,
        permissionOverwrites:channel.permissionOverwrites.cache.map(p=>({
          id:p.id,allow:p.allow.bitfield,deny:p.deny.bitfield
        }))
      }).then(c=>c.setPosition(channel.rawPosition));
    }
  }
 }
}
