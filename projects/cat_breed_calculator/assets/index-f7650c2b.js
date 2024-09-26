(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=r(a);fetch(a.href,o)}})();const A=(t=4)=>{const e=[];for(let r=0;r<t;r++){const n=String.fromCharCode(Math.floor(Math.random()*26)+97);e.push(n)}return`${e.join("")}-${Date.now()}`},E=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))},L=t=>{try{return JSON.parse(localStorage.getItem(t))}catch(e){return console.error(e),null}},d=(t=!1)=>{const e=L("cats")||[];return e.sort((r,n)=>{const a=r.name.toUpperCase(),o=n.name.toUpperCase();return a<o?-1:a>o?1:0}),t?e.filter(r=>r.isTestable):e},p=t=>{E("cats",t)},H=t=>{const e=d();t.id=A(),e.push(t),p(e)},S=t=>{const e=d(),r=e.findIndex(n=>n.id===t.id);r<0||(e[r]={...e[r],...t},p(e))},b=(t,e)=>{const r=d();r.forEach(n=>{n.gender===t&&(n.isTestable=e)}),p(r)},N=(t,e)=>{const r=d();r.forEach(n=>{if(n.id===t){n.isTestable=!0;return}n.gender===e&&(n.isTestable=!1)}),p(r)},x=t=>{p(d().filter(e=>e.id!==t))},u=(t,e=!1)=>d(e).filter(r=>r.gender===t),I="catCalculator:primaryGender",y=()=>L(I)||"m",w=t=>{E(I,t)},q=()=>{const t=y();return u(t).find(r=>r.isTestable)},O=()=>{const t=y(),r={...u(t)[0],isTestable:!0};S(r)},R=(t,e,r)=>t.traits.map((a,o)=>{const s=e.traits[o],i=r[o],c=Math.max(a,s),l=Math.min(a,s),m=Array(1+c-l).fill(0).map(($,F)=>F+l),C=c>=i&&i>=l,v=C?Math.round(1/m.length*100):0,P=v===100;return{idealTraitIdx:m.findIndex($=>$===i),idealTraitNum:i,hasTraitInRange:C,isLockedInTrait:P,traitChance:v,traitRange:m}}),j=t=>{const{traitRange:e,traitChance:r,idealTraitIdx:n,isLockedInTrait:a}=t,o=s=>s!==n?"":a?"border":"circle-border";return`<tr>
    <td>
      ${e.map((s,i)=>`
            <span class=${o(i)}>${s}</span>${i===e.length-1?"":","}
          `).join("")}
    </td>
    <td>${r}%</td>
  <tr>
  `},k=[11,12,15,5,13,14,3],B=(t,e,r=k)=>{const n=R(t,e,r);return{maleCat:t,femaleCat:e,combos:n,possibleTraits:n.filter(a=>a.hasTraitInRange).length,lockTraits:n.filter(a=>a.isLockedInTrait).length,points:Math.round(n.reduce((a,o)=>a+o.traitChance,0))}},D=t=>{const{maleCat:e,femaleCat:r,combos:n,possibleTraits:a,lockTraits:o,points:s}=t;return`
    <li class="cat-combo-container">
      <h3>${e.name} x ${r.name}</h3>
      <table>
        <tr>
          <th>Range</th>
          <th>Chance</th>
        </tr>
        ${n.map(j).join("")}
      </table>

      <p>Possible Traits: <b>${a}/7</b></p>
      <p>Lock Traits: <b>${o}/7</b></p>
      <p>Points: <em>${s}/700</em></p>
    </li>
  `},z=["Body Type","Body Size","Head Shape","Ears","Nose","Eyes","Eye Color"];function f(){const t=u("m",!0),e=u("f",!0),r=document.querySelector("#cat-combo-container"),n=document.createElement("ul");n.id="cat-combos-list",n.classList.add("horiz-list");const a=[];t.forEach(i=>{e.forEach(c=>{a.push(B(i,c))})}),a.sort((i,c)=>i.possibleTraits===c.possibleTraits?c.points-i.points:c.possibleTraits-i.possibleTraits),a.forEach(i=>{n.insertAdjacentHTML("beforeend",D(i))});const o=q(),s=document.createElement("table");o&&(s.id="primary-cat-stats",s.innerHTML=`
      <caption>${o.name}</caption>
      <thead>
        <tr>
          ${z.map(i=>`<th>${i}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${o.traits.map(i=>`<td>${i}</td>`).join("")}
        </tr>
      </tbody>
    `),r.replaceChildren(s,n)}const G="select",M="clear";function K(t){const{id:e,checked:r,type:n,name:a}=t.target;n==="radio"?N(e,a):S({id:e,isTestable:r}),f()}function U(t){const{gender:e,action:r}=t.target.dataset;!e&&!r||(r===G&&b(e,!0),r===M&&b(e,!1),h(),f())}const J=(t,e)=>{const{id:r,isTestable:n,name:a,gender:o}=t;return`
  <div>
    <input type=${e?"radio":"checkbox"} id=${r} name=${o} ${n?"checked":""} />
    <label for=${r}>${a}</label>
  </div>
  `},T=(t,e)=>{const r=`
    <div class="inline-centered-buttons">
      <button type="button" data-gender=${t} data-action=${G}>Select all</button>
      <button type="button" data-gender=${t} data-action=${M}>Clear all</button>
    </div>
  `;return`
    <fieldset>
      <legend>${t==="m"?"Male":"Female"} Cats</legend>
      <div class="grid-container">
        ${u(t).map(n=>J(n,e)).join("")}
      </div>
      ${e?"":r}
    </fieldset>
  `};function h(){const t=document.querySelector("#select-cats-form-container"),e=document.createElement("form");e.setAttribute("aria-labelledby","select-cats-header"),e.id="select-cats-form";const r=y();e.innerHTML=`
    <h2 id="select-cats-header">Select cats</h2>
    <div id="cat-options">
      ${T("m",r==="m")}
      ${T("f",r==="f")}
    </div>
  `,t.replaceChildren(e),e.addEventListener("change",K),e.addEventListener("click",U)}function _(t){t.target.dataset.removeCatId&&(x(t.target.dataset.removeCatId),g(),h(),f())}const Y=({name:t,gender:e,traits:r,id:n})=>{const[a,o,s,i,c,l,m]=r;return`
    <li class="current-cat">
      <h3>${t}</h3>
      <ul>
        <li>Gender: ${e==="m"?"Male":"Female"}</li>
        <li>Body type: ${a}</li>
        <li>Body Size: ${o}</li>
        <li>Head Shape: ${s}</li>
        <li>Ears: ${i}</li>
        <li>Nose: ${c}</li>
        <li>Eyes: ${l}</li>
        <li>Eye Color: ${m}</li>
      </ul>
      <button data-remove-cat-id=${n}>Remove</button>
    </li>
  `};function g(){const t=document.querySelector("#current-cats-container"),e=d(),r=document.createElement("ul");r.id="current-cats-list",r.innerHTML=e.map(Y).join(""),r.addEventListener("click",_),t.replaceChildren(r)}const Q=t=>{if(t.includes("pale"))return 1;if(t.includes("medium"))return 2;if(t.includes("deep"))return 3},V=t=>{const e=t.toLowerCase().trim().split(`
`);return e.map((r,n)=>{if(n===e.length-1)return Q(r);const a=r.match(/\((\d+)\)/);return parseInt(a[1])})};function W(t){t.preventDefault();const e=new FormData(t.target),r=Object.fromEntries(e);r.traits=V(r.traits),r.isTestable=!1,H(r),t.target.reset(),g(),h()}const X=`Copy this formatted text from the cat!

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
  `,t.append(e),e.addEventListener("submit",W)}function ee(){const t=document.querySelector("#primary-gender-form-container"),e=y(),r=a=>e===a?"checked":"",n=document.createElement("form");n.setAttribute("aria-labelledby","primary-gender-header"),n.id="primary-gender-form",n.innerHTML=`
    <h2 id="primary-gender-header">Select the gender</h2>
    <fieldset>
      <legend>Primary Gender</legend>
      <input type="radio" id="primary-male" value="m" name="gender" ${r("m")}/>
      <label for="primary-male">Male</label>
      <input type="radio" id="primary-female" value="f" name="gender" ${r("f")}/>
      <label for="primary-female">Female</label>
    </fieldset>
  `,t.replaceChildren(n),n.addEventListener("change",a=>{const o=a.target.value,s=o==="m"?"f":"m";w(a.target.value),b(o,!1),b(s,!0),O(),h(),f()})}const te=()=>{document.querySelector("#app").innerHTML=`
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
  `},re=()=>{te(),Z(),g(),h(),f(),ee()};re();
