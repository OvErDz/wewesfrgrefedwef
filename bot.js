const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '$'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`xFireMC Bot`,"")
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});






client.on('message', message =>{
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let prefix = '$';
     
    if(cmd === `${prefix}report`){
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Idk who 2 report ??");
        let reason = args.join(" ").slice(22);
        if(!reason) return message.channel.send("What is the reason ??");
    
        let reportEmbed = new Discord.RichEmbed()
        .setTitle("User just reported...")
        .setColor("#f7abab")
        .addField("- Reported User :", `${rUser} (${rUser.id})`)
        .addField("- Reported By :", `${message.author} (${message.author.id})`)
        .addField("- Reported In :", message.channel)
        .addField("- Report Time :", message.createdAt.toLocaleString(),true)
        .addField("- Reason :", reason);
    
        let reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("You should to make `reports` channel.");
    
    
        message.delete().catch(O_o=>{});
        message.author.send(`<@${rUser.id}>, Reported Successfully!!`)
        reportschannel.send(reportEmbed);
    };
});






client.on('message', msg => { 
    if (msg.content.startsWith(`$warn`)) {
      if(!msg.member.hasPermission("MANAGE_MESSAGES")) return;
       let args = msg.content.split(" ").slice(1);
      if (!args[0]) return msg.reply('**مـنشن الـشخـص المحــدد مــع الدلــيـل**')
      //غير اسم الروم او سوي روم بذا الاسم 
      if (msg.guild.channels.find('name', 'warns-الانذارات')) {
        //اذا غيرت فوق غير هنا كمان 
        msg.guild.channels.find('name', 'warns-الانذارات').send(`
       ${args.join(" ").split(msg.mentions.members.first()).slice(' ')}
      ${msg.mentions.members.first()}
**=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=** `)
      }
    }
})








client.on('message', message => {
        var prefix = '$'; // هنا تقدر تغير البرفكس
	var command = message.content.split(" ")[0];
	if(command == prefix + 'bc') { // الكوماند !bc
		var args = message.content.split(' ').slice(1).join(' ');
		if(message.author.bot) return;
		if(!args) return message.channel.send(`**➥ Useage:** ${prefix}bc كلامك`);
		
		let bcSure = new Discord.RichEmbed()
		.setTitle(`:mailbox_with_mail: **هل انت متأكد انك تريد ارسال رسالتك الى** ${message.guild.memberCount} **عضو**`)
		.setThumbnail(client.user.avatarURL)
		.setColor('RANDOM')
		.setDescription(`**\n:envelope: ➥ رسالتك**\n\n${args}`)
		.setTimestamp()
		.setFooter(message.author.tag, message.author.avatarURL)
		
		message.channel.send(bcSure).then(msg => {
			msg.react('✅').then(() => msg.react('❎'));
			message.delete();
			
			
			let yesEmoji = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
			let noEmoji = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
			
			let sendBC = msg.createReactionCollector(yesEmoji);
			let dontSendBC = msg.createReactionCollector(noEmoji);
			
			sendBC.on('collect', r => {
				message.guild.members.forEach(member => {
					member.send(args.replace(`[user]`, member)).catch();
					if(message.attachments.first()){
						member.sendFile(message.attachments.first().url).catch();
					}
				})
				message.channel.send(`:timer: **يتم الان الارسال الى** \`\`${message.guild.memberCount}\`\` **عضو**`).then(msg => msg.delete(5000));
				msg.delete();
			})
			dontSendBC.on('collect', r => {
				msg.delete();
				message.reply(':white_check_mark: **تم الغاء ارسال رسالتك بنجاح**').then(msg => msg.delete(5000));
			});
		})
	}
});






