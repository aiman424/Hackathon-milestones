document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeDisplayElement = document.getElementById('resume-display');
    // Handle Foem Submission
    form.addEventListener('submit', function (Event) {
        Event.preventDefault(); // Prevent Page Reload
        // Collect Input Valus
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('Education').value;
        var experience = document.getElementById('Experience').value;
        var skills = document.getElementById('Skills').value;
        // Generate The Resume Content Dynamically
        var resumeHTML = "\n        <h2><b>Editable Resume</b></h2>\n        <h3><b>Personal Information</b></h3>\n        <p><b>Name:</b><span contenteditable=\"true\">".concat(name, "</span></p>\n        <p><b>Email:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><b>Phone:</b><span contenteditable=\"true\">").concat(phone, "</span></p>\n\n        <h3><b>Education</b></h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n\n        <h3><b>Experience</b></h3>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n\n        <h3><b>Skills</b></h3>\n        <p contenteditable=\"true\">").concat(skills, "</p>");
        // Display The Generated Resume
        if (resumeDisplayElement) {
            resumeDisplayElement.innerHTML = resumeHTML;
        }
        else {
            console.log('The Resume Element Is Missing.');
        }
    });
});
