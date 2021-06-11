const userDetails = JSON.parse(localStorage.getItem("User")) || []; //checks if the user array is empty or filled on page load

document.getElementById("login-btn").addEventListener("click", (event) => {
    event.preventDefault();
    const loginNum = document.getElementById("loginPhoneNumber").value;
    const loginPass = document.getElementById("user-password").value;
    let i;
    let userArray = userDetails.length;
    let feedback;

   if ( (loginNum !== "") && (loginPass !== "")) {
        for (i = 0; i < userArray; i++) {
            if ( userDetails[i].userPhoneNumber !== loginNum ) {
                feedback = "User Does Not Exist...!";
            }else {
                if (  userDetails[i].password !== loginPass) {
                    feedback = "Wrong phone number or password entered!";
                } else {
                    alert("Login Successful..!")
                    return window.location.href = "../pages/user.html";
                }
            }
        }
   } else {
       feedback = "input fields cannot be submitted empty! supply login details";
   }
   return alert(feedback);
})

// END OF LOGIN PANEL

