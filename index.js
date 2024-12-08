const cfonts = require('cfonts');

cfonts.say('Aubertify', {
	font: 'block',              
	align: 'center',              
	colors: ['blueBright', 'cyan'],         
	background: 'transparent',  
	letterSpacing: 1,           
	lineHeight: 1.5,              
	space: true,                
	maxLength: '0',             
	gradient: true,            
	independentGradient: false, 
	transitionGradient: false,  
	env: 'node'                 
  });

// Jadilah Pengguna yang bijak 
const Aubertify = require('./package.json')
const version = Aubertify.version;
const name = Aubertify.name;

// 31 Merah, 32 Hijau, 33 Kuning, 34 biru, 35 Ungu, 36 Cyan, 37 putih
console.log(`\x1b[32m%s\x1b[0m`, `➣ Name Project : ${name}`);
console.log(`\x1b[32m%s\x1b[0m`, `➣ version : ${version}`) ;
console.log("\x1b[33m%s\x1b[0m", "➣ Owner : Clayza Aubert");
console.log("\x1b[33m%s\x1b[0m", "➣ Youtube : Clayza Aubert");
console.log("\x1b[33m%s\x1b[0m", "➣ Contact : t.me/ClayzaAubert"); 
console.log("\x1b[31m%s\x1b[0m", "➣ NOTE: Rest Api Automatic Sistem");

module.exports = require('./app');

