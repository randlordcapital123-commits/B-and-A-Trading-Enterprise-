const KEY="abTradingEnterpriseOfflineV1";
const defaults={
 password:"admin123",
 business:{name:"A & B Trading Enterprise",contact:"+27662744119",whatsapp:"+27662744119",address:"97 Joubert St, eMakhazeni, 1100",heroTitle:"Professional Accommodation for Power Stations, Mines & Contract Teams",heroText:"Comfortable, reliable accommodation solutions designed for workforces and contractors in demanding environments.",aboutText:"A & B Trading Enterprise provides accommodation solutions for teams working at power stations, mines and contract sites. We focus on comfort, convenience and dependable service.",logo:"",hero:""},
 services:[
  {id:"s1",name:"Workforce Accommodation",price:"Contact us for pricing",description:"Comfortable accommodation arrangements for employees and contract teams.",image:"https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=80"},
  {id:"s2",name:"Contract Team Accommodation",price:"Custom quotation",description:"Flexible accommodation solutions for short-term and long-term contract projects.",image:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80"},
  {id:"s3",name:"Mine & Power Station Stays",price:"Contact for availability",description:"Convenient accommodation support for teams working near industrial and project locations.",image:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80"}
 ],
 gallery:[
 "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
 "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
 "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
 "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
 ]};
let data=JSON.parse(localStorage.getItem(KEY)||"null")||structuredClone(defaults);
let uploadBuffers={logo:null,hero:null,serviceImage:null,galleryImage:null};
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function save(){try{localStorage.setItem(KEY,JSON.stringify(data));}catch(e){alert("Storage is full. Large images can exceed browser Local Storage limits. Use smaller/compressed images.");}}
function wa(text){return `https://wa.me/${data.business.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(text)}`;}
function render(){
 const b=data.business;
 $("#navName").textContent=b.name;$("#footerName").textContent=b.name;
 $("#heroTitle").textContent=b.heroTitle;$("#heroText").textContent=b.heroText;$("#aboutText").textContent=b.aboutText;
 $("#addressText").textContent=b.address;$("#contactText").textContent=b.contact;
 $("#heroWhatsApp").href=wa("Hello, I would like to enquire about accommodation.");$("#contactWhatsApp").href=wa("Hello, I would like to enquire about accommodation.");
 ["#heroCall","#contactCall"].forEach(x=>$(x).href="tel:"+b.contact.replace(/\s/g,""));
 $("#contactCall").textContent="Call "+b.contact;
 $(".hero").style.backgroundImage=b.hero?`url("${b.hero}")`:`url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85")`;
 if(b.logo){$("#navLogo").src=b.logo;$("#navLogo").style.display="block";}else $("#navLogo").style.display="none";
 $("#servicesGrid").innerHTML=data.services.length?data.services.map(s=>`<article class="service-card"><img src="${s.image}" alt="${s.name}"><div class="content"><h3>${s.name}</h3><div class="price">${s.price}</div><p>${s.description}</p><a class="btn primary" target="_blank" href="${wa(`Hello, I would like to enquire about ${s.name}.`)}">WhatsApp Enquiry</a></div></article>`).join(""):`<div class="empty">No services added yet.</div>`;
 $("#galleryGrid").innerHTML=data.gallery.length?data.gallery.map(i=>`<img src="${i}" alt="A & B Trading Enterprise accommodation">`).join(""):`<div class="empty">No gallery pictures yet.</div>`;
 renderAdminLists();save();
}
function renderAdminLists(){
 $("#servicesAdminList").innerHTML=data.services.map(s=>`<div class="admin-item"><img src="${s.image}"><div class="info"><strong>${s.name}</strong><br><small>${s.price}</small></div><button class="mini-btn" onclick="editService('${s.id}')">Edit</button><button class="danger-btn" onclick="deleteService('${s.id}')">Delete</button></div>`).join("")||'<div class="empty">No services.</div>';
 $("#galleryAdminList").innerHTML=data.gallery.map((g,i)=>`<div class="admin-item"><img src="${g}"><div class="info"><strong>Gallery picture ${i+1}</strong></div><button class="danger-btn" onclick="deleteGallery(${i})">Delete</button></div>`).join("")||'<div class="empty">No gallery pictures.</div>';
}
window.deleteService=id=>{if(confirm("Delete this service?")){data.services=data.services.filter(s=>s.id!==id);render();}};
window.deleteGallery=i=>{if(confirm("Delete this picture?")){data.gallery.splice(i,1);render();}};
window.editService=id=>{const s=data.services.find(x=>x.id===id);$("#serviceEditId").value=id;$("#serviceName").value=s.name;$("#servicePrice").value=s.price;$("#serviceDescription").value=s.description;uploadBuffers.serviceImage=s.image;document.querySelector('[data-tab="servicesAdmin"]').click();};

$("#menuBtn").onclick=()=>$("#mainNav").classList.toggle("open");
$$("#mainNav a").forEach(a=>a.onclick=()=>$("#mainNav").classList.remove("open"));
$("#adminNav").onclick=()=>$("#adminModal").classList.remove("hidden");$("#closeAdmin").onclick=()=>$("#adminModal").classList.add("hidden");
$("#loginBtn").onclick=()=>{if($("#adminPassword").value===data.password){$("#loginView").classList.add("hidden");$("#dashboardView").classList.remove("hidden");fillBusiness();}else alert("Incorrect password.");};
$("#logoutBtn").onclick=()=>{$("#dashboardView").classList.add("hidden");$("#loginView").classList.remove("hidden");$("#adminPassword").value="";};
function fillBusiness(){const b=data.business;$("#bizName").value=b.name;$("#bizContact").value=b.contact;$("#bizWhatsApp").value=b.whatsapp;$("#bizAddress").value=b.address;$("#bizHeroTitle").value=b.heroTitle;$("#bizHeroText").value=b.heroText;$("#bizAboutText").value=b.aboutText;}
$$(".tab").forEach(t=>t.onclick=()=>{$$(".tab").forEach(x=>x.classList.remove("active"));$$(".tab-panel").forEach(x=>x.classList.remove("active"));t.classList.add("active");$("#"+t.dataset.tab).classList.add("active");});
function imageToData(file,callback){if(!file||!file.type.startsWith("image/"))return;const r=new FileReader();r.onload=()=>callback(r.result);r.readAsDataURL(file);}
$$(".drop-zone").forEach(zone=>{
 const type=zone.dataset.upload,input=zone.querySelector("input");
 const use=file=>imageToData(file,d=>{uploadBuffers[type]=d;zone.classList.add("drag");zone.firstChild.textContent="Image ready ✓ ";});
 input.onchange=e=>use(e.target.files[0]);
 ["dragenter","dragover"].forEach(ev=>zone.addEventListener(ev,e=>{e.preventDefault();zone.classList.add("drag");}));
 ["dragleave","drop"].forEach(ev=>zone.addEventListener(ev,e=>{e.preventDefault();zone.classList.remove("drag");}));
 zone.addEventListener("drop",e=>use(e.dataTransfer.files[0]));
});
$("#saveBusiness").onclick=()=>{Object.assign(data.business,{name:$("#bizName").value.trim()||defaults.business.name,contact:$("#bizContact").value.trim(),whatsapp:$("#bizWhatsApp").value.trim(),address:$("#bizAddress").value.trim(),heroTitle:$("#bizHeroTitle").value.trim(),heroText:$("#bizHeroText").value.trim(),aboutText:$("#bizAboutText").value.trim()});if(uploadBuffers.logo)data.business.logo=uploadBuffers.logo;if(uploadBuffers.hero)data.business.hero=uploadBuffers.hero;render();alert("Business information saved on this device.");};
$("#saveService").onclick=()=>{const name=$("#serviceName").value.trim();if(!name)return alert("Enter a service name.");const id=$("#serviceEditId").value||("s"+Date.now());const existing=data.services.find(s=>s.id===id);const service={id,name,price:$("#servicePrice").value.trim()||"Contact us for pricing",description:$("#serviceDescription").value.trim(),image:uploadBuffers.serviceImage||(existing&&existing.image)||""};if(existing)Object.assign(existing,service);else data.services.push(service);$("#serviceEditId").value="";$("#serviceName").value="";$("#servicePrice").value="";$("#serviceDescription").value="";uploadBuffers.serviceImage=null;render();alert("Service saved.");};
$("#addGallery").onclick=()=>{if(!uploadBuffers.galleryImage)return alert("Choose a gallery image first.");data.gallery.push(uploadBuffers.galleryImage);uploadBuffers.galleryImage=null;render();alert("Gallery image added.");};
$("#changePassword").onclick=()=>{const p=$("#newPassword").value;if(p.length<4)return alert("Use at least 4 characters.");data.password=p;save();$("#newPassword").value="";alert("Password changed.");};
$("#resetSite").onclick=()=>{if(confirm("This will remove all locally saved content and restore defaults.")){localStorage.removeItem(KEY);data=structuredClone(defaults);uploadBuffers={logo:null,hero:null,serviceImage:null,galleryImage:null};render();alert("Website reset.");}};
$("#year").textContent=new Date().getFullYear();
render();