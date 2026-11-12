/* 행신고 3학년부 · AI 제작 보조 */
(() => {
  'use strict';
  const c=window.SCHOOL||{};
  const set=(selector,value)=>document.querySelectorAll(selector).forEach(n=>n.textContent=value);
  const name=String(c.name||'○○고등학교'), year=Number(c.examYear)||2027;
  set('[data-school]',name); set('[data-school-en]',c.englishName||'OUR SCHOOL');
  set('[data-motto]',c.motto||'학교 교훈'); set('[data-school-credit]',c.credit||'담당 선생님');
  set('[data-exam-year]',year+'학년도'); set('[data-wall-intro]','한 통, 한 통. '+name+'가 함께 보내는 응원.');
  document.querySelectorAll('[data-school-logo]').forEach(img=>{
    const fallback=img.nextElementSibling;
    if(c.logo && typeof c.logo==='string' && !/^(?:[a-z]+:|\/)|\.\./i.test(c.logo)){
      img.src=c.logo; img.hidden=false; if(fallback)fallback.hidden=true;
      img.onerror=()=>{img.hidden=true;if(fallback)fallback.hidden=false;};
    }else{img.hidden=true;if(fallback)fallback.hidden=false;}
  });
  Object.entries(c.colors||{}).forEach(([k,v])=>{
    if(['blue','green','red'].includes(k)&&/^#[0-9a-f]{6}$/i.test(v))document.documentElement.style.setProperty('--'+k,v);
  });
  const format=(value,options)=>{const n=Date.parse(value);return Number.isFinite(n)?new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',...options}).format(new Date(n)):'설정 확인 필요';};
  set('[data-exam-date]',format(c.examDate,{year:'numeric',month:'2-digit',day:'2-digit',weekday:'long'}));
  set('[data-open-short]',format(c.openAt,{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false})+' 공개');
  set('[data-open-full]',format(c.openAt,{year:'numeric',month:'long',day:'numeric',hour:'numeric',minute:'2-digit',hour12:false}));
  const guideValid=c.guideEnabled!==false && year===Number(c.guideEdition||2027);
  document.querySelectorAll('[data-guide-link]').forEach(n=>n.hidden=!guideValid);
  if(document.body.dataset.page==='guide'){
    document.title='수험생이라면 꼭 확인! · '+name;
    if(!guideValid){
      document.querySelectorAll('main>.section,.jump,main>.hero,main>.ai-note').forEach(n=>n.hidden=true);
      const note=document.createElement('aside');note.className='ai-note';
      note.textContent='공식 안내 자료를 확인해야 합니다. 이 페이지는 '+(c.guideEdition||2027)+'학년도 자료입니다. 학교 담당자가 해당 학년도 공식 자료와 내용을 대조하기 전에는 이 요약을 사용하지 마세요.';
      const main=document.querySelector('main');if(main)main.prepend(note);

    }
  } else {
    document.querySelector('meta[name="description"]')?.setAttribute('content',name+' 수험생에게 보내는 따뜻한 마음, 수능 응원 우체통');
  }
})();
