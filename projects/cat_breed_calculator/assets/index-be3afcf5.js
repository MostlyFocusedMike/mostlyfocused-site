(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const I=(t=4)=>{const e=[];for(let a=0;a<t;a++){const n=String.fromCharCode(Math.floor(Math.random()*26)+97);e.push(n)}return`${e.join("")}-${Date.now()}`},M=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))},x=t=>{try{return JSON.parse(localStorage.getItem(t))}catch(e){return console.error(e),null}},c=(t=!1)=>{const e=x("cats")||[];return t?e.filter(a=>a.isTestable):e},f=t=>{M("cats",t)},A=t=>{const e=c();t.id=I(),e.push(t),f(e)},N=t=>{const e=c(),a=e.findIndex(n=>n.id===t.id);a<0||(e[a]={...e[a],...t},f(e))},E=(t,e)=>{const a=c();a.forEach(n=>{n.gender===t&&(n.isTestable=e)}),f(a)},F=t=>{f(c().filter(e=>e.id!==t))},m=(t,e=!1)=>c(e).filter(a=>a.gender===t),H=(t,e,a)=>t.traits.map((r,o)=>{const i=e.traits[o],s=a[o],u=Math.max(r,i),d=Math.min(r,i),l=Array(1+u-d).fill(0).map(($,S)=>S+d),y=u>=s&&s>=d,v=y?Math.round(1/l.length*100):0,T=v===100;return{idealTraitIdx:l.findIndex($=>$===s),idealTraitNum:s,hasTraitInRange:y,isLockedInTrait:T,traitChance:v,traitRange:l}}),O=t=>{const{traitRange:e,traitChance:a,idealTraitIdx:n,isLockedInTrait:r}=t,o=i=>i!==n?"":r?"border":"circle-border";return`<tr>
    <td>
      ${e.map((i,s)=>`
            <span class=${o(s)}>${i}</span>${s===e.length-1?"":","}
          `).join("")}
    </td>
    <td>${a}%</td>
  <tr>
  `},q=[11,12,15,5,13,14,3],w=(t,e,a=q)=>{const n=H(t,e,a);return`
    <li class="cat-combo-container">
      <h3>${t.name} x ${e.name}</h3>
      <table>
        <tr>
          <th>Range</th>
          <th>Chance</th>
        </tr>
        ${n.map(O).join("")}
      </table>

      <p>Possible Traits: <b>${n.filter(r=>r.hasTraitInRange).length}/7</b></p>
      <p>Lock Traits: <b>${n.filter(r=>r.isLockedInTrait).length}/7</b></p>
      <p>Points: <em>${Math.round(n.reduce((r,o)=>r+o.traitChance,0))}/700</em></p>
    </li>
  `};function h(){const t=m("m",!0),e=m("f",!0),a=document.querySelector("#cat-combo-container"),n=document.createElement("ul");n.id="cat-combos-list",n.classList.add("horiz-list"),t.forEach(r=>{e.forEach(o=>{n.insertAdjacentHTML("afterbegin",w(r,o))})}),a.replaceChildren(n)}const p="select",g="clear";function R(t){const{id:e,checked:a}=t.target;N({id:e,isTestable:a}),h()}function j(t){const{gender:e,action:a}=t.target.dataset;!e&&!a||(a===p&&E(e,!0),a===g&&E(e,!1),b(),h())}const L=t=>{const{id:e,isTestable:a,name:n}=t;return`
  <div>
    <input type="checkbox" id=${e} name=${e} ${a?"checked":""} />
    <label for=${e}>${n}</label>
  </div>
  `};function b(){const t=document.querySelector("#select-cats-form-container"),e=m("m"),a=m("f"),n=document.createElement("form");n.setAttribute("aria-labelledby","select-cats-header"),n.id="select-cats-form",n.innerHTML=`
    <h2 id="select-cats-header">Select cats</h2>
    <div id="cat-options">
      <fieldset>
        <legend>Male Cats</legend>
        <div class="grid-container">
          ${e.map(L).join("")}
        </div>
        <div class="inline-centered-buttons">
          <button type="button" data-gender="m" data-action=${p}>Select all</button>
          <button type="button" data-gender="m" data-action=${g}>Clear all</button>
        </div>
      </fieldset>
      <fieldset>
        <legend>Female Cats</legend>
        <div class="grid-container">
          ${a.map(L).join("")}
        </div>
        <div class="inline-centered-buttons">
          <button type="button" data-gender="f" data-action=${p}>Select all</button>
          <button type="button" data-gender="f" data-action=${g}>Clear all</button>
        </div>
      </fieldset>
    </div>
  `,t.replaceChildren(n),n.addEventListener("change",R),n.addEventListener("click",j)}function B(t){t.target.dataset.removeCatId&&(F(t.target.dataset.removeCatId),C(),b(),h())}const P=({name:t,gender:e,traits:a,id:n})=>{const[r,o,i,s,u,d,l]=a;return`
    <li class="current-cat">
      <h3>${t}</h3>
      <ul>
        <li>Gender: ${e==="m"?"Male":"Female"}</li>
        <li>Body type: ${r}</li>
        <li>Body Size: ${o}</li>
        <li>Head Shape: ${i}</li>
        <li>Ears: ${s}</li>
        <li>Nose: ${u}</li>
        <li>Eyes: ${d}</li>
        <li>Eye Color: ${l}</li>
      </ul>
      <button data-remove-cat-id=${n}>Remove</button>
    </li>
  `};function C(){const t=document.querySelector("#current-cats-container"),e=c(),a=document.createElement("ul");a.id="current-cats-list",a.innerHTML=e.map(P).join(""),a.addEventListener("click",B),t.replaceChildren(a)}const k=t=>{if(t.includes("pale"))return 1;if(t.includes("medium"))return 2;if(t.includes("deep"))return 3},z=t=>{const e=t.toLowerCase().trim().split(`
`);return e.map((a,n)=>{if(n===e.length-1)return k(a);const r=a.match(/\((\d+)\)/);return parseInt(r[1])})};function D(t){t.preventDefault();const e=new FormData(t.target),a=Object.fromEntries(e);a.traits=z(a.traits),a.isTestable=!1,A(a),t.target.reset(),C(),b()}const G=`Copy this formatted text from the cat!

Body type: semi-foreign (15)
Body size: medium (13)
Head shape: rounded wedge (11)
Ears: medium size straight (6)
Nose: medium length (15)
Eyes: oval (12)
Eye color: medium grey-green`;function K(){const t=document.querySelector("#add-cat-form-container"),e=document.createElement("form");e.setAttribute("aria-labelledby","add-cat-header"),e.innerHTML=`
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
        <textarea id="traits" name="traits" placeholder="${G}" required></textarea>
      </div>
      <button>Save</button>
    </form>
  `,t.append(e),e.addEventListener("submit",D)}const J=()=>{document.querySelector("#app").innerHTML=`
    <main>
      <h1>Cat Calculator</h1>
      <div id="add-cat-form-container"></div>
      <section aria-labelledby="current-cats-heading">
        <h2 id="current-cats-heading">Current Cats</h2>
        <div id="current-cats-container"></div>
      </section>
      <div id="select-cats-form-container"></div>
      <section aria-labelledby="combo-heading">
        <h2 id="combo-heading">Combinations</h2>
        <div id="cat-combo-container"></div>
      </section>
    </main>
  `},U=()=>{J(),K(),C(),b(),h()};U();
