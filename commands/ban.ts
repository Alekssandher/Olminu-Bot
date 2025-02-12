import dotenv from 'dotenv'
import { searchUserInGuild } from '../utils/searchUserInGuild'
import { CommandInteraction, Guild, InteractionDataOptionsString, Member } from 'eris';
dotenv.config()

if (!process.env.TOKEN) {
    throw new Error("Ambient variable TOKEN is not defined");
  }

const TOKEN: string = process.env.TOKEN!

async function ban(guildId: string, userId: string, i: CommandInteraction, user: string, reason?: string) {

    const url = `https://discord.com/api/guilds/${guildId}/bans/${userId}`;

    const headers = {
        Authorization: `Bot ${TOKEN}`,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, {
        method: "PUT", 
        headers,
        body: JSON.stringify({ reason }), 
    });

    if (!response.ok) {
        console.error("Failed to ban user:", response.statusText);
        return i.createMessage({
            content: `How am i supposed to ban this user if i don't have enough permissions?`,
            flags: 64
        })
    } else {
        console.log(`User ${userId} banned successfully.`);
        return i.createMessage({
            content: `The user ${user} was banned >:)`,
            flags: 64
            
        })
    }

    
}
module.exports = {
    name: "ban",
    description: "Ban an user who is messing up.",
    options: [
        {
            name: "user",
            description: "User who deserves punishment.",
            type: 3,
            required: true
            
        },
        {
            name: "reason",
            description: "Message that the user will see when he get banned",
            type: 3,
            required: false
        }
    ],
    default_member_permissions: 'BAN_MEMBERS',
    execute: async (i: CommandInteraction) => {

        if (!i.data.options || !i.channel) return
        if (!i.channel || !("guild" in i.channel)) {
            return i.createMessage("This command can only be used in a server channel.");
        }

        const searchTerm = (i.data.options.find(opt => opt.name === 'user') as InteractionDataOptionsString ).value
        const reason = (i.data.options.find(opt => opt.name === 'reason') as InteractionDataOptionsString || undefined)
        let kickMessage

        if(!reason) kickMessage = '' 
        else kickMessage = reason.value

        const guild: Guild = i.channel.guild
        const guildId: string = guild.id

        const user: Array<Member> | Member = await searchUserInGuild(guild.id, searchTerm, TOKEN)

        let memberId: string = ''

        if (Array.isArray(user)) { memberId = user[0].user.id ; }
        else if (user.user) { memberId = user.user.id ;}
        else return i.createMessage({
            content: `I coudln't find this user: \`${searchTerm}\` | Make sure it's a ID, username or mention.`,
            flags: 64
        })
        
        await ban(guildId, memberId, i, searchTerm, kickMessage)
    }
}