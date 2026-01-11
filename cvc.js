let selectedCvColor="#f1f5f9";function setCVTheme(e,t){selectedCvColor=e,document.querySelectorAll(".color-swatch").forEach(e=>e.classList.remove("active")),t&&t.classList&&t.classList.add("active")}function showCvDemo(){var e=document.getElementById("cvDemoBox");e&&(e.style.display="flex")}function hideCvDemo(){var e=document.getElementById("cvDemoBox");e&&(e.style.display="none")}function openCvModalV3(){"function"==typeof setActiveMode&&setActiveMode("mode-cv-builder-v3");var e=document.getElementById("cvModalV3");e&&(e.style.display="flex",document.body.style.overflow="hidden")}function closeCvModalV3(){var e=document.getElementById("cvModalV3");e&&(e.style.display="none",document.body.style.overflow="auto")}function addV3Input(e,t,i){let a=document.getElementById(e);if(a.children.length<i){let l=document.createElement("div");l.className="multi-input-box",l.innerHTML=`<input class="${t}" type="text" style="width:100%"/><button class="remove-inp" onclick="this.parentElement.remove()">×</button>`,a.appendChild(l)}else"function"==typeof showAlert&&showAlert("Maximum "+i+" items allowed.")}function addV3Area(e,t,i){let a=document.getElementById(e);if(a.children.length<i){let l=document.createElement("div");l.className="multi-input-box",l.innerHTML=`<textarea class="${t}" style="width:100%"></textarea><button class="remove-inp" onclick="this.parentElement.remove()">×</button>`,a.appendChild(l)}else"function"==typeof showAlert&&showAlert("Maximum "+i+" items allowed.")}function addV3Education(){let e=document.getElementById("v3-wrap-edu");if(e.children.length<10){let t=document.createElement("div");t.className="edu-pair-box",t.innerHTML=`
            <div class="edu-pair-inputs">
                <input class="v3-edu-main" value="Year | Degree | Institution | CGPA" type="text"/>
                <textarea class="v3-edu-desc" placeholder="Education Description/Details"></textarea>
            </div>
            <button class="remove-inp-pair" onclick="this.parentElement.remove()">×</button>
        `,e.appendChild(t)}else"function"==typeof showAlert&&showAlert("Maximum 10 Education items allowed.")}function getV3Vals(e){return Array.from(document.querySelectorAll("."+e)).map(e=>e.value).filter(e=>""!==e.trim())}async function buildV3CV(){let e=document.getElementById("v3-name").value;if(!e){"function"==typeof showAlert&&showAlert("Please enter your name!");return}let t=document.getElementById("cv3-down-btn"),i=t.innerHTML;t.disabled=!0,t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Rendering PDF...';let a=getV3Vals("v3-phone"),l=getV3Vals("v3-email"),n=getV3Vals("v3-title"),d=getV3Vals("v3-summary"),s=getV3Vals("v3-exp"),o=getV3Vals("v3-skill"),c=getV3Vals("v3-lang"),r=getV3Vals("v3-ach"),v=getV3Vals("v3-ref"),p="";[{id:"v3-linkedin",chk:"chk-v3-linkedin",icon:"fa-brands fa-linkedin"},{id:"v3-github",chk:"chk-v3-github",icon:"fa-brands fa-github"},{id:"v3-facebook",chk:"chk-v3-facebook",icon:"fa-brands fa-facebook"},{id:"v3-whatsapp",chk:"chk-v3-whatsapp",icon:"fa-brands fa-whatsapp"},{id:"v3-twitter",chk:"chk-v3-twitter",icon:"fa-brands fa-x-twitter"},{id:"v3-instagram",chk:"chk-v3-instagram",icon:"fa-brands fa-instagram"}].forEach(e=>{let t=document.getElementById(e.id).value.trim(),i=document.getElementById(e.chk).checked;i&&t&&(p+=`<div class="pdf-contact-icon"><i class="${e.icon}"></i> ${t}</div>`)});let f=p?`<div class="pdf-section-head"><i class="fa-solid fa-share-nodes"></i> Social Profiles</div>${p}`:"",m=document.querySelectorAll(".v3-edu-main"),u=document.querySelectorAll(".v3-edu-desc"),g="";for(let h=0;h<m.length;h++)m[h].value.trim()&&(g+=`<li><strong>${m[h].value}</strong>${u[h].value?`<p style="margin:2px 0 0; font-size:11px; color:#475569;">${u[h].value}</p>`:""}</li>`);let y=`
    <div class="cv-page" style="font-family: 'Inter', sans-serif !important; height: 296mm; position: relative; overflow: hidden; display: flex; box-sizing: border-box; background: #fff;">
        <div class="cv-row" style="display: flex; width: 100%; height: 100%;">
            <!-- Sidebar (33%) -->
            <div class="cv-side" style="background-color: ${selectedCvColor} !important; width: 33% !important; padding: 35px 20px !important; height: 100% !important; display: flex; flex-direction: column; box-sizing: border-box;">
                <div id="v3-photo-box" style="display:flex; justify-content:center;"></div>
                
                <div class="pdf-section-head"><i class="fa-solid fa-address-book"></i> Contact & Address</div>
                ${a.map(e=>`<div class="pdf-contact-icon"><i class="fa-solid fa-phone"></i> ${e}</div>`).join("")}
                ${l.map(e=>`<div class="pdf-contact-icon"><i class="fa-solid fa-envelope"></i> ${e}</div>`).join("")}
                
                <div class="pdf-contact-icon" style="display:block; margin-bottom:10px;">
                    <i class="fa-solid fa-location-dot"></i> <b>Present Address:</b><br/>
                    <span style="display:block; padding-left:20px; word-wrap: break-word;">${document.getElementById("v3-addr-pre").value}</span>
                </div>
                <div class="pdf-contact-icon" style="display:block; margin-bottom:15px;">
                    <i class="fa-solid fa-house"></i> <b>Permanent Address:</b><br/>
                    <span style="display:block; padding-left:20px; word-wrap: break-word;">${document.getElementById("v3-addr-per").value}</span>
                </div>

                ${f}

                <div class="pdf-section-head"><i class="fa-solid fa-user"></i> Identity</div>
                <div class="pdf-contact-icon"><b>Born:</b> ${document.getElementById("v3-dob").value}</div>
                <div class="pdf-contact-icon"><b>Gender:</b> ${document.getElementById("v3-gender").value}</div>
                <div class="pdf-contact-icon"><b>Nation:</b> ${document.getElementById("v3-nation").value}</div>
                <div class="pdf-contact-icon"><b>Religion:</b> ${document.getElementById("v3-religion").value}</div>
                <div class="pdf-contact-icon"><b>H/W:</b> ${document.getElementById("v3-height").value} / ${document.getElementById("v3-weight").value}</div>
                <div class="pdf-contact-icon"><b>Blood Group:</b> ${document.getElementById("v3-blood").value}</div>
                <div class="pdf-contact-icon"><b>Status:</b> ${document.getElementById("v3-marital").value}</div>
                
                ${document.getElementById("chk-v3-nid").checked&&document.getElementById("v3-nid").value?`<div class="pdf-contact-icon"><b>NID No:</b> ${document.getElementById("v3-nid").value}</div>`:""}
                ${document.getElementById("chk-v3-pass").checked&&document.getElementById("v3-pass").value?`<div class="pdf-contact-icon"><b>Passport No:</b> ${document.getElementById("v3-pass").value}</div>`:""}
                
                <div class="pdf-contact-icon"><b>Father:</b> ${document.getElementById("v3-father").value}</div>
                <div class="pdf-contact-icon"><b>Mother:</b> ${document.getElementById("v3-mother").value}</div>

                ${document.getElementById("chk-v3-skill").checked&&o.length?`
                    <div class="pdf-section-head"><i class="fa-solid fa-bolt"></i> Skills</div>
                    <ul class="pdf-item-list">${o.map(e=>`<li>${e}</li>`).join("")}</ul>
                `:""}

                ${document.getElementById("chk-v3-lang").checked&&c.length?`
                    <div class="pdf-section-head"><i class="fa-solid fa-language"></i> Languages</div>
                    <ul class="pdf-item-list">${c.map(e=>`<li>${e}</li>`).join("")}</ul>
                `:""}
            </div>

            <!-- Main Content (67%) -->
            <div class="cv-main" style="width: 67% !important; padding: 40px 30px !important; display: flex; flex-direction: column; height: 100% !important; box-sizing: border-box;">
                <h1 class="pdf-name">${e}</h1>
                <div class="pdf-title-sub">${n.join(" • ")}</div>

                ${document.getElementById("chk-v3-sum").checked&&d.length?`
                    <div class="pdf-section-head"><i class="fa-solid fa-quote-left"></i> Summary</div>
                    ${d.map(e=>`<p style="font-size:12px; margin-bottom:8px; text-align:justify; line-height:1.6;">${e}</p>`).join("")}
                `:""}

                ${document.getElementById("chk-v3-exp").checked&&s.length?`
                    <div class="pdf-section-head"><i class="fa-solid fa-briefcase"></i> Experience</div>
                    <ul class="pdf-item-list">${s.map(e=>`<li>${e}</li>`).join("")}</ul>
                `:""}

                ${document.getElementById("chk-v3-edu").checked&&g?`
                    <div class="pdf-section-head"><i class="fa-solid fa-graduation-cap"></i> Education</div>
                    <ul class="pdf-item-list" style="list-style:none; margin-left:0;">${g}</ul>
                `:""}

                ${document.getElementById("chk-v3-ach").checked&&r.length?`
                    <div class="pdf-section-head"><i class="fa-solid fa-award"></i> Projects & Awards</div>
                    <ul class="pdf-item-list">${r.map(e=>`<li>${e}</li>`).join("")}</ul>
                `:""}
                
                <div class="pdf-section-head"><i class="fa-solid fa-user-tag"></i> Self Description</div>
                <p style="font-size:11px; line-height:1.6; color:#475569; margin-bottom:20px;">${document.getElementById("v3-self-desc").value}</p>

                ${document.getElementById("chk-v3-ref").checked&&v.length?`
                    <div class="pdf-section-head"><i class="fa-solid fa-handshake"></i> References</div>
                    <ul class="pdf-item-list" style="list-style:none; margin-left:0;">${v.map(e=>`<li>${e}</li>`).join("")}</ul>
                `:""}

                <div class="pdf-signature" style="margin-top: auto; align-self: flex-end; border-top: 1.5px solid #475569; width: 160px; text-align: center; font-size: 12px; padding-top: 8px; font-weight: 700; color: #1e293b; margin-bottom: 20px;">Signature</div>
            </div>
        </div>
        <div class="pdf-footer-credit" style="position: absolute; bottom: 4mm; left: 0; width: 100%; text-align: center; font-size: 8px; color: #cbd5e1; padding-top: 5px; border-top: 1px solid #f1f5f9;">Generated by: ID Card Scanner Pro - www.idcardscannerpro.com</div>
    </div>`,b=document.getElementById("cv3-render-area");b.innerHTML=y;let x=document.getElementById("v3-photo").files[0];if(x){let E=new FileReader;E.onload=function(a){let l=document.createElement("img");l.src=a.target.result,l.style.cssText="width: 35mm; height: 45mm; border-radius: 4px; border: 2px solid #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin-bottom: 20px; object-fit: cover;";let n=document.getElementById("v3-photo-box");n&&(n.innerHTML="",n.appendChild(l)),executeFinalV3Download(e,t,b,i)},E.readAsDataURL(x)}else executeFinalV3Download(e,t,b,i)}function executeFinalV3Download(e,t,i,a){let l=document.querySelector(".cv-page"),n={margin:0,filename:e.replace(/\s+/g,"_")+"_CV.pdf",image:{type:"jpeg",quality:1},html2canvas:{scale:3,useCORS:!0,letterRendering:!0,scrollY:0},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"}};html2pdf().set(n).from(l).save().then(()=>{t.disabled=!1,t.innerHTML=a,i.innerHTML=""}).catch(e=>{console.error(e),t.disabled=!1,t.innerHTML="Error! Try Again"})}document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("v3-photo"),t=document.getElementById("v3-img-preview"),i=document.getElementById("photo-status"),a=document.querySelector(".photo-upload-box i");e&&e.addEventListener("change",function(e){var l=e.target.files[0];if(l){var n=new FileReader;n.onload=function(e){t&&(t.src=e.target.result,t.style.display="block"),i&&(i.style.display="none"),a&&(a.style.display="none")},n.readAsDataURL(l)}})});
