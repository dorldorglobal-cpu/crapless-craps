(()=>{
  function calculateStreaks(){
    // Roll history is displayed newest -> oldest.
    const rolls=[...document.querySelectorAll('#rollHistory .history-roll')]
      .map(el=>Number(el.textContent.trim()))
      .filter(Number.isFinite);

    // Current streak = rolls since the most recent 7.
    let current=0;
    for(const n of rolls){
      if(n===7) break;
      current++;
    }

    // Last streak = rolls between the most recent 7 and the 7 before it.
    let last=0;
    const newestSeven=rolls.indexOf(7);
    if(newestSeven!==-1){
      for(let i=newestSeven+1;i<rolls.length;i++){
        if(rolls[i]===7) break;
        last++;
      }
    }

    const currentEl=document.getElementById('streak');
    const lastEl=document.getElementById('lastStreak');

    if(currentEl) currentEl.textContent=String(current);
    if(lastEl) lastEl.textContent=String(last);
  }

  function startStreakTracker(){
    const history=document.getElementById('rollHistory');

    if(!history){
      setTimeout(startStreakTracker,100);
      return;
    }

    calculateStreaks();

    new MutationObserver(calculateStreaks).observe(history,{
      childList:true,
      subtree:true
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',startStreakTracker);
  }else{
    startStreakTracker();
  }
})();
