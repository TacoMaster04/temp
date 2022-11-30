const { getAllMessages } = require("../../modules/transcriptsCreator");

module.exports = {
    execute: async (client, message, args) => {
        if (args[1] == '-nd') {
            const amount = Number(args[0])
            if (isNaN(amount) || amount < 1) return message.channel.send(`This command was used incorrectly, please try again.`).then(msg => setTimeout(() => msg.delete(), 5000))
            let messages = getAllMessages(message.channel)
            let i = 0;
                const filteredMessages = [];
                (await messages).filter((m) => {
                    if (m.pinned == false && amount > i) {
                        filteredMessages.push(m);
                        i++
                    }
                })
            await message.channel.bulkDelete(filteredMessages)
            await message.channel.send(`\`\`\`diff\nMessages Purged\n- Amount Deleted: ${amount}\n- Requested By: ${message.member.displayName} (${message.author.tag}|${message.author.id})\`\`\``).then(msg => setTimeout(() => msg.delete(), 5000))
        } else {
            const amount = Number(args[0])
            const member = message.mentions.members.first()
            const messages = await message.channel.messages.fetch()
            if (isNaN(amount) || amount < 1) return message.channel.send(`This command was used incorrectly, please try again.`).then(msg => setTimeout(() => msg.delete(), 5000))
            if (member) {
                let i = 0;
                const filteredMessages = [];
                (await messages).filter((m) => {
                    if (m.author.id === member.id && amount > i) {
                        filteredMessages.push(m);
                        i++
                    }
                })
                await message.channel.bulkDelete(filteredMessages)
                await message.channel.send(`\`\`\`diff\nMessages Purged\n- Amount Deleted: ${filteredMessages.length}\n- Requested By: ${message.member.displayName} (${message.author.tag}|${message.author.id})\n- Member's Messages: ${member.nickname === null ? `No Nickname Set` : member.nickname} (${member.user.username}#${member.user.discriminator}|${member.id})\`\`\``).then(msg => setTimeout(() => msg.delete(), 5000))
            } else {
                await message.channel.bulkDelete(amount)
                await message.channel.send(`\`\`\`diff\nMessages Purged\n- Amount Deleted: ${amount}\n- Requested By: ${message.member.displayName} (${message.author.tag}|${message.author.id})\`\`\``).then(msg => setTimeout(() => msg.delete(), 5000))
            }
        }
    },
    config: {
        name: 'purge',
        description: 'Deletes 1-100 messages with the option of deleting the messages from a specific member, only works for messages that are under 14 days',
        usage: 'purge <amount> [-nd]/[@mention]',
        cooldown: null,
        aliases: ['clear', 'prune'],
        allowedGuild: [],
        allowedChannel: [],
        enabled: true,
        autoDelete: true,
        permission: 20
    }
}