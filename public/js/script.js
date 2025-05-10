// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//admin script 
let deletbtn11 = document.getElementById("deletbtn");
function EditBtn() {
  let deleteButtons = document.querySelectorAll("#deletbtn");
  deleteButtons.forEach(button => {
    button.hidden = false;
  });
}

//show script
let onrender = document.getElementById("onrender");
let form = document.getElementById("forshowafterrenderbtnclick");
let hideNewlistbtn = document.getElementById("HidetheAddlistForm");
let cancelButton = document.getElementById("cancelButton");
let ForshowtheToosl = document.getElementById("ForshowtheToosl");
let deletebuttonofsublist = document.getElementById("deletebuttonofsublist");
let editbuttinforSublisting = document.getElementById("editbuttinforSublisting");
let gobackbutton = document.getElementById("gobackbutton");

onrender.addEventListener("click", () => {
  form.style.display = "inline";
  hideNewlistbtn.style.display = "inline";
  onrender.style.display = "none";
  ForshowtheToosl.style.display = "none";
  gobackbutton.style.display = "none";
  editbuttinforSublisting.style.display = "none";
});

cancelButton.addEventListener("click", () => {
  form.style.display = "none";
  hideNewlistbtn.style.display = "none";
  onrender.style.display = "inline";
  ForshowtheToosl.style.display = "inline";
})

editbuttinforSublisting.addEventListener("click", () => {
  document.querySelectorAll("#deletebuttonofsublist").forEach(button => button.style.display = "inline");
  document.querySelectorAll("#editbtnofsublisting").forEach(button => button.style.display = "inline");
});



