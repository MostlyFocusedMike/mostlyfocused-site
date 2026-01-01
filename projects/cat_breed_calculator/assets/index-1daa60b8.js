(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=r(a);fetch(a.href,i)}})();const F=(t=4)=>{const e=[];for(let r=0;r<t;r++){const n=String.fromCharCode(Math.floor(Math.random()*26)+97);e.push(n)}return`${e.join("")}-${Date.now()}`},E=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))},L=t=>{try{return JSON.parse(localStorage.getItem(t))}catch(e){return console.error(e),null}},m=(t=!1)=>{const e=L("cats")||[];return e.sort((r,n)=>{const a=r.name.toUpperCase(),i=n.name.toUpperCase();return a<i?-1:a>i?1:0}),t?e.filter(r=>r.isTestable):e},p=t=>{E("cats",t)},A=t=>{const e=m();t.id=F(),e.push(t),p(e)},S=t=>{const e=m(),r=e.findIndex(n=>n.id===t.id);r<0||(e[r]={...e[r],...t},p(e))},g=(t,e)=>{const r=m();r.forEach(n=>{n.gender===t&&(n.isTestable=e)}),p(r)},D=(t,e)=>{const r=m();r.forEach(n=>{if(n.id===t){n.isTestable=!0;return}n.gender===e&&(n.isTestable=!1)}),p(r)},H=t=>{p(m().filter(e=>e.id!==t))},u=(t,e=!1)=>m(e).filter(r=>r.gender===t),I="catCalculator:primaryGender",f=()=>L(I)||"m",N=t=>{E(I,t)},x=()=>{const t=f();return u(t).find(r=>r.isTestable)},O=()=>{const t=f(),r={...u(t)[0],isTestable:!0};S(r)},q=(t,e,r)=>t.traits.map((a,i)=>{const s=e.traits[i],o=r[i],c=Math.max(a,s),d=Math.min(a,s),l=Array(1+c-d).fill(0).map(($,P)=>P+d),b=c>=o&&o>=d,v=b?Math.round(1/l.length*100):0,M=v===100;return{idealTraitIdx:l.findIndex($=>$===o),idealTraitNum:o,hasTraitInRange:b,isLockedInTrait:M,traitChance:v,traitRange:l}}),R=t=>{const{traitRange:e,traitChance:r,idealTraitIdx:n,isLockedInTrait:a}=t,i=s=>s!==n?"":a?"border":"circle-border";return`<tr>
    <td>
      ${e.map((s,o)=>`<span class=${i(o)}>${s}</span>${o===e.length-1?"":","}`).join("")}
    </td>
    <td>${r}%</td>
  <tr>
  `},j=[11,12,15,5,13,14,3],k=(t,e,r=j)=>{const n=q(t,e,r);return{maleCat:t,femaleCat:e,combos:n,possibleTraits:n.filter(a=>a.hasTraitInRange).length,lockTraits:n.filter(a=>a.isLockedInTrait).length,points:Math.round(n.reduce((a,i)=>a+i.traitChance,0))}},z=t=>{const{maleCat:e,femaleCat:r,combos:n,possibleTraits:a,lockTraits:i,points:s}=t;return`
    <li class="cat-combo-container">
      <h3>${e.name} x ${r.name}</h3>
      <table>
        <tr>
          <th>Range</th>
          <th>Chance</th>
        </tr>
        ${n.map(R).join("")}
      </table>

      <p>Possible Traits: <b>${a}/7</b></p>
      <p>Lock Traits: <b>${i}/7</b></p>
      <p>Points: <em>${s}/700</em></p>
    </li>
  `},B=["Body Type","Body Size","Head Shape","Ears","Nose","Eyes","Eye Color"];function h(){const t=u("m",!0),e=u("f",!0),r=document.querySelector("#cat-combo-container"),n=document.createElement("ul");n.id="cat-combos-list",n.classList.add("horiz-list");const a=[];t.forEach(o=>{e.forEach(c=>{a.push(k(o,c))})}),a.sort((o,c)=>{const d=f()==="m"?"femaleCat":"maleCat",l=o[d].createdAt||new Date(0),b=c[d].createdAt||new Date(0);return o.possibleTraits===c.possibleTraits?c.points===o.points?new Date(l)-new Date(b):c.points-o.points:c.possibleTraits-o.possibleTraits}),a.forEach(o=>{n.insertAdjacentHTML("beforeend",z(o))});const i=x(),s=document.createElement("table");i&&(s.id="primary-cat-stats",s.innerHTML=`
      <caption>${i.name}</caption>
      <thead>
        <tr>
          ${B.map(o=>`<th>${o}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${i.traits.map(o=>`<td>${o}</td>`).join("")}
        </tr>
      </tbody>
    `),r.replaceChildren(s,n)}const G="select",w="clear";function K(t){const{id:e,checked:r,type:n,name:a}=t.target;n==="radio"?D(e,a):S({id:e,isTestable:r}),h()}function U(t){const{gender:e,action:r}=t.target.dataset;!e&&!r||(r===G&&g(e,!0),r===w&&g(e,!1),y(),h())}const J=(t,e)=>{const{id:r,isTestable:n,name:a,gender:i}=t;return`
  <div>
    <input type=${e?"radio":"checkbox"} id=${r} name=${i} ${n?"checked":""} />
    <label for=${r}>${a}</label>
  </div>
  `},T=(t,e)=>{const r=`
    <div class="inline-centered-buttons">
      <button type="button" data-gender=${t} data-action=${G}>Select all</button>
      <button type="button" data-gender=${t} data-action=${w}>Clear all</button>
    </div>
  `;return`
    <fieldset>
      <legend>${t==="m"?"Male":"Female"} Cats</legend>
      <div class="grid-container">
        ${u(t).map(n=>J(n,e)).join("")}
      </div>
      ${e?"":r}
    </fieldset>
  `};function y(){const t=document.querySelector("#select-cats-form-container"),e=document.createElement("form");e.setAttribute("aria-labelledby","select-cats-header"),e.id="select-cats-form";const r=f();e.innerHTML=`
    <h2 id="select-cats-header">Select cats</h2>
    <div id="cat-options">
      ${T("m",r==="m")}
      ${T("f",r==="f")}
    </div>
  `,t.replaceChildren(e),e.addEventListener("change",K),e.addEventListener("click",U)}function _(t){t.target.dataset.removeCatId&&(H(t.target.dataset.removeCatId),C(),y(),h())}const Y=({name:t,gender:e,traits:r,id:n})=>{const[a,i,s,o,c,d,l]=r;return`
    <li class="current-cat">
      <h3>${t}</h3>
      <ul>
        <li>Gender: ${e==="m"?"Male":"Female"}</li>
        <li>Body type: ${a}</li>
        <li>Body Size: ${i}</li>
        <li>Head Shape: ${s}</li>
        <li>Ears: ${o}</li>
        <li>Nose: ${c}</li>
        <li>Eyes: ${d}</li>
        <li>Eye Color: ${l}</li>
      </ul>
      <button data-remove-cat-id=${n}>Remove</button>
    </li>
  `};function C(){const t=document.querySelector("#current-cats-container"),e=m(),r=document.createElement("ul");r.id="current-cats-list",r.innerHTML=e.map(Y).join(""),r.addEventListener("click",_),t.replaceChildren(r)}const Q=t=>{if(t.includes("pale"))return 1;if(t.includes("medium"))return 2;if(t.includes("deep"))return 3},V=t=>{const e=t.toLowerCase().trim().split(`
`);return e.map((r,n)=>{if(n===e.length-1)return Q(r);const a=r.match(/\((\d+)\)/);return parseInt(a[1])})};function W(t){t.preventDefault();const e=new FormData(t.target),r=Object.fromEntries(e);r.traits=V(r.traits),r.isTestable=!1,r.createdAt=new Date().toISOString(),console.log("newCat:",r),A(r),t.target.reset(),C(),y()}const X=`Copy this formatted text from the cat!

Body type: semi-foreign (15)
Body size: medium (13)
Head shape: rounded wedge (11)
Ears: medium size straight (6)
Nose: medium length (15)
Eyes: oval (12)
Eye color: medium grey-green`;function Z(){const t=document.querySelector("#add-cat-form-container"),e=document.createElement("form");e.setAttribute("aria-labelledby","add-cat-header"),e.innerHTML=`
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
        <textarea id="traits" name="traits" placeholder="${X}" required></textarea>
      </div>
      <button>Save</button>
    </form>
  `,t.append(e),e.addEventListener("submit",W)}function ee(){const t=document.querySelector("#primary-gender-form-container"),e=f(),r=a=>e===a?"checked":"",n=document.createElement("form");n.setAttribute("aria-labelledby","primary-gender-header"),n.id="primary-gender-form",n.innerHTML=`
    <h2 id="primary-gender-header">Select the gender</h2>
    <fieldset>
      <legend>Primary Gender</legend>
      <input type="radio" id="primary-male" value="m" name="gender" ${r("m")}/>
      <label for="primary-male">Male</label>
      <input type="radio" id="primary-female" value="f" name="gender" ${r("f")}/>
      <label for="primary-female">Female</label>
    </fieldset>
  `,t.replaceChildren(n),n.addEventListener("change",a=>{const i=a.target.value,s=i==="m"?"f":"m";N(a.target.value),g(i,!1),g(s,!0),O(),y(),h()})}const te=()=>{document.querySelector("#app").innerHTML=`
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
  `},re=()=>{te(),Z(),C(),y(),h(),ee()};re();
