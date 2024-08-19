(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=r(a);fetch(a.href,o)}})();const A=(t=4)=>{const e=[];for(let r=0;r<t;r++){const n=String.fromCharCode(Math.floor(Math.random()*26)+97);e.push(n)}return`${e.join("")}-${Date.now()}`},T=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))},L=t=>{try{return JSON.parse(localStorage.getItem(t))}catch(e){return console.error(e),null}},c=(t=!1)=>{const e=L("cats")||[];return e.sort((r,n)=>{const a=r.name.toUpperCase(),o=n.name.toUpperCase();return a<o?-1:a>o?1:0}),t?e.filter(r=>r.isTestable):e},u=t=>{T("cats",t)},H=t=>{const e=c();t.id=A(),e.push(t),u(e)},S=t=>{const e=c(),r=e.findIndex(n=>n.id===t.id);r<0||(e[r]={...e[r],...t},u(e))},y=(t,e)=>{const r=c();r.forEach(n=>{n.gender===t&&(n.isTestable=e)}),u(r)},N=(t,e)=>{const r=c();r.forEach(n=>{if(n.id===t){n.isTestable=!0;return}n.gender===e&&(n.isTestable=!1)}),u(r)},x=t=>{u(c().filter(e=>e.id!==t))},m=(t,e=!1)=>c(e).filter(r=>r.gender===t),I="catCalculator:primaryGender",b=()=>L(I)||"m",w=t=>{T(I,t)},q=()=>{const t=b();return m(t).find(r=>r.isTestable)},O=()=>{const t=b(),r={...m(t)[0],isTestable:!0};S(r)},R=(t,e,r)=>t.traits.map((a,o)=>{const i=e.traits[o],s=r[o],h=Math.max(a,i),d=Math.min(a,i),l=Array(1+h-d).fill(0).map(($,F)=>F+d),C=h>=s&&s>=d,v=C?Math.round(1/l.length*100):0,P=v===100;return{idealTraitIdx:l.findIndex($=>$===s),idealTraitNum:s,hasTraitInRange:C,isLockedInTrait:P,traitChance:v,traitRange:l}}),j=t=>{const{traitRange:e,traitChance:r,idealTraitIdx:n,isLockedInTrait:a}=t,o=i=>i!==n?"":a?"border":"circle-border";return`<tr>
    <td>
      ${e.map((i,s)=>`
            <span class=${o(s)}>${i}</span>${s===e.length-1?"":","}
          `).join("")}
    </td>
    <td>${r}%</td>
  <tr>
  `},B=[11,12,15,5,13,14,3],k=(t,e,r=B)=>{const n=R(t,e,r);return`
    <li class="cat-combo-container">
      <h3>${t.name} x ${e.name}</h3>
      <table>
        <tr>
          <th>Range</th>
          <th>Chance</th>
        </tr>
        ${n.map(j).join("")}
      </table>

      <p>Possible Traits: <b>${n.filter(a=>a.hasTraitInRange).length}/7</b></p>
      <p>Lock Traits: <b>${n.filter(a=>a.isLockedInTrait).length}/7</b></p>
      <p>Points: <em>${Math.round(n.reduce((a,o)=>a+o.traitChance,0))}/700</em></p>
    </li>
  `},D=["Body Type","Body Size","Head Shape","Ears","Nose","Eyes","Eye Color"];function f(){const t=m("m",!0),e=m("f",!0),r=document.querySelector("#cat-combo-container"),n=document.createElement("ul");n.id="cat-combos-list",n.classList.add("horiz-list"),t.forEach(i=>{e.forEach(s=>{n.insertAdjacentHTML("beforeend",k(i,s))})});const a=q(),o=document.createElement("table");a&&(o.id="primary-cat-stats",o.innerHTML=`
      <caption>${a.name}</caption>
      <thead>
        <tr>
          ${D.map(i=>`<th>${i}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${a.traits.map(i=>`<td>${i}</td>`).join("")}
        </tr>
      </tbody>
    `),r.replaceChildren(o,n)}const G="select",M="clear";function z(t){const{id:e,checked:r,type:n,name:a}=t.target;n==="radio"?N(e,a):S({id:e,isTestable:r}),f()}function K(t){const{gender:e,action:r}=t.target.dataset;!e&&!r||(r===G&&y(e,!0),r===M&&y(e,!1),p(),f())}const U=(t,e)=>{const{id:r,isTestable:n,name:a,gender:o}=t;return`
  <div>
    <input type=${e?"radio":"checkbox"} id=${r} name=${o} ${n?"checked":""} />
    <label for=${r}>${a}</label>
  </div>
  `},E=(t,e)=>{const r=`
    <div class="inline-centered-buttons">
      <button type="button" data-gender=${t} data-action=${G}>Select all</button>
      <button type="button" data-gender=${t} data-action=${M}>Clear all</button>
    </div>
  `;return`
    <fieldset>
      <legend>${t==="m"?"Male":"Female"} Cats</legend>
      <div class="grid-container">
        ${m(t).map(n=>U(n,e)).join("")}
      </div>
      ${e?"":r}
    </fieldset>
  `};function p(){const t=document.querySelector("#select-cats-form-container"),e=document.createElement("form");e.setAttribute("aria-labelledby","select-cats-header"),e.id="select-cats-form";const r=b();e.innerHTML=`
    <h2 id="select-cats-header">Select cats</h2>
    <div id="cat-options">
      ${E("m",r==="m")}
      ${E("f",r==="f")}
    </div>
  `,t.replaceChildren(e),e.addEventListener("change",z),e.addEventListener("click",K)}function J(t){t.target.dataset.removeCatId&&(x(t.target.dataset.removeCatId),g(),p(),f())}const _=({name:t,gender:e,traits:r,id:n})=>{const[a,o,i,s,h,d,l]=r;return`
    <li class="current-cat">
      <h3>${t}</h3>
      <ul>
        <li>Gender: ${e==="m"?"Male":"Female"}</li>
        <li>Body type: ${a}</li>
        <li>Body Size: ${o}</li>
        <li>Head Shape: ${i}</li>
        <li>Ears: ${s}</li>
        <li>Nose: ${h}</li>
        <li>Eyes: ${d}</li>
        <li>Eye Color: ${l}</li>
      </ul>
      <button data-remove-cat-id=${n}>Remove</button>
    </li>
  `};function g(){const t=document.querySelector("#current-cats-container"),e=c(),r=document.createElement("ul");r.id="current-cats-list",r.innerHTML=e.map(_).join(""),r.addEventListener("click",J),t.replaceChildren(r)}const Y=t=>{if(t.includes("pale"))return 1;if(t.includes("medium"))return 2;if(t.includes("deep"))return 3},Q=t=>{const e=t.toLowerCase().trim().split(`
`);return e.map((r,n)=>{if(n===e.length-1)return Y(r);const a=r.match(/\((\d+)\)/);return parseInt(a[1])})};function V(t){t.preventDefault();const e=new FormData(t.target),r=Object.fromEntries(e);r.traits=Q(r.traits),r.isTestable=!1,H(r),t.target.reset(),g(),p()}const W=`Copy this formatted text from the cat!

Body type: semi-foreign (15)
Body size: medium (13)
Head shape: rounded wedge (11)
Ears: medium size straight (6)
Nose: medium length (15)
Eyes: oval (12)
Eye color: medium grey-green`;function X(){const t=document.querySelector("#add-cat-form-container"),e=document.createElement("form");e.setAttribute("aria-labelledby","add-cat-header"),e.innerHTML=`
    <form aria-labelledby="add-cat-header">
      <h2 id="add-cat-header">Add New Cat</h2>
      <div>
        <label for="name">Cat Name:</label>
        <input type="text" id="name" name="name" required/>
      </div>
      <fieldset>
        <legend>Gender</legend>
        <input type="radio" id="female" name="gender" value="f" required>
        <label for="female">Female</label>
        <input type="radio" id="male" name="gender" value="m">
        <label for="male">Male</label>
      </fieldset>
      <div>
        <label for="traits">Enter Traits Here</label>
        <textarea id="traits" name="traits" placeholder="${W}" required></textarea>
      </div>
      <button>Save</button>
    </form>
  `,t.append(e),e.addEventListener("submit",V)}function Z(){const t=document.querySelector("#primary-gender-form-container"),e=b(),r=a=>e===a?"checked":"",n=document.createElement("form");n.setAttribute("aria-labelledby","primary-gender-header"),n.id="primary-gender-form",n.innerHTML=`
    <h2 id="primary-gender-header">Select the gender</h2>
    <fieldset>
      <legend>Primary Gender</legend>
      <input type="radio" id="primary-male" value="m" name="gender" ${r("m")}/>
      <label for="primary-male">Male</label>
      <input type="radio" id="primary-female" value="f" name="gender" ${r("f")}/>
      <label for="primary-female">Female</label>
    </fieldset>
  `,t.replaceChildren(n),n.addEventListener("change",a=>{const o=a.target.value,i=o==="m"?"f":"m";w(a.target.value),y(o,!1),y(i,!0),O(),p(),f()})}const ee=()=>{document.querySelector("#app").innerHTML=`
    <main>
      <h1>Cat Calculator</h1>
      <div id="add-cat-form-container"></div>
      <section aria-labelledby="current-cats-heading">
        <h2 id="current-cats-heading">Current Cats</h2>
        <div id="current-cats-container"></div>
      </section>
      <div id="primary-gender-form-container"></div>
      <div id="select-cats-form-container"></div>
      <section aria-labelledby="combo-heading">
        <h2 id="combo-heading">Combinations</h2>
        <div id="primary-cat-stats-container"></div>
        <div id="cat-combo-container"></div>
      </section>
    </main>
  `},te=()=>{ee(),X(),g(),p(),f(),Z()};te();
