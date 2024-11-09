// Get Refrence To The Form And Display Area
document.addEventListener('DOMContentLoaded' , ()=>{
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement; 
    // Handle Foem Submission
    form.addEventListener('submit',(Event: Event) =>{
        Event.preventDefault(); // Prevent Page Reload
        // Collect Input Valus
        const name=(document.getElementById('name') as HTMLInputElement).value 
        const email=(document.getElementById('email') as HTMLInputElement).value
        const phone=(document.getElementById('phone') as HTMLInputElement).value
        const education=(document.getElementById('Education') as HTMLInputElement).value
        const experience=(document.getElementById('Experience') as HTMLInputElement).value
        const skills=(document.getElementById('Skills') as HTMLInputElement).value

        // Generate The Resume Content Dynamically
        const resumeHTML = `
        <h2><b>Resume</b></h2>
        <h3><b>Personal Information</b></h3>
        <p><b>Name:</b>${name}</p>
        <p><b>Email:</b>${email}</p>
        <p><b>Phone:</b>${phone}</p>

        <h3><b>Education</b></h3>
        <p>${education}</p>

        <h3><b>Experience</b></h3>
        <p>${experience}</p>

        <h3><b>Skills</b></h3>
        <p>${skills}</p>`;

         // Display The Generated Resume
         if(resumeDisplayElement){
             resumeDisplayElement.innerHTML = resumeHTML;
         }else {
            console.log('The Resume Element Is Missing.')
         }
    });
});