client.on('message', message =>{
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let prefix = '$';

if(cmd === `${prefix}suggest`) {
    var suggestMessage = message.content.substring(7)
    let suggestEMBED = new Discord.RichEmbed()
    .setColor(3447003)
    .setTitle("New suggest just added!!")
    .setDescription(`**${suggestMessage}**`)
    .setFooter(`Suggested By : ${message.author.tag}`);
    message.delete().catch(O_o=>{}) 
    let suggests = message.guild.channels.find(`name`, "⟫suggestions⟪");
    if (!suggests) return message.channel.send("You should make A **suggests** channel")
    suggests.send(suggestEMBED);
}

});



	
	
	client.on('message', msg => { 
    if (msg.content.startsWith(`$awarn`)) {
      if(!msg.member.hasPermission("MANAGE_NICKNAMES")) return;
       let args = msg.content.split(" ").slice(1);
      if (!msg.mentions.members.first()) return msg.reply('**مـنشن الـشخـص المحــدد مــع الدلــيـل**')
      if (!args[0]) return msg.reply('**مـنشن الـشخـص المحــدد مــع الدلــيـل**')
      //غير اسم الروم او سوي روم بذا الاسم 
      if (msg.guild.channels.find('name', 'administration_warnings')) {
        //اذا غيرت فوق غير هنا كمان 
        msg.guild.channels.find('name', 'administration_warnings').send(`
       ${args.join(" ").split(msg.mentions.members.first()).slice(' ')}
      ${msg.mentions.members.first()}
**=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=** `)
      }
    }
})
		
	
	



client.on('message', async message =>{

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let sicon = message.author.displayAvatarURL;
  if(cmd === `$myid`) {
      var bots = new Discord.RichEmbed()

      .setDescription(`** Your id: ${message.author.id}  **`)
      .setColor('RANDOM')
      message.channel.send(bots);
  }
});







client.on('message', message => {
    var prefix = "$"
var args = message.content.split(" ").slice(1);    
if(message.content.startsWith(prefix + 'id')) {
var year = message.author.createdAt.getFullYear()
var month = message.author.createdAt.getMonth()
var day = message.author.createdAt.getDate()
var men = message.mentions.users.first();  
let args = message.content.split(' ').slice(1).join(' ');
if (args == '') {
var z = message.author;
}else {
var z = message.mentions.users.first();
}

let d = z.createdAt;          
let n = d.toLocaleString();   
let x;                       
let y;                        

if (z.presence.game !== null) {
y = `${z.presence.game.name}`;
} else {
y = "No Playing... |💤.";
}
if (z.bot) {
var w = 'بوت';
}else {
var w = 'عضو';
}
let embed = new Discord.RichEmbed()
.setColor("#502faf")
.addField('🔱| اسمك:',`**<@` + `${z.id}` + `>**`, true)
.addField('🛡| ايدي:', "**"+ `${z.id}` +"**",true)
.addField('♨| Playing:','**'+y+'**' , true)
.addField('🤖| نوع حسابك:',"**"+ w + "**",true)    
.addField('📛| الكود حق حسابك:',"**#" +  `${z.discriminator}**`,true)
.addField('**التاريح الذي انشئ فيه حسابك | 📆 **: ' ,year + "-"+ month +"-"+ day)    
.addField("**تاريخ دخولك للسيرفر| ⌚   :**", message.member.joinedAt.toLocaleString())    

.addField('**⌚ | تاريخ انشاء حسابك الكامل:**', message.author.createdAt.toLocaleString())
.addField("**اخر رسالة لك | 💬  :**", message.author.lastMessage)            

.setThumbnail(`${z.avatarURL}`)
.setFooter(message.author.username, message.author.avatarURL)

message.channel.send({embed});
    if (!message) return message.reply('**ضع المنشن بشكل صحيح  ❌ **').catch(console.error);

}

});






client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('**مـنشن الـشخـص المحــدد مــع الدلــيـل**')){
        message.delete()
      message.channel.sendMessage("", {embed: {
        title: ":negative_squared_cross_mark:",
        color: 0x06DF00,
        description: "يرجى كتابة المنشن مع الدليل",
        footer: {
          text: "xFireMC"
        }
      }}).then(msg => {msg.delete(3000)});
                          }

     
}); 








client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(`(__xFireMC إدارة __)

──▄────▄▄▄▄▄▄▄────▄───
─▀▀▄─▄█████████▄─▄▀▀──
─────██─▀███▀─██──────
───▄─▀████▀████▀─▄────
─▀█────██▀█▀██────█▀──


اهلا وسهلا بك في السيرفر , 

نقدر تواجدك معنا فضلاً القي نظرة على

 القوانين لتجنب حسابك من الحظر في

 شات  #》rules《

**"نتمنى لك وقت ممتع"**                                                                                                                 

                                                                                                                       —⤛ ${member} ⤜—
انت العضو رقم ${member.guild.memberCount} `)

}).catch(console.error)
})






