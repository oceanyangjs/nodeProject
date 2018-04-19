var nodemailer = require("nodemailer");

//建立一个smtp传输连接
var smtpTransport = nodemailer.createTransport("SMTP",{
	service:"Gmail",
	auth:{
		user:"gmail.user@gmail.com",
		pass:"userpass"
	}
})

//邮件选项
var mailOptions = {
	form:"foo@bar.com",//发件人邮件地址
	to:"aaa@bar.com,bbb@bar.com",//收件人邮件地址
	subject:"title",//标题
	text:"hello world",//内容，纯文本内容
	html:"<b>hello world</b>"//内容，html内容
}

//发送邮件
smtpTransport.sendMaiil(mailOptions,function(err,response){
	if(err){
		console.log(err)
	}else{
		console.log("message sent: " + response.message)
	}
})