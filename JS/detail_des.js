
const storyPage = document.querySelector(".story-page");
const inbox1 = document.querySelector(".story-page-inbox1");
const inbox2 = document.querySelector(".story-page-inbox2");

// const repPoster = document.querySelector(".rep-poster img");
// const repCont = document.querySelector(".rep-cont");

window.addEventListener("scroll", moveSc);

// 글자 이동함수
function moveSc() {
  // 스크롤 위치값
  let scTop = window.scrollY;
  const storyBCR = storyPage.getBoundingClientRect().top;

  console.log("타이틀!!!", scTop, storyBCR);
//   let hcode = `
//   <div class="rep-cont col-6">
//     <p>
//         작가가 되고 싶어 함께 책을 내기로 결정한 그들은 <br />
//         어느 날 에밀리가 들었다던 벌판의 목소리를 주제로 이야기를 써내려간다.<br /><br />
//         먼 미래에서 그들을 부르는 누군가에 대한 이야기...<br /><br />
//         그리고 거짓말처럼,<br />
//         그 이야기대로 그녀들에게 이상한 편지가 도착한다.<br />
//         그들의 죽음을 지켜봤다는 누군가가 보내온 편지. <br /><br />
//         편지의 정체는 무엇이며 왜 이 곳에 온 걸까?<br />
//         치열했던 삶 속에서 끝끝내 작가가 되고자 했던 그들은 마침내 원하던 미래를 얻게 될까?<br />

//     </p>
//     </div>
//     <div class="rep-poster poster col-6">
//     <img src="./img/des/des_img_4.jpg" alt="대표이미지" />
// </div>
//     `;
    
    if (scTop > 1000) {
        inbox1.style.opacity = 0;
        inbox1.style.width = 0;
        inbox1.style.transition = "1s";

        console.log('나오남?1');     
    }else if (scTop < 1000) {
        inbox1.style.width = '100%';
        inbox1.style.opacity = 1;
        inbox1.style.transition = "1s";
      }

      if (scTop > 1230){
        inbox2.style.left = '0';
        inbox2.style.width = '100%';
        inbox2.style.opacity = 1;
        inbox2.style.transition = "1s";

      }
      else if(scTop<1230){
        inbox2.style.opacity = 0;
        inbox2.style.left = '100%';
        inbox2.style.width = '0';
        inbox2.style.transition = "1s";
      }
    
//     if (scTop > 1050) {

//         console.log('나오남?2');
//   }

  // // 1. 맨위 원위치하기 : 첫번째 기준보다 작을때
  // if (scTop < posTop[0] - gap) {
  //   stage.style.top = "0%";
  //   stage.style.left = "50%";
  //   stage.style.transition = "1s";
  // } //if문
  // // 2.첫번째 포스터 옆으로 이동
  // if (scTop > posTop[0] - gap && scTop < posTop[0]) {
  //   stage.style.top = "50%";
  //   stage.style.left = "25%";
  //   stage.style.transition = "2s";
  // } //if문
  // // 3.두번째 포스터 옆으로 이동
  // if (scTop > posTop[1] - gap && scTop < posTop[1]) {
  //   stage.style.top = "70%";
  //   stage.style.left = "65%";
  //   stage.style.transition = "1s";
  // } //if문
  // // 4.세번째 포스터 옆으로 이동
  // if (scTop > posTop[2] - gap && scTop < posTop[2]) {
  //   stage.style.top = "50%";
  //   stage.style.left = "25%";
  //   stage.style.transition = ".5s";
  // } //if문
} //////////////moveTit함수/////////////////



const introMv = document.querySelector(".intro-mv-img");

introMv.onclick = () => {
  console.log("인트로 영상");
  // 1. 동영상 넣기
  introMv.innerHTML = `
  <iframe src="https://www.youtube.com/embed/9Bg5NwTaZJI?autoplay=1&mute=1&loop=1&playlist=9Bg5NwTaZJI" allow="autoplay"></iframe>
    `;
  // 2. 클래스 off 지우기 (플레이 버튼 안나오게)
  introMv.classList.remove("off");
}; ////////////click이벤트