client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content =='$members')
      var IzRo = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL) 
      .setTitle(':tulip:| Members info')
      .addBlankField(true)
      .addField(':green_book:| الاونلاين ',
      `${message.guild.members.filter(m=>m.presence.status == 'online').size}`)
      .addField(':closed_book:| دي ان دي',`${message.guild.members.filter(m=>m.presence.status == 'dnd').size}`)
      .addField(':orange_book:| خامل',`${message.guild.members.filter(m=>m.presence.status == 'idle').size}`)
      .addField(':notebook:| الاوف لاين ',`${message.guild.members.filter(m=>m.presence.status == 'offline').size}`)
      .addField('عدد اعضاء السيرفر',`${message.guild.memberCount}`)
      message.channel.send(IzRo);
    });





client.on('message' , message => {
  var prefix = "$";
  if(message.author.bot) return;
  if(message.content.startsWith(prefix + "ping")) {
 message.channel.send('Pong...').then((msg) => {
      msg.edit(`\`\`\`javascript\nTime taken: ${msg.createdTimestamp - message.createdTimestamp} ms.\nDiscord API: ${Math.round(client.ping)} ms.\`\`\``);
 })
  }  
 });	





client.on('message', message => {
    if (message.content.startsWith("$invite")) {
 
  message.channel.createInvite({
        thing: true,
        maxUses: 100,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("| :white_check_mark:  | :mailbox_with_mail:  تم ارسال الرابط على الخاص  ")
      message.channel.sendEmbed(embed).then(message => {message.delete(10000)})
              const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")
                .setAuthor(message.guild.name, message.guild.iconURL)
        .setDescription(`
**
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

-⌠${message.guild.name}⌡  هذا هو رابط سيرفر

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

- هذا الرابط صالح ل 100 مستخدم فقط

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

- هذا الرابط صالح لمده 24 ساعه فقط

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
**`)
      message.author.sendEmbed(Embed11)
    }
});




client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = msg.content.split(" ").slice(1);

    if(command === "clear") {
        const emoji = client.emojis.find("name", "wastebasket")
    let textxt = args.slice(0).join("");
    if(msg.member.hasPermission("EMBED_LINKS")) {
    if (textxt == "") {
        msg.delete().then
    msg.channel.send("**```ضع عدد الرسائل التي تريد مسحها```**").then(m => m.delete(3000));
} else {
    msg.delete().then
    msg.delete().then
    msg.channel.bulkDelete(textxt);
        msg.channel.send("```php\nعدد الرسائل التي تم مسحها: " + textxt + "\n```").then(m => m.delete(3000));
        }    
    }
}
});







	client.on("guildMemberAdd", function(member) {
    const wc = member.guild.channels.find("name", "⟫welcome⟪")
        const embed = new Discord.RichEmbed()
        .setColor('B90C0C')
        .setAuthor(member.user.tag, member.user.avatarURL)
 .setDescription('**🌹أهلاً وسهلاً بك في السيرفرفضلاً قم بالأطلاع على قوانين السيرفر لتجنب تعرضك للحظر🌹**')
.setThumbnail(member.avatarURL)
  .setImage('https://www.askideas.com/media/13/Micky-Mouse-With-Welcome-Banner-Glitter.gif')
        .setTimestamp()
        return wc.sendEmbed(embed);
        
});





client.on('ready', () => {
     client.user.setActivity("xFireMC Bot",{type: ''});

});





  client.on('messageUpdate', (message, newMessage) => {
    if (message.content === newMessage.content) return;
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'messages_log');
    if (!channel) return;

    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('SILVER')
       .setDescription(`✏ **تعديل رساله
ارسلها <@${message.author.id}>                                                                                                                         تم تعديلها في شات** <#${message.channel.id}>\n\nقبل التعديل :\n \`${message.cleanContent}\`\n\nبعد التعديل :\n \`${newMessage.cleanContent}\``)
       .setTimestamp();
     channel.send({embed:embed});


});



