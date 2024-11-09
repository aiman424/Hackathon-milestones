var form = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById("resume-display");
var shareableLinkContainer = document.getElementById("Shareaable-link-container");
var shareableLinkElement = document.getElementById("Shareable-link");
var downloadPdfButton = document.getElementById("download-pdf");
// Variable to store the image data URL
var pictureBase64 = null;
// Handle Form Submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent Page Reload
    // Collect Input Values
    var uname = document.getElementById("Username").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("Education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    // Save Form Data In Local Storage with username as key
    var resumeData = {
        picture: pictureBase64, // Use base64 string for the picture
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(uname, JSON.stringify(resumeData)); // saving data locally
    // Generate The Resume Content Dynamically
    var resumeHTML = "\n        <h2><b>Editable Resume</b></h2>\n        <h3><b>Personal Information</b></h3>\n        <p><b>Picture:</b><img src=\"".concat(pictureBase64, "\" alt=\"Profile Picture\" style=\"width: 100px; height: 100px; border-radius: 50%;\" /></p>\n        <p><b>Username:</b><span contenteditable=\"true\">").concat(uname, "</span></p>\n        <p><b>Email:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><b>Phone:</b><span contenteditable=\"true\">").concat(phone, "</span></p>\n\n        <h3><b>Education</b></h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n\n        <h3><b>Experience</b></h3>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n\n        <h3><b>Skills</b></h3>\n        <p contenteditable=\"true\">").concat(skills, "</p>");
    // Display The Generated Resume
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
    }
    else {
        console.log("The Resume Element Is Missing.");
    }
    // Shareable link Generated URL with The Username only
    var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(encodeURIComponent(uname));
    // Display The Shareable Link
    shareableLinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle picture upload
var pictureInput = document.getElementById("picture");
pictureInput.addEventListener("change", function () {
    var _a;
    var file = (_a = pictureInput.files) === null || _a === void 0 ? void 0 : _a[0]; // Get the selected file
    if (file) {
        var reader_1 = new FileReader();
        reader_1.onloadend = function () {
            pictureBase64 = reader_1.result; // Convert image to a base64 data URL
        };
        reader_1.readAsDataURL(file);
    }
});
// Handle PDF Download
downloadPdfButton.addEventListener("click", function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill The Form Based On The Username In The URL
var URLparams = new URLSearchParams(window.location.search);
var username = URLparams.get("username");
if (username) {
    // Auto Fill Form if data is found in local storage
    var savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
        var resumeData = JSON.parse(savedResumeData);
        document.getElementById("Username").value = username;
        document.getElementById("email").value = resumeData.email;
        document.getElementById("phone").value = resumeData.phone;
        document.getElementById("Education").value = resumeData.education;
        document.getElementById("experience").value = resumeData.experience;
        document.getElementById("skills").value = resumeData.skills;
        // If there's a picture saved in localStorage, set the picture
        if (resumeData.picture) {
            var imgPreview = document.createElement("img");
            imgPreview.src = resumeData.picture;
            imgPreview.style.width = "100px";
            imgPreview.style.height = "100px";
            imgPreview.style.borderRadius = "50%";
            resumeDisplayElement.appendChild(imgPreview); // Show picture in resume display
        }
    }
}
