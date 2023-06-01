var cal = {
    // (A) PROPERTIES
    // (A1) FLAGS & DATA
    sMon : false, // week start on monday
    data : null, // events for selected period
    sDay : 0, sMth : 0, sYear : 0, // selected day month year
   
    // (A2) MONTHS & DAY NAMES
    months : [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    days : ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
   
    // (A3) HTML ELEMENTS
    hMth : null, hYear : null, // month/year selector
    hWrap : null, // calendar wrapper
    hFormWrap : null, hForm : null, // event form
    hfDate : null, hfTxt : null, hfDel : null, // form fields
   
    // (B) INIT CALENDAR
    init : () => {
      // (B1) GET HTML ELEMENTS
      cal.hMth = document.getElementById("calMonth");
      cal.hYear = document.getElementById("calYear");
      cal.hWrap = document.getElementById("calWrap");
      cal.hFormWrap = document.getElementById("calForm");
      cal.hForm = cal.hFormWrap.querySelector("form");
      cal.hfDate = document.getElementById("evtDate");
      cal.hfTxt = document.getElementById("evtTxt");
      cal.hfDel = document.getElementById("evtDel");
   
      // (B2) APPEND MONTHS/YEAR
      let now = new Date(), nowMth = now.getMonth();
      cal.hYear.value = parseInt(now.getFullYear());
      for (let i=0; i<12; i++) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = cal.months[i];
        if (i==nowMth) { opt.selected = true; }
        cal.hMth.appendChild(opt);
      }
   
      // (B3) ATTACH CONTROLS
      cal.hMth.onchange = cal.draw;
      cal.hYear.onchange = cal.draw;
      document.getElementById("calBack").onclick = () => cal.pshift();
      document.getElementById("calNext").onclick = () => cal.pshift(1);
      cal.hForm.onsubmit = cal.save;
      document.getElementById("evtClose").onclick = () => cal.hFormWrap.close();
      cal.hfDel.onclick = cal.del;
   
      // (B4) START - DRAW CALENDAR
      if (cal.sMon) { cal.days.push(cal.days.shift()); }
      cal.draw();
    },
    // ...
  };
  window.onload = cal.init;