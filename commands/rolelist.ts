import { MessageEmbed, Role } from "discord.js";
import { ICommand } from "wokcommands";

const RoleListCommand: ICommand = {
    category: "Roles",
    description: "Lists the users with that particular role!",
    slash: false,
    guildOnly: true,
    minArgs: 1,
    maxArgs: 3,
    callback: async ({args, message}) => {
        args = args.map(arg => (arg[0]==="<")?arg.substring(3, arg.length-1):arg)
        var members = Array.from((await message!.guild!.members.fetch()).values())
        var embedList: MessageEmbed[] = []
        var colorList: string[] = []
        var countList: number[] = []
        var descriptionList: string[] = []
        for(var role of args) {
            var _role = (await message!.guild!.roles!.fetch(role))!
            var embed = new MessageEmbed()
            embed.setTitle(`Role Info of ${_role.name}`)
            embed.setColor(_role.hexColor)
            colorList.push(_role.hexColor)
            countList.push(0)
            descriptionList.push("")
            embedList.push(embed)
        }
        for(var member of members) {
            var memberRoles = member!.roles!.cache.map(role => role.id)
            for(var i=0; i<args.length; i++) {
                if(memberRoles.includes(args[i])) {
                    countList[i] += 1
                    descriptionList[i] += `${member.displayName}\n`
                }
            }
        }
        for(var i=0; i<args.length; i++) {
            var description = `**Count:** ${countList[i]}\n**Color:** ${colorList[i]}\n**Members:**\n`+"```\n"+descriptionList[i]+"```"
            embedList[i].setDescription(description)
        }
        return {
            custom: true,
            content: "Role Info",
            embeds: embedList
        }
    }
}

export default RoleListCommand