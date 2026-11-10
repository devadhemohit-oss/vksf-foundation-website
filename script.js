const communities = [
 ["World Peace & Human Unity","Promoting harmony, mutual respect and unity among people."],
 ["Tree Conservation & Green India","Encouraging tree plantation, protection and greener neighbourhoods."],
 ["Clean India & Plastic-Free Earth","Supporting cleanliness drives and reducing single-use plastic."],
 ["Humanity First & Emergency Support","Bringing compassionate help to people facing difficult situations."],
 ["Crime Prevention & Citizen Safety","Building awareness about public safety and responsible citizenship."],
 ["Women Empowerment","Supporting dignity, equal opportunity, confidence and participation."],
 ["Education Rights & Digital Literacy","Encouraging access to learning and essential digital skills."],
 ["Water Conservation","Promoting responsible water use and conservation awareness."],
 ["Cyber Safety","Sharing awareness about online safety, fraud prevention and privacy."],
 ["Youth Skills & Employment","Encouraging practical skills, career awareness and opportunities."],
 ["Wildlife Protection","Building awareness about wildlife and habitat conservation."],
 ["Farmers' Welfare","Supporting awareness and community initiatives for farming communities."],
 ["Senior Citizens Support","Promoting respect, inclusion and assistance for older people."],
 ["Anti-Corruption Awareness","Encouraging transparency, integrity and civic responsibility."],
 ["Hunger Relief & Food Support","Supporting food-sharing initiatives and hunger-relief efforts."],
 ["Global Health Awareness","Promoting health education and access to reliable information."],
 ["Cultural Friendship & Unity","Celebrating cultural understanding and respectful exchange."],
 ["Sustainable Living","Encouraging thoughtful consumption and eco-friendly habits."],
 ["Divorced Women Support","Promoting dignity, confidence and social support."],
 ["Children & Parents Welfare","Encouraging child wellbeing and positive family support."],
 ["Schools, Colleges & NGO Collaboration","Connecting institutions and organisations for social initiatives."],
 ["Public Representatives & Social Development","Encouraging constructive civic participation for local development."],
 ["Teachers & Professors Network","Recognising educators and supporting learning initiatives."],
 ["Road Safety & Responsible Driving","Promoting safer roads and awareness for all road users."],
 ["Disaster Relief & Community Resilience","Encouraging preparedness, coordination and support during emergencies."]
];
const grid = document.getElementById('communityGrid');
communities.forEach((item,i)=>{
  const card=document.createElement('article'); card.className='community-card';
  card.innerHTML=`<span class="number">COMMUNITY ${(i+1).toString().padStart(2,'0')}</span><h3>${item[0]}</h3><p>${item[1]}</p>`;
  grid.appendChild(card);
});
document.getElementById('year').textContent=new Date().getFullYear();
const toggle=document.querySelector('.menu-toggle'), nav=document.querySelector('.nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const officialEmail=''; // Add the foundation's verified email address here before launch.
  if(!officialEmail){document.getElementById('formMessage').textContent='Contact form is a demo. Add the foundation email in script.js to enable email preparation.';return;}
  const d=new FormData(e.target);
  const subject=encodeURIComponent('VKSF Website Enquiry - '+d.get('interest'));
  const body=encodeURIComponent('Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nInterest: '+d.get('interest')+'\n\n'+d.get('message'));
  window.location.href=`mailto:${officialEmail}?subject=${subject}&body=${body}`;
});
