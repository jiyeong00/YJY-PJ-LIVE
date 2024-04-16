// 버튼이나 a에 포커스 되도록 하기 (JS실험실 참고)

/* 

[ 순서 ]
1. 상단 메뉴 이벤트
  - 휠로 움직여도 작동됨
2. 스크롤 이벤트
  - 위아래로 부드럽게 움직임 
  - 상단메뉴랑 연동됨
3. 뮤지컬 영역 - 슬라이드
  - 버튼 눌렀을 때 양옆으로 슬라이드됨(무한)
4. 뮤지컬 영역 - 슬라이드 자동넘김
5. 메인 타이틀 마우스 오버시 
  - 메인영역 유튜브가 opacity .5%로 변경
6. 뮤지컬 영역 - 마우스 오버시 뒷배경 사진 띄우기
  - 랜덤

*/
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


const wrap = document.getElementsByClassName("wrap")[0]; // 보일 영역
const container = document.querySelectorAll(".cont");
let page = 1; // 영역 포지션 초기값
const lastPage = container.length; // 마지막 페이지
const winW = window.innerHeight;

const gnb = document.querySelectorAll(".menu a");

const cntgnb = gnb.length;

////////////////상단 메뉴 이벤트 ////////////////////////////////////
gnb.forEach((ele, idx) => {
  gnb[idx].onclick = () => {
    for (let x of gnb) {
      x.classList.remove("on");
    } /// for of ///

    gnb[idx].classList.add("on");
  }; //클릭이벤트
}); //for each문

//////////////////이건 위랑 같은 이벤트지만 휠로 움직일 수 있게할려고///////////////
function wheelMov(page) {
  for (let x of gnb) {
    x.classList.remove("on");
  } /// for of ///

  gnb[page - 1].classList.add("on");
}

// 맨위로 올리기
window.scrollTo(0, 0);

///////////////////////////스크롤 이벤트////////////////////////////////////
console.log(lastPage);

let prot = 0;

window.addEventListener("wheel",(e) => {e.preventDefault();

    // 광휠 막기
    if (prot) return;
    prot = 1;
    setTimeout(() => (prot = 0), 500);

    var st = document.querySelector("html").scrollTop;

    console.log("기존 페이지", winW, page, "스크롤", st);
    // 네비게이션이동 시 page 꼬이는거 푸는 것
    if (st == 0) {
      page = 1;
    } else if (st == 919) {
      page = 2;
    } else if (st >= 1838) {
      page = 3;
    }

    if (e.deltaY > 0) {
      if (page == 1) {
        page++;
        window.scrollTo(0, winW * 1);
        console.log("+페이지", winW, page);
        wheelMov(page);
      } else if (page == 2) {
        page++;
        window.scrollTo(0, winW * 2);
        console.log("+페이지", winW, page);
        wheelMov(page);
      } else if (page == 3) {
        window.scrollTo(0, winW * 3);
        console.log("+페이지", winW, page);
        wheelMov(page);
      }
    } else if (e.deltaY < 0) {
      if (page == 1) {
        window.scrollTo(0, winW * 0);
        console.log("+페이지", winW, page);
        wheelMov(page);
      } else if (page == 2) {
        page--;
        window.scrollTo(0, winW * 0);
        console.log("+페이지", winW, page);
        wheelMov(page);
      } else if (page == 3) {
        window.scrollTo(0, winW * 1);
        page--;
        console.log("+페이지", winW, page);
        wheelMov(page);
      }
    }

    console.log(e.deltaY);
    // wrap.style.top = page * -100 + 'vh';
  },
  { passive: false }
); // 디폴트 기능 제거 - 스크롤

const topBtn=document.querySelector('.top-btn');
let docH = document.body.clientHeight;
let winH = window.innerHeight;
let scLimit = docH - winH;

topBtn.onclick=()=>{
  page==0;
  for (let x of gnb) {
    x.classList.remove("on");
  } /// for of ///

  gnb[0].classList.add("on");
}
myFn.addEvt(window, "scroll", scrollTop);

