function speak(text){
  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}
const sheets = [
  [
    { q:"1+1=?", o:["1","2","3","4"], a:"2" },
    { q:"2+2=?", o:["2","3","4","5"], a:"4" },
    { q:"3+3=?", o:["5","6","7","8"], a:"6" },
    { q:"4+4=?", o:["6","7","8","9"], a:"8" },
    { q:"5+5=?", o:["8","9","10","11"], a:"10" },
    { q:"6+6=?", o:["10","11","12","13"], a:"12" },
    { q:"7+7=?", o:["12","13","14","15"], a:"14" },
    { q:"8+8=?", o:["14","15","16","17"], a:"16" },
    { q:"9+9=?", o:["16","17","18","19"], a:"18" },
    { q:"10+10=?", o:["18","19","20","21"], a:"20" }
  ],
  [
    { q:"Capital of India?", o:["Delhi","Mumbai","Goa","Pune"], a:"Delhi" },
    { q:"Sun rises in?", o:["East","West","North","South"], a:"East" },
    { q:"Water formula?", o:["H2O","CO2","O2","NaCl"], a:"H2O" },
    { q:"Earth is?", o:["Planet","Star","Moon","Gas"], a:"Planet" },
    { q:"CPU full form?", o:["Central Processing Unit","Computer","Code","None"], a:"Central Processing Unit" },
    { q:"RAM is?", o:["Memory","Disk","CPU","OS"], a:"Memory" },
    { q:"Input device?", o:["Keyboard","Monitor","Speaker","Printer"], a:"Keyboard" },
    { q:"Output device?", o:["Monitor","Mouse","Keyboard","CPU"], a:"Monitor" },
    { q:"Storage device?", o:["Hard Disk","Mouse","Keyboard","RAM"], a:"Hard Disk" },
    { q:"Internet is?", o:["Network","Device","Software","OS"], a:"Network" }
  ],
  [
    { q:"HTML stands for?", o:["Markup Language","Programming","DB","OS"], a:"Markup Language" },
    { q:"CSS used for?", o:["Styling","Logic","DB","Server"], a:"Styling" },
    { q:"JS is?", o:["Language","DB","OS","Tool"], a:"Language" },
    { q:"Browser?", o:["Chrome","CPU","RAM","Mouse"], a:"Chrome" },
    { q:"Tag for paragraph?", o:["<p>","<div>","<h1>","<span>"], a:"<p>" },
    { q:"Heading tag?", o:["<h1>","<p>","<div>","<span>"], a:"<h1>" },
    { q:"Link tag?", o:["<a>","<p>","<div>","<span>"], a:"<a>" },
    { q:"Image tag?", o:["<img>","<div>","<p>","<span>"], a:"<img>" },
    { q:"List tag?", o:["<ul>","<div>","<p>","<span>"], a:"<ul>" },
    { q:"Form tag?", o:["<form>","<div>","<p>","<span>"], a:"<form>" }
  ],
  [
    { q:"1x1=?", o:["1","2","3","4"], a:"1" },
    { q:"2x2=?", o:["2","3","4","5"], a:"4" },
    { q:"3x3=?", o:["6","7","8","9"], a:"9" },
    { q:"4x4=?", o:["12","14","16","18"], a:"16" },
    { q:"5x5=?", o:["20","25","30","35"], a:"25" },
    { q:"6x6=?", o:["30","36","40","42"], a:"36" },
    { q:"7x7=?", o:["42","45","49","50"], a:"49" },
    { q:"8x8=?", o:["60","64","70","72"], a:"64" },
    { q:"9x9=?", o:["80","81","82","83"], a:"81" },
    { q:"10x10=?", o:["90","100","110","120"], a:"100" }
  ],
  [
    { q:"React is?", o:["Library","OS","Language","Tool"], a:"Library" },
    { q:"Database?", o:["MongoDB","HTML","CSS","JS"], a:"MongoDB" },
    { q:"Backend?", o:["Node.js","HTML","CSS","React"], a:"Node.js" },
    { q:"Frontend?", o:["HTML","MongoDB","Node","Express"], a:"HTML" },
    { q:"Version control?", o:["Git","HTML","CSS","JS"], a:"Git" },
    { q:"API?", o:["Interface","Device","OS","Hardware"], a:"Interface" },
    { q:"Framework?", o:["React","HTML","CSS","JS"], a:"React" },
    { q:"JS runs in?", o:["Browser","CPU","RAM","Printer"], a:"Browser" },
    { q:"CSS full form?", o:["Cascading Style Sheets","Code Style","None","Computer"], a:"Cascading Style Sheets" },
    { q:"Link tag?", o:["<a>","<p>","<div>","<span>"], a:"<a>" }
  ]
];

let currentSheet=[],index=0,score=0,time=10,timer;
let totalTime=300,totalTimerInterval;

function startQuiz(i){
  currentSheet=sheets[i];
  index=0;
  score=0;

  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  startTotalTimer();
  speak("Test started");
  loadQuestion();
}
function startTotalTimer(){
  totalTime=300;
  totalTimerInterval=setInterval(()=>{
    totalTime--;
    let m=Math.floor(totalTime/60);
    let s=totalTime%60;
    document.getElementById("totalTimer").innerText=`${m}:${s<10?"0"+s:s}`;
    if(totalTime===0){
      speak("Time over");
      endQuiz();
    }
  },1000);
}
function loadQuestion(){
  clearInterval(timer);
  time=10;
  startTimer();

  let q=currentSheet[index];
  document.getElementById("question").innerText=q.q;
  speak(q.q);

  document.getElementById("progress").innerText=`Q ${index+1}/10`;
  document.getElementById("score").innerText=`⭐ ${score}`;
  document.getElementById("bar").style.width=(index*10)+"%";

  let optDiv=document.getElementById("options");
  optDiv.innerHTML="";

  q.o.forEach(opt=>{
    let btn=document.createElement("button");
    btn.innerText=opt;
    btn.onclick=()=>checkAnswer(opt);
    optDiv.appendChild(btn);
  });
}
function startTimer(){
  document.getElementById("timerCircle").innerText=time;
  timer=setInterval(()=>{
    time--;
    document.getElementById("timerCircle").innerText=time;
    if(time===0) nextQuestion();
  },1000);
}
function checkAnswer(ans){
  const buttons=document.querySelectorAll("#options button");

  buttons.forEach(btn=>{
    btn.disabled=true;
    if(btn.innerText===currentSheet[index].a) btn.style.background="green";
    if(btn.innerText===ans && ans!==currentSheet[index].a) btn.style.background="red";
  });

  if(ans===currentSheet[index].a){
    score++;
    speak("Correct");
  } else {
    speak("Wrong");
  }

  setTimeout(()=>nextQuestion(),1500);
}
function nextQuestion(){
  clearInterval(timer);
  index++;
  if(index<10) loadQuestion();
  else endQuiz();
}
function endQuiz(){
  clearInterval(totalTimerInterval);

  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("resultBox").classList.remove("hidden");

  document.getElementById("result").innerText=`Score: ${score}/10`;

  speak("Test completed. Score is "+score);
}