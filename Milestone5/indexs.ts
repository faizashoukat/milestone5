

const form = document.getElementById('resume-form') as HTMLFormElement;
const resumedisplayelement = document.getElementById('resume-display') as HTMLDivElement;
const resumeshareablelink = document.getElementById('resume-shareable-link') as HTMLDivElement;
const shareablelink = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadresume = document.getElementById('download-link') as HTMLButtonElement;

//Handle Form Submissiom

form.addEventListener('submit', (event:Event) => {
    event.preventDefault();

// Collect Input Data
const username = (document.getElementById('username') as HTMLInputElement).value
    const name = (document.getElementById('name') as HTMLInputElement).value
    const fathername = (document.getElementById('fathername') as HTMLInputElement).value
    const email = (document.getElementById('email') as HTMLInputElement).value
    const phoneNo = (document.getElementById('phoneNo') as HTMLInputElement).value
    const education = (document.getElementById('education') as HTMLTextAreaElement).value
    const skills = (document.getElementById('skills') as HTMLInputElement).value
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value

    //save resume data in local storage
    const data={
        name,
        fathername,
        email,
        phoneNo,
        education,
        skills,
        experience
    };
    localStorage.setItem(username,JSON.stringify(data));

    // Generate Resume Dynamically
const resumeHTML=`
<h1>Editable Resume</h1>
<h2>Personal Information</h2>
<p><b>Name :</b><span contenteditable="true">${name}</span></p>
<p><b>Father Name :</b><span contenteditable="true">${fathername}</span></p>
<p><b>Email :</b><span contenteditable="true">${email}</span></p>
<p><b>Phone No :</b><span contenteditable="true">${phoneNo}</span></p><br>

<h2>Education</h2>
<p contenteditable="true">${education}</p><br>

<h2>Skills<h2>
<h4 contenteditable="true">${skills}</h4><br>

<h2>Work Experience</h2>
<p contenteditable="true">${experience}</p>`;

// Display Generted resume

    resumedisplayelement.innerHTML = resumeHTML;

//Generate Shareable URL with username
    const resumeshareableURL=`${window.location.origin}?username=${encodeURIComponent(username)}`;

    //display shareable link
    resumeshareablelink.style.display="block";
    shareablelink.href=resumeshareableURL;
    shareablelink.textContent=resumeshareableURL;

});

// download Resume As PDF
downloadresume.addEventListener('click', ()=>{

    window.print();
});

//Prefill the form based on username

window.addEventListener('DOMcontentloaded',()=>{
    const URLinfo = new URLSearchParams(window.location.search);
    const username = URLinfo.get('username');

    if(username)
    {
        //Autofill the form if data found in local storage
        
       const  userdatasave = localStorage.getItem(username);

       if(userdatasave){
        
        const data = JSON.parse(userdatasave);
        (document.getElementById('username') as HTMLInputElement).value=username;
        (document.getElementById('name') as HTMLInputElement).value= data.name;
        (document.getElementById('fathername') as HTMLInputElement).value=data.fathername;
        (document.getElementById('email') as HTMLInputElement).value=data.email;
        (document.getElementById('PhoneNo') as HTMLInputElement).value=data.phoneNo;
        (document.getElementById('education') as HTMLTextAreaElement).value=data.education;
        (document.getElementById('skills') as HTMLTextAreaElement).value=data.skills;
        (document.getElementById('experience') as HTMLTextAreaElement).value=data.experience;
        
       }
    }
    });