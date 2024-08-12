(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=r(a);fetch(a.href,o)}})();const T=(t=4)=>{const e=[];for(let r=0;r<t;r++){const n=String.fromCharCode(Math.floor(Math.random()*26)+97);e.push(n)}return`${e.join("")}-${Date.now()}`},E=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))},I=t=>{try{return JSON.parse(localStorage.getItem(t))}catch(e){return console.error(e),null}},d=(t=!1)=>{const e=I("cats")||[];return t?e.filter(r=>r.isTestable):e},f=t=>{E("cats",t)},S=t=>{const e=d();t.id=T(),e.push(t),f(e)},M=t=>{const e=d(),r=e.findIndex(n=>n.id===t.id);r<0||(e[r]={...e[r],...t},f(e))},x=t=>{f(d().filter(e=>e.id!==t))},u=(t,e=!1)=>d(e).filter(r=>r.gender===t),N=(t,e,r)=>t.traits.map((a,o)=>{const i=e.traits[o],s=r[o],m=Math.max(a,i),c=Math.min(a,i),l=Array(1+m-c).fill(0).map((y,L)=>L+c),g=m>=s&&s>=c,C=g?Math.round(1/l.length*100):0,v=C===100;return{idealTraitIdx:l.findIndex(y=>y===s),idealTraitNum:s,hasTraitInRange:g,isLockedInTrait:v,traitChance:C,traitRange:l}}),F=t=>{const{traitRange:e,traitChance:r,idealTraitIdx:n,isLockedInTrait:a}=t,o=i=>i!==n?"":a?"border":"circle-border";return`<tr>
    <td>
      ${e.map((i,s)=>`
            <span class=${o(s)}>${i}</span>${s===e.length-1?"":","}
          `).join("")}
    </td>
    <td>${r}%</td>
  <tr>
  `},H=[11,12,15,5,13,14,3],O=(t,e,r=H)=>{const n=N(t,e,r);return`
    <li class="cat-combo-container">
      <h3>${t.name} x ${e.name}</h3>
      <table>
        <tr>
          <th>Range</th>
          <th>Chance</th>
        </tr>
        ${n.map(F).join("")}
      </table>

      <p>Possible Traits: <b>${n.filter(a=>a.hasTraitInRange).length}/7</b></p>
      <p>Lock Traits: <b>${n.filter(a=>a.isLockedInTrait).length}/7</b></p>
      <p>Points: <em>${Math.round(n.reduce((a,o)=>a+o.traitChance,0))}/700</em></p>
    </li>
  `};function h(){const t=u("m",!0),e=u("f",!0),r=document.querySelector("#cat-combo-container"),n=document.createElement("ul");n.id="cat-combos-list",n.classList.add("horiz-list"),t.forEach(a=>{e.forEach(o=>{n.insertAdjacentHTML("afterbegin",O(a,o))})}),r.replaceChildren(n)}function q(t){const{id:e,checked:r}=t.target;M({id:e,isTestable:r}),h()}const $=t=>{const{id:e,isTestable:r,name:n}=t;return`
  <div>
    <input type="checkbox" id=${e} name=${e} ${t.isTestable?"checked":""} />
    <label for=${e}>${t.name}</label>
  </div>
  `};function p(){const t=document.querySelector("#select-cats-form-container"),e=u("m"),r=u("f"),n=document.createElement("form");n.setAttribute("aria-labelledby","select-cats-header"),n.innerHTML=`
    <h2 id="select-cats-header">Select cats</h2>
    <fieldset >
      <legend>Male Cats</legend>
      ${e.map($).join("")}
    </fieldset>
    <fieldset >
      <legend>Female Cats</legend>
      ${r.map($).join("")}
    </fieldset>
  `,t.replaceChildren(n),n.addEventListener("change",q)}function w(t){t.target.dataset.removeCatId&&(x(t.target.dataset.removeCatId),b(),p(),h())}const A=({name:t,gender:e,traits:r,id:n})=>{const[a,o,i,s,m,c,l]=r;return`
    <li class="current-cat">
      <h3>${t}</h3>
      <ul>
        <li>Gender: ${e==="m"?"Male":"Female"}</li>
        <li>Body type: ${a}</li>
        <li>Body Size: ${o}</li>
        <li>Head Shape: ${i}</li>
        <li>Ears: ${s}</li>
        <li>Nose: ${m}</li>
        <li>Eyes: ${c}</li>
        <li>Eye Color: ${l}</li>
      </ul>
      <button data-remove-cat-id=${n}>Remove</button>
    </li>
  `};function b(){const t=document.querySelector("#current-cats-container"),e=d(),r=document.createElement("ul");r.id="current-cats-list",r.innerHTML=e.map(A).join(""),r.addEventListener("click",w),t.replaceChildren(r)}const j=t=>{if(t.includes("pale"))return 1;if(t.includes("medium"))return 2;if(t.includes("deep"))return 3},R=t=>{const e=t.toLowerCase().trim().split(`
`);return e.map((r,n)=>{if(n===e.length-1)return j(r);const a=r.match(/\((\d+)\)/);return parseInt(a[1])})};function P(t){t.preventDefault();const e=new FormData(t.target),r=Object.fromEntries(e);r.traits=R(r.traits),r.isTestable=!1,S(r),t.target.reset(),b(),p()}const z=`Copy this formatted text from the cat!

Body type: semi-foreign (15)
Body size: medium (13)
Head shape: rounded wedge (11)
Ears: medium size straight (6)
Nose: medium length (15)
Eyes: oval (12)
Eye color: medium grey-green`;function B(){const t=document.querySelector("#add-cat-form-container"),e=document.createElement("form");e.setAttribute("aria-labelledby","add-cat-header"),e.innerHTML=`
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
        <textarea id="traits" name="traits" placeholder="${z}" required></textarea>
      </div>
      <button>Save</button>
    </form>
  `,t.append(e),e.addEventListener("submit",P)}const D=()=>{document.querySelector("#app").innerHTML=`
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
  `},k=()=>{D(),B(),b(),p(),h()};k();
