const mail = require('nodemailer');

const transport = mail.createTransport({
    host: 'smtp.gmail.com',
    secure: false,
    auth:{
        user:'bhanuchandar668@gmail.com',
        pass:'kljx jork kbhm hclu',
    }
});

var options = {
    from: 'bhanuchandar668@gmail.com',
    to:'mail2bhanuchandar@gmail.com',
    subject:'Sample Mail',
    text:'This is for testing!!',
}

transport.sendMail(options,(err,info)=>{
    if(err){
        console.log(err)
    }
    console.log(info.response);

})