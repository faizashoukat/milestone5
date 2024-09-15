var form = document.getElementById('resume-form');
var resumedisplayelement = document.getElementById('resume-display');
var resumeshareablelink = document.getElementById('resume-shareable-link');
var shareablelink = document.getElementById('shareable-link');
var downloadresume = document.getElementById('download-link');
//Handle Form Submissiom
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Collect Input Data
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var fathername = document.getElementById('fathername').value;
    var email = document.getElementById('email').value;
    var phoneNo = document.getElementById('phoneNo').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value;
    var experience = document.getElementById('experience').value;
    //save resume data in local storage
    var data = {
        name: name,
        fathername: fathername,
        email: email,
        phoneNo: phoneNo,
        education: education,
        skills: skills,
        experience: experience
    };
    localStorage.setItem(username, JSON.stringify(data));
    // Generate Resume Dynamically
    var resumeHTML = "\n<h1>Editable Resume</h1>\n<h2>Personal Information</h2>\n<p><b>Name :</b><span contenteditable=\"true\">".concat(name, "</span></p>\n<p><b>Father Name :</b><span contenteditable=\"true\">").concat(fathername, "</span></p>\n<p><b>Email :</b><span contenteditable=\"true\">").concat(email, "</span></p>\n<p><b>Phone No :</b><span contenteditable=\"true\">").concat(phoneNo, "</span></p><br>\n\n<h2>Education</h2>\n<p contenteditable=\"true\">").concat(education, "</p><br>\n\n<h2>Skills<h2>\n<h4 contenteditable=\"true\">").concat(skills, "</h4><br>\n\n<h2>Work Experience</h2>\n<p contenteditable=\"true\">").concat(experience, "</p>");
    // Display Generted resume
    resumedisplayelement.innerHTML = resumeHTML;
    //Generate Shareable URL with username
    var resumeshareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    //display shareable link
    resumeshareablelink.style.display = "block";
    shareablelink.href = resumeshareableURL;
    shareablelink.textContent = resumeshareableURL;
});
// download Resume As PDF
downloadresume.addEventListener('click', function () {
    window.print();
});
//Prefill the form based on username
window.addEventListener('DOMcontentloaded', function () {
    var URLinfo = new URLSearchParams(window.location.search);
    var username = URLinfo.get('username');
    if (username) {
        //Autofill the form if data found in local storage
        var userdatasave = localStorage.getItem(username);
        if (userdatasave) {
            var data = JSON.parse(userdatasave);
            document.getElementById('username').value = username;
            document.getElementById('name').value = data.name;
            document.getElementById('fathername').value = data.fathername;
            document.getElementById('email').value = data.email;
            document.getElementById('PhoneNo').value = data.phoneNo;
            document.getElementById('education').value = data.education;
            document.getElementById('skills').value = data.skills;
            document.getElementById('experience').value = data.experience;
        }
    }
});
