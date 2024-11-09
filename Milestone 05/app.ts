const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplayElement = document.getElementById("resume-display") as HTMLDivElement;
const shareableLinkContainer = document.getElementById("Shareaable-link-container") as HTMLDivElement;
const shareableLinkElement = document.getElementById("Shareable-link") as HTMLAnchorElement;
const downloadPdfButton = document.getElementById("download-pdf") as HTMLButtonElement;

// Variable to store the image data URL
let pictureBase64: string | ArrayBuffer | null = null;

// Handle Form Submission
form.addEventListener("submit", (event: Event) => {
  event.preventDefault(); // Prevent Page Reload

  // Collect Input Values
  const uname = (document.getElementById("Username") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const education = (document.getElementById("Education") as HTMLTextAreaElement).value;
  const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

  // Save Form Data In Local Storage with username as key
  const resumeData = {
    picture: pictureBase64, // Use base64 string for the picture
    email,
    phone,
    education,
    experience,
    skills,
  };
  localStorage.setItem(uname, JSON.stringify(resumeData)); // saving data locally

  // Generate The Resume Content Dynamically
  const resumeHTML = `
        <h2><b>Editable Resume</b></h2>
        <h3><b>Personal Information</b></h3>
        <p><b>Picture:</b><img src="${pictureBase64}" alt="Profile Picture" style="width: 100px; height: 100px; border-radius: 50%;" /></p>
        <p><b>Username:</b><span contenteditable="true">${uname}</span></p>
        <p><b>Email:</b><span contenteditable="true">${email}</span></p>
        <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>

        <h3><b>Education</b></h3>
        <p contenteditable="true">${education}</p>

        <h3><b>Experience</b></h3>
        <p contenteditable="true">${experience}</p>

        <h3><b>Skills</b></h3>
        <p contenteditable="true">${skills}</p>`;

  // Display The Generated Resume
  if (resumeDisplayElement) {
    resumeDisplayElement.innerHTML = resumeHTML;
  } else {
    console.log("The Resume Element Is Missing.");
  }

  // Shareable link Generated URL with The Username only
  const shareableURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(uname)}`;

  // Display The Shareable Link
  shareableLinkContainer.style.display = "block";
  shareableLinkElement.href = shareableURL;
  shareableLinkElement.textContent = shareableURL;
});

// Handle picture upload
let pictureInput = document.getElementById("picture") as HTMLInputElement;
pictureInput.addEventListener("change", () => {
  const file = pictureInput.files?.[0]; // Get the selected file

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      pictureBase64 = reader.result; // Convert image to a base64 data URL
    };
    reader.readAsDataURL(file);
  }
});

// Handle PDF Download
downloadPdfButton.addEventListener("click", () => {
  window.print(); // This will open the print dialog and allow the user to save as PDF
});

// Prefill The Form Based On The Username In The URL
const URLparams = new URLSearchParams(window.location.search);
const username = URLparams.get("username");
if (username) {
  // Auto Fill Form if data is found in local storage
  const savedResumeData = localStorage.getItem(username);
  if (savedResumeData) {
    const resumeData = JSON.parse(savedResumeData);
    (document.getElementById("Username") as HTMLInputElement).value = username;
    (document.getElementById("email") as HTMLInputElement).value = resumeData.email;
    (document.getElementById("phone") as HTMLInputElement).value = resumeData.phone;
    (document.getElementById("Education") as HTMLTextAreaElement).value = resumeData.education;
    (document.getElementById("experience") as HTMLTextAreaElement).value = resumeData.experience;
    (document.getElementById("skills") as HTMLTextAreaElement).value = resumeData.skills;

    // If there's a picture saved in localStorage, set the picture
    if (resumeData.picture) {
      const imgPreview = document.createElement("img");
      imgPreview.src = resumeData.picture;
      imgPreview.style.width = "100px";
      imgPreview.style.height = "100px";
      imgPreview.style.borderRadius = "50%";
      resumeDisplayElement.appendChild(imgPreview); // Show picture in resume display
    }
  }
}