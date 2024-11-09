document.addEventListener('DOMContentLoaded' , ()=>{
    const toggleButton = document.getElementById("toggle-skills") as HTMLButtonElement;
    const skillsSection = document.getElementById("Skills") as HTMLElement;
      toggleButton.addEventListener('click',()=>{
        if (skillsSection.style.display === 'none'){
          skillsSection.style.display = 'block';
        } else {
          skillsSection.style.display = 'none';
        }
})});