client.on('messageDelete', message => {
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'messages_log');
    if (!channel) return;
    
    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('SILVER')
       .setDescription(`🗑️ **حذف رساله**
**ارسلها <@${message.author.id}>                                                                                                                        تم حذفها في شات** <#${message.channel.id}>\n\n \`${message.cleanContent}\``)
       .setTimestamp();
     channel.send({embed:embed});

});






client.on('voiceStateUpdate', (oldM, newM) => {
  let rebel1 = oldM.serverMute;
  let rebel2 = newM.serverMute;
  let codes1 = oldM.serverDeaf;
  let codes2 = newM.serverDeaf;
  let ch = oldM.guild.channels.find('name', 'mute_log')
  if(!ch) return;
    oldM.guild.fetchAuditLogs()
    .then(logs => {
      let user = logs.entries.first().executor.username
    if(rebel1 === false && rebel2 === true) {
       let embed = new Discord.RichEmbed()
       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
       .setDescription(`${newM} تم إعطآئه ميوت صوتي`)
       .setFooter(`بوآسطة : ${user}`)
        .setColor('#c15409')
       ch.send(embed)
    }
    if(rebel1 === true && rebel2 === false) {
       let embed = new Discord.RichEmbed()
       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
       .setDescription(`${newM} تم فك الميوت الصوتي `)
       .setFooter(`بواسطة : ${user}`)
        .setColor('#c15409')
       .setTimestamp()
       ch.send(embed)
    }
    if(codes1 === false && codes2 === true) {
       let embed = new Discord.RichEmbed()
       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
       .setDescription(`${newM} تم إعطآئه ديفن أو سمآعة`)
       .setFooter(`بوآسطة : ${user}`)
        .setColor('#c15409')
       .setTimestamp()
       ch.send(embed)
    }
    if(codes1 === true && codes2 === false) {
       let embed = new Discord.RichEmbed()
       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)
       .setDescription(`${newM} تم فك عنه الديفن أو السمآعة`)
       .setFooter(`بوآسطة : ${user}`)
        .setColor('#c15409')
       .setTimestamp()
       ch.send(embed)
    }
  })
});





var KinG66S = {};
client.on('guildMemberRemove', member => {
KinG66S[member.id] = {roles: member.roles.array()};
});

client.on('guildMemberAdd', member => {
if(!KinG66S[member.user.id]) return;
console.log(KinG66S[member.user.id].roles.length);
for(let i = 0; i < KinG66S[member.user.id].roles.length + 1; i++) {
member.addRole(KinG66S[member.user.id].roles.shift());
}
});




client.on("ready", async  => {
setInterval(function(){
client.channels.find('id', '482539445388836879').setName("-");	
client.channels.find('id', '482539445388836879').setName("」-");	
client.channels.find('id', '482539445388836879').setName("W」-");
client.channels.find('id', '482539445388836879').setName("We」-");
client.channels.find('id', '482539445388836879').setName("Wel」-");
client.channels.find('id', '482539445388836879').setName("Welc」-");
client.channels.find('id', '482539445388836879').setName("Welco」-");
client.channels.find('id', '482539445388836879').setName("Welcom」-");
client.channels.find('id', '482539445388836879').setName("Welcome」-");
client.channels.find('id', '482539445388836879').setName("Welcome T」-");
client.channels.find('id', '482539445388836879').setName("Welcome To」-");
client.channels.find('id', '482539445388836879').setName("Welcome To x」-");
client.channels.find('id', '482539445388836879').setName("Welcome To xF」-");
client.channels.find('id', '482539445388836879').setName("Welcome To xFi」-");
client.channels.find('id', '482539445388836879').setName("Welcome To xFir」-");
client.channels.find('id', '482539445388836879').setName("Welcome To xFire」-");
client.channels.find('id', '482539445388836879').setName("Welcome To xFireM」-"); 
client.channels.find('id', '482539445388836879').setName("Welcome To xFireMC」-");
client.channels.find('id', '482539445388836879').setName("「Welcome To xFireMC」-");
 }, 4000);
});








client.login(process.env.BOT_TOKEN);