function scrollTop() {
  let scTop = window.scrollY;

    let wTop = (winH * scTop) / scLimit;

  // console.log("스크롤 위치 : ", scTop);

  topBtn.style.top = wTop + "px";

if(scTop>=200){
    console.log('200인가?')
    topBtn.style.opacity = 1;
    topBtn.style.transition = ".3s ease-in";
}else if(scTop<200){
    topBtn.style.opacity = 0;
    topBtn.style.transition = ".3s ease-in";

}

} ////////////scrollTop////////




/////////////////////////////////////////////////////////////////////////////////
// 뮤지컬영역 - 버튼 눌럿을 때 슬라이드
// addEvt(window, "DOMContentLoaded", loadFn);
const slideEle = document.querySelectorAll(".slideShow");
console.log("슬라이드는 두개? ", slideEle);

slideEle.forEach((ele, SFidx) => slideFn(ele, SFidx));

// 배경이미지 넣을려고 만든 변수--------------///
let imgNum = 3;
let imgNum2 = 3;

function slideFn(target, SFidx) {
  console.log(target);

  // 슬라이드 전역변수
  let sldSeq = 0;

  // 이전으로 넘길때 계산할려고 넣은 변수....
  let beforeNum = 0;

  let slides = target.querySelector(".core-list");
  console.log('슬라이드',slides);
  // let slides = document.querySelectorAll(".core-list");

  // console.log('로딩완료');
  let passBtn = target.querySelectorAll(".pbtn");
  // console.log(passBtn);

  let list = slides.querySelectorAll(".core-list li");
  // console.log('리스트',list);

  ///////////////////////////////////////////////초기세팅

  for (let x of passBtn) {
    x.onclick = goSlide;
    console.log("넘기기 버튼", passBtn);
  } /// for of ///



  
  function goSlide(evt, sts = true) {
    // 버튼 클릭 시 멈춤
    if (sts) {
      clearAuto();
    } //if문

    // 광클 금지
    if (prot) return;
    prot = true;
    setTimeout(() => {
      prot = false;
    }, 1000);

    // 오른쪽버튼인가?
    // let isRbtn=document.querySelectorAll(".right-btn");
    let isRbtn = sts ? this.classList.contains("right-btn") : true;
    // let isRbtn = this.classList.contains("right-btn");
    // console.log('오르ㅜㄴ쪽 버튼?',isRbtn);

    if (isRbtn) {
      let newList = slides.querySelectorAll("li");
      let newDl = slides.querySelectorAll("dl");

      slides.style.left = "-310px";
      slides.style.transition = "none";
      slides.style.transition = "1s ease-out";

      // on클래스 삽입
      for (let x of newList) x.classList.remove("on");
      for (let x of newDl) x.classList.remove("on");
      newList[4].classList.add("on");
      newDl[4].classList.add("on");

      // 앞에 거 뒤에 붙이기
      setTimeout(() => {
        if (sldSeq - 1 == -1) {
          slides.appendChild(list[6]);
        } else {
          slides.appendChild(list[sldSeq - 1]);
        }
        slides.style.left = "0px";
        slides.style.transition = "none";
      }, 1000);

      sldSeq++;
      if (SFidx == 0) {
        imgNum == 6 ? (imgNum = 0) : imgNum++;
      } else if (SFidx == 1) {
        imgNum2 == 6 ? (imgNum2 = 0) : imgNum2++;
      }

      beforeNum--;
      // console.log("증가하나? imgNum:", imgNum, "imgNum2:", imgNum2);

      if (sldSeq > 6) {
        sldSeq = 0;
      }
      if (beforeNum < 0) {
        beforeNum = 6;
      }
    } ///////여기까지 오른쪽 클릭 /////////
    else {
      let newList = slides.querySelectorAll("li");
      let newDl = slides.querySelectorAll("dl");

      slides.style.left = "310px";
      slides.style.transition = "none";
      slides.style.transition = "1s ease-out";

      // on클래스 삽입
      for (let x of newList) x.classList.remove("on");
      for (let x of newDl) x.classList.remove("on");
      newList[2].classList.add("on");
      newDl[2].classList.add("on");

      // 뒤에 거 앞에 붙이기
      setTimeout(() => {
        if (list.length - beforeNum == 7) {
          slides.prepend(list[0]);
        } else {
          slides.prepend(list[list.length - beforeNum]);
        }
        // console.log(slides.appendChild(list[0]));
        slides.style.left = "0px";
        slides.style.transition = "none";
      }, 1000);

      sldSeq--;
      if (SFidx == 0) {
        imgNum === 0 ? (imgNum = 6) : imgNum--;
      } else if (SFidx == 1) {
        imgNum2 === 0 ? (imgNum2 = 6) : imgNum2--;
      }

      beforeNum++;

      // console.log("감소하나? imgNum:", imgNum, "imgNum2:", imgNum2);

      if (sldSeq < 0) {
        sldSeq = 6;
      }
      if (beforeNum > 6) {
        beforeNum = 0;
      }
    } //////isRbtn? IF문/////////////
  } ////goSlide함수////

  ///////////////////////////////////////////////////////////////////////////////////////////////
  // 뮤지컬 영역 - 슬라이드 자동넘김

  // 인터발용 변수(지울목적)
  let autoI;
  // 타임아웃용 변수(지울목적)
  let autoT;

  autoSlide();

  // setInterval(함수,시간)
  // - 일정시간간격으로 함수를 호출
  function autoSlide() {
    autoI = setInterval(() => {
      console.log("들어가나?");
      goSlide(false,false);
    }, 5000);
  } ////////autoslide함수///////////////

  // clearInterval(인터발변수)
  // - 변수에 담긴 인터발을 지움(멈춤)
  function clearAuto() {
    // 지우기 확인
    console.log("인터발지워!");
    clearInterval(autoI);

    // 타임아웃지우기 : 실행쓰나미 방지
    clearTimeout(autoT);

    // 5초후 아무작동도 안하면 다시 인터발호출
    autoT = setTimeout(() => {
      autoSlide();
    }, 5000);
  } ///////clearAuto함수///////////////

  ////////////////////////////////////////////////////////////////////////////////////
  // 메인영역 - 타이틀 마우스 오버시 메인 유튜브가 opacity .5%로 변경

  const dtSpan = document.querySelectorAll(".main-tit span");
  const screen = document.querySelectorAll(".screen .ifr");
  const staImg = document.querySelector(".main-tit-img");

  function Menter(i) {
    staImg.style.opacity = 0;
    dtSpan[i].style.color = "#650ba7";
    screen[i].style.opacity = 0.5;
    staImg.style.transition = "0.5s ease-in-out";
    screen[i].style.transition = "0.5s ease-in-out";
    // console.log("마우스 엔터되었나",screen[i]);
  }
  function Mleave(i) {
    // console.log("마우스 떠났나");
    staImg.style.opacity = 1;
    dtSpan[i].style.color = "#bebec4";
    screen[i].style.opacity = 0;
    staImg.style.transition = "0.5s ease-in-out";
    dtSpan[i].style.transition = "0.5s ease-in-out";
    screen[i].style.transition = "0.5s ease-in-out";
  }

  dtSpan[0].onmouseenter = () => {
    dtSpan[0].style.textShadow = "0 0 5px black";
    Menter(0);
  };
  dtSpan[0].onmouseleave = () => {
    dtSpan[0].style.textShadow = "none";
    Mleave(0);
  };
  dtSpan[1].onmouseenter = () => {
    dtSpan[1].style.textShadow = "0 0 5px black";

    Menter(1);
  };
  dtSpan[1].onmouseleave = () => {
    dtSpan[1].style.textShadow = "none";

    screen[0].style.transition = "display 0.5s ease-in-out";

    Mleave(1);
  };

  ////////////////////////////////////////////////////////////////////////////////////
  // 뮤지컬 영역 - 마우스 오버시 뒷배경 사진 띄우기

  // 초기화 세팅

  const slideImg = document.querySelectorAll(".msc-list img");
  const backImg = document.querySelector("#msc-back-img");

  // console.log("kkkkkk", slideImg);
  // 이미지 넣기
  const wrapping = (j) => {
    let hcode = "";
    for (let i = 0; i < 4; i++) {
      hcode += `
    <img src="./img/back/main_msc${j}_${i + 1}.JPG" alt="사진.." />
    `;
    } ////i의 for문
    // 이미지코드 리턴
    // console.log('ssssss',hcode);
    return hcode;
  };
  const setImgNow = (seq) => {
    backImg.innerHTML = `
    <li> ${wrapping(seq)}</li>
    `;
  }; //// setImgNow 함수 /////


  // console.log(winWid, winHei);

  slideImg.forEach((val, idx) => {
    slideImg[idx].onmouseover = () => {
      let winWid = window.innerWidth;
      let winHei = window.innerHeight;

      let Wrdm1 = () => Math.ceil((winWid / 2) * Math.random()); //0~50
      let Wrdm2 = () => Math.ceil((winWid / 2) * Math.random()) + winWid / 2; //50~100

      let Hrdm1 = () => Math.ceil((winHei / 2) * Math.random()); //0~50
      let Hrdm2 = () => Math.ceil((winHei / 2) * Math.random()) + winHei / 2; //50~100

      setImgNow(imgNum);
      console.log("idx:", idx, "/imgNum:", imgNum);
      let tg = document.querySelectorAll("#msc-back-img img");



      if (idx == imgNum) {
        // console.log("마우스오버 오케이, 숫자도 맞음", tgLi[sldSeq], sldSeq);
        slideImg[idx].style.boxShadow = "0 0 10px white";

        
        tg[0].style.top = Hrdm1() + "px";
        tg[0].style.left = Wrdm1() + "px";
        tg[0].style.transform = "translate(-50%,-50%)";

        tg[1].style.top = Hrdm1() + "px";
        tg[1].style.left = Wrdm2() + "px";
        tg[1].style.transform = "translate(-50%,-50%)";

        tg[2].style.top = Hrdm2() + "px";
        tg[2].style.left = Wrdm1() + "px";
        tg[2].style.transform = "translate(-50%,-50%)";

        tg[3].style.top = Hrdm2() + "px";
        tg[3].style.left = Wrdm2() + "px";
        tg[3].style.transform = "translate(-50%,-50%)";

        setTimeout(() => {
          tg[0].style.maxHeight = "800px";
        }, 50);
        setTimeout(() => {
          tg[1].style.maxHeight = "800px";
        }, 100);
        setTimeout(() => {
          tg[3].style.maxHeight = "800px";
        }, 100);
        setTimeout(() => {
          tg[2].style.maxHeight = "800px";
        }, 300);
        // 여기다쓰면됨!! 이미지 관련!!!

        // console.log('가로세로1',tg[idx].width,tg[idx].maxHeight);

      } else {
        console.log("마우스오버가 됐지만 먼가 안맞음");

      } //if문 - 슬라이드가 가운데 오는지 확인하는 if문
    }; ///마우스 엔터이벤트///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    slideImg[idx].onmouseleave = () => {
      let tg = document.querySelectorAll("#msc-back-img img");
      tg.forEach((ele) => {
        slideImg[idx].style.boxShadow = "none";
        ele.style.maxHeight = '0px';
      });
    }; //////mosuseleave///////////////////
  }); ///forEach문/// - 마우스엔터 이벤트 할려고 만든

  ////////////////////////////////////////////////////////////////////////////////////
  // 전시화 영역 - 마우스 오버시 뒷배경 사진 띄우기

  // 초기화 세팅

  const slideImg2 = document.querySelectorAll(".exh-list img");
  const backImg2 = document.querySelector("#exh-back-img");

  // 이미지 넣기
  const wrapping2 = (j) => {
    let hcode = "";
    for (let i = 0; i < 4; i++) {
      hcode += `
    <img src="./img/back/exh/main_exh${j}_${i + 1}.JPG" alt="사진.." />
    `;
    } ////i의 for문
    // 이미지코드 리턴
    return hcode;
  };

  const setImgNow2 = (seq) => {
    backImg2.innerHTML = `
    <li> ${wrapping2(seq)}</li>
    `;
  }; //// setImgNow 함수 /////

  slideImg2.forEach((val, idx) => {
    slideImg2[idx].onmouseover = () => {
      let winWid2 = window.innerWidth;
      let winHei2 = window.innerHeight;

      // backImg2.style.height=winHei2;
      console.log("전시회", winHei2, backImg2.scrollTop);
      // console.log(winHei);

      let Wrdm1 = () => Math.ceil((winWid2 / 2) * Math.random()); //0~50
      let Wrdm2 = () => Math.ceil((winWid2 / 2) * Math.random()) + winWid2 / 2; //50~100

      let Hrdm1 = () => Math.ceil((winHei2 / 2) * Math.random()); //0~50
      let Hrdm2 = () => Math.ceil((winHei2 / 2) * Math.random()) + winHei2 / 2; //50~100

      setImgNow2(imgNum2);
      console.log("idx:", idx, "/imgNum2:", imgNum2);
      let tg2 = document.querySelectorAll("#exh-back-img img");
      if (idx == imgNum2) {
        // console.log("마우스오버 오케이, 숫자도 맞음", tgLi[sldSeq], sldSeq);
        slideImg2[idx].style.boxShadow = "0 0 10px white";

        tg2[0].style.top = Hrdm1() + "px";
        tg2[0].style.left = Wrdm1() + "px";
        tg2[0].style.transform = "translate(-50%,-50%)";

        tg2[1].style.top = Hrdm1() + "px";
        tg2[1].style.left = Wrdm2() + "px";
        tg2[1].style.transform = "translate(-50%,-50%)";

        tg2[2].style.top = Hrdm2() + "px";
        tg2[2].style.left = Wrdm1() + "px";
        tg2[2].style.transform = "translate(-50%,-50%)";

        tg2[3].style.top = Hrdm2() + "px";
        tg2[3].style.left = Wrdm2() + "px";
        tg2[3].style.transform = "translate(-50%,-50%)";

        setTimeout(() => {
          tg2[0].style.maxHeight = "800px";
        }, 50);
        setTimeout(() => {
          tg2[1].style.maxHeight = "800px";
        }, 100);
        setTimeout(() => {
          tg2[3].style.maxHeight = "800px";
        }, 100);
        setTimeout(() => {
          tg2[2].style.maxHeight = "800px";
        }, 300);

        // console.log('가로세로',tg2[idx].width,tg2[idx].maxHeight);

        // 여기다쓰면됨!! 이미지 관련!!!
      } else {
        console.log("마우스오버가 됐지만 먼가 안맞음");
        console.log("안맞으면 찍어보기", idx, imgNum2);
      } //if문 - 슬라이드가 가운데 오는지 확인하는 if문
    }; ///마우스 엔터이벤트
    slideImg2[idx].onmouseleave = () => {
      let tg2 = document.querySelectorAll("#exh-back-img img");
      tg2.forEach((ele) => {
        slideImg2[idx].style.boxShadow = "none";
        ele.style.maxHeight = '0px';
      });
    }; //////mosuseleave///////////////////
  }); ///forEach문/// - 마우스엔터 이벤트 할려고 만든

  // if(sts==false){
  //   clearAuto();
  // }
} ///////slideFn/////////////////
