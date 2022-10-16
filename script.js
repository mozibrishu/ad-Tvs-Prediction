// var hiddenArr = ['.pp_slide_1 .pp_element_1','.pp_slide_1 .pp_element_2','.pp_slide_1 .pp_element_3','.pp_slide_1 .pp_element_4','.pp_slide_1 .pp_element_5','.pp_slide_2 .pp_element_1','.pp_slide_2 .pp_element_2','.pp_slide_2 .pp_element_3'];

var hiddenArr = ['.pp_slide_1 .pp_element_1','.pp_slide_1 .pp_element_2','.pp_slide_1 .pp_element_3','.pp_slide_1 .pp_element_4','.pp_slide_1 .pp_team1','.pp_slide_1 .pp_team2']

// gsap.timeline({ defaults: { ease: "power1.inOut" },repeat:-1, delay:.8 })
//     .fromTo('.pp_slide_1 .pp_element_1',{x:250}, {x:0, opacity: 1, display: "block", duration: 1 })
//     .fromTo('.pp_slide_1 .pp_element_2',{x:80,y:20,scaleX:.3,scaleY:.3}, {x:0,y:0,scaleX:1,scaleY:1,rotate:-310, display: "block", duration: 1 },">-.3")
//     .fromTo('.pp_slide_1 .pp_element_3',{display:'none'}, {display: "block", duration: .5 },">-.4")
//     .fromTo('.pp_slide_1 .pp_element_4',{display:'none',rotate:50,x:10}, {x:0,display: "block",rotate:0, duration: .5 },"<")
//     .to('.pp_slide_1 .pp_element_2',{opacity:0, duration: .5 },"<")
//     .fromTo('.pp_slide_1 .pp_element_5',{display:'none'}, {display: "block", duration: .5 },"<.3")
//     .to('.pp_slide_1 .pp_element_5',{height:600,width:665,top:-180,left:-180, duration: .5 },">")
//     .to('.pp_slide_1 .pp_element_4',{opacity:0, duration: .5 },"<")
//     .fromTo('.pp_slide_2 .pp_element_1',{display:'none',y:100}, {y:0,display: "block", duration: .5 },">")
//     .fromTo('.pp_slide_2 .pp_element_2',{display:'none',y:-100}, {y:0,display: "block", duration: .7 },"<.2")
//     .to('.pp_slide_2 .pp_element_2',{opacity:0, duration: .7 },">.5")
//     .fromTo('.pp_slide_2 .pp_element_3',{display:'none',y:-100}, {y:0,display: "block", duration: .7 },">-.2")
//     .to(hiddenArr, {display: "none", duration: .5 },">1.5")

gsap.to(['.pp_slide_1 .pp_element_2','.pp_slide_1 .pp_element_3'], {duration:1, scaleX:.95,scaleY:.95,repeat:-1,yoyo:true,stagger:.5});

fetch('http://localhost/ad-tvs-backend/getMatchPrediction.php')
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    document.querySelector('.pp_team1').innerText = data.TEAM1;
    document.querySelector('.pp_team2').innerText = data.TEAM2;
    document.querySelector('.pp_resulTteam1').innerText = data.TEAM1;
    document.querySelector('.pp_resulTteam2').innerText = data.TEAM2;
  
  });

document.querySelector('.voteTeam1').addEventListener('click', ()=>{voteUpdate('TEAM1_VOTE')});
document.querySelector('.pp_team1').addEventListener('click', ()=>{voteUpdate('TEAM1_VOTE')});
document.querySelector('.voteTeam2').addEventListener('click', ()=>{voteUpdate('TEAM2_VOTE')});
document.querySelector('.pp_team2').addEventListener('click', ()=>{voteUpdate('TEAM2_VOTE')});

function voteUpdate(teamName){
  voteWork(teamName);
  gsap.timeline({ defaults: { ease: "power1.inOut" }})
  .to(hiddenArr,{opacity:0,duration:.5,stagger:.1})
    .fromTo('.pp_slide_2 .pp_element_1',{display:'none',x:-300}, {x:0,display: "block", duration: .8 },">-.3")
    .fromTo('.pp_slide_2 .pp_element_2',{display:'none',x:300}, {x:0,display: "block", duration: .8 },"<.1")
    .to('.pp_slide_2 .pp_element_2', {opacity:0, duration: .8 },">1")
    .to('.pp_slide_1 .pp_bg', {x:-300, duration: .8 },">-.3")
    .to('.pp_slide_2 .pp_element_1', {x:300, duration: .8 },"<")
    .fromTo('.pp_slide_3 .pp_element_1',{display:'none',x:-300}, {x:0,display: "block", duration: .8 },"<.2")
    .fromTo('.pp_slide_3 .pp_element_2',{display:'none',x:-300,opacity:0}, {x:0,opacity:1,display: "block", duration: .8 },"<")
    .fromTo('.pp_slide_3 .resultBar',{display:'none',opacity:0}, {opacity:1,display: "block", duration: .8 },"<")
    .fromTo('.pp_slide_3 .pp_resulTteam1',{display:'none',opacity:0}, {opacity:1,display: "block", duration: .8 },"<")
    .fromTo('.pp_slide_3 .pp_resulTteam2',{display:'none',opacity:0}, {opacity:1,display: "block", duration: .8 },"<")


}


function voteWork(teamName){
  const formData = new FormData();
  formData.append("TEAM_VOTE", teamName);

  var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         if ('success' == this.responseText) {
    //             setInnerHtml('banner', "<h3 id='submissionSuccess'>Successfully Inserted</h3>");
    //         } else if ('used' == this.responseText) { 
    //             setInnerHtml('errorCheck', "*Mobile Number is Already used<br>");
    //             addClass('mobile','error');
    //             removeClass('mobile', 'valid');
    //          }
    //         else {
    //             document.getElementById("banner").innerHTML = "<p>" + this.responseText + "</p>";
    //         }
    //     }
    // };

    xhttp.open("POST", 'http://localhost/ad-tvs-backend/updateVote.php', true);
    xhttp.send(formData);
}