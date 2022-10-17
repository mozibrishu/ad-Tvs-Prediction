const MATCH_ID = 101;

var hiddenArr = ['.pp_slide_1 .pp_element_1', '.pp_slide_1 .pp_element_2', '.pp_slide_1 .pp_element_3', '.pp_slide_1 .pp_element_4', '.pp_slide_1 .pp_team1', '.pp_slide_1 .pp_team2']


gsap.to(['.pp_slide_1 .pp_element_2', '.pp_slide_1 .pp_element_3'], { duration: 1, scaleX: .95, scaleY: .95, repeat: -1, yoyo: true, stagger: .5 });

var data = new FormData();
data.append("MATCH_ID", MATCH_ID);
fetch('http://localhost/ad-tvs-backend/getMatchPrediction.php', { method: "POST", body: data })
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    document.querySelector('.pp_team1').innerText = data.TEAM1;
    document.querySelector('.pp_team2').innerText = data.TEAM2;
    document.querySelector('.pp_resulTteam1').innerText = data.TEAM1;
    document.querySelector('.pp_resulTteam2').innerText = data.TEAM2;

  })
  .catch (error => {
  console.error('There was an error!', error);
});

document.querySelector('.voteTeam1').addEventListener('click', () => { voteUpdate('TEAM1_VOTE') });
document.querySelector('.pp_team1').addEventListener('click', () => { voteUpdate('TEAM1_VOTE') });
document.querySelector('.voteTeam2').addEventListener('click', () => { voteUpdate('TEAM2_VOTE') });
document.querySelector('.pp_team2').addEventListener('click', () => { voteUpdate('TEAM2_VOTE') });

function voteUpdate(teamName) {
  voteWork(teamName);
  gsap.timeline({ defaults: { ease: "power1.inOut" } })
    .to(hiddenArr, { opacity: 0, display: 'none', duration: .5, stagger: .1 })
    .fromTo('.pp_slide_2 .pp_element_1', { display: 'none', x: -300 }, { x: 0, display: "block", duration: .8 }, ">-.3")
    .fromTo('.pp_slide_2 .pp_element_2', { display: 'none', x: 300 }, { x: 0, display: "block", duration: .8 }, "<.1")
    .to('.pp_slide_2 .pp_element_2', { opacity: 0, duration: .8 }, ">1")
    .to('.pp_slide_1 .pp_bg', { x: -300, duration: .8 }, ">-.3")
    .to('.pp_slide_2 .pp_element_1', { x: 300, duration: .8 }, "<")
    .fromTo('.pp_slide_3 .pp_element_1', { display: 'none', x: -300 }, { x: 0, display: "block", duration: .8 }, "<.2")
    .fromTo('.pp_slide_3 .pp_element_2', { display: 'none', x: -300, opacity: 0 }, { x: 0, opacity: 1, display: "block", duration: .8 }, "<")
    .fromTo('.pp_slide_3 .resultBar', { display: 'none', opacity: 0 }, { opacity: 1, display: "block", duration: .8 }, "<")
    .fromTo('.pp_slide_3 .resultBar2', { display: 'none', opacity: 0 }, { opacity: 1, display: "block", duration: .8 }, "<")
    .fromTo('.pp_slide_3 .pp_resulTteam1_percentage', { display: 'none', opacity: 0 }, { opacity: 1, display: "block", duration: .8, zIndex: 99 }, "<")
    .fromTo('.pp_slide_3 .pp_resulTteam2_percentage', { display: 'none', opacity: 0 }, { opacity: 1, display: "block", duration: .8, zIndex: 99 }, "<")
    .fromTo('.pp_slide_3 .pp_resulTteam1', { display: 'none', opacity: 0 }, { opacity: 1, display: "block", duration: .8 }, "<")
    .fromTo('.pp_slide_3 .pp_resulTteam2', { display: 'none', opacity: 0 }, { opacity: 1, display: "block", duration: .8 }, "<")
    .fromTo('.pp_slide_3 .pp_resulTteam2', { display: 'none', opacity: 0 }, { opacity: 1, display: "block", duration: .8 }, "<");

  setPercentage();

}


function voteWork(teamName) {
  const formData = new FormData();
  formData.append("TEAM_VOTE", teamName);
  formData.append("MATCH_ID", MATCH_ID);

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", 'http://localhost/ad-tvs-backend/updateVote.php', true);
  xhttp.send(formData);
}

function setPercentage() {
  fetch('http://localhost/ad-tvs-backend/getMatchPrediction.php', { method: "POST", body: data })
    .then((response) => response.json())
    .then(({ TEAM1_VOTE, TEAM2_VOTE }) => {
      setPercentageTo(TEAM1_VOTE,TEAM2_VOTE )
    })
    .catch (error => {
    console.error('There was an error!', error);
    setPercentageTo(6,4 );
  });
}


function setPercentageTo(TEAM1_VOTE,TEAM2_VOTE ) {
  totalVote = TEAM1_VOTE + TEAM2_VOTE;
      console.log(TEAM1_VOTE, TEAM2_VOTE);
      if (totalVote == 0) {

      } else {
        team1_percentage = Math.ceil((TEAM1_VOTE / totalVote) * 100);
        team2_percentage = 100 - team1_percentage;
        console.log(team1_percentage, team2_percentage);

        document.querySelector('.team1Percentage').innerText = team1_percentage;
        document.querySelector('.team2Percentage').innerText = team2_percentage;

        if (team1_percentage == team2_percentage) {
          document.querySelector('.resultBar').style.width = '65px';
          document.querySelector('.resultBar2').style.width = '65px';
          document.querySelector('.resultBar').style.zIndex = '5'
          document.querySelector('.resultBar2').style.zIndex = '5'
        } else if (team1_percentage > team2_percentage) {
          document.querySelector('.resultBar').style.width = 20 + team1_percentage + 'px';
          document.querySelector('.resultBar').style.zIndex = '5'
          document.querySelector('.resultBar2').style.zIndex = '4'
        } else if (team1_percentage < team2_percentage) {
          document.querySelector('.resultBar2').style.width = 20 + team2_percentage + 'px';
          document.querySelector('.resultBar2').style.zIndex = '5'
          document.querySelector('.resultBar').style.zIndex = '4'

        }
      }
}