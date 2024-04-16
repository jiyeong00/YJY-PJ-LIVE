/* more.css 의 JS */

// 스크롤 내려가면 스르륵 나오게 만들고 싶은데...

const myFn = {
    // 요소선택함수 ////////
    qs: (x) => document.querySelector(x),
    qsEl: (el, x) => el.querySelector(x),
    qsa: (x) => document.querySelectorAll(x),
    qsaEl: (el, x) => el.querySelectorAll(x),
  
    // 이벤트셋팅함수
    addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
    // 바운딩 함수
    getBCR: (ele) => ele.getBoundingClientRect().top,
    // 옵셋탑값 반환함수
    getOT: (ele) => ele.offsetTop,
  }; /////// domFn 객체 /////////////


const topBtn=myFn.qs('.top-btn img');

let docH = document.body.clientHeight;
let winH = window.innerHeight;
let scLimit = docH - winH;

myFn.addEvt(window, "scroll", scrollTop);

function scrollTop() {
  let scTop = window.scrollY;

    let wTop = (winH * scTop) / scLimit;

  console.log("스크롤 위치 : ", scTop);

  topBtn.style.top = wTop + "px";

if(scTop>=200){
    console.log('200인가?')
    topBtn.style.opacity = 1;
    topBtn.style.transition = ".5s ease-in";
}else if(scTop<200){
    topBtn.style.opacity = 0;
    topBtn.style.transition = ".5s ease-in";

}

} ////////////scrollTop////////