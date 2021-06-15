const userDetails = JSON.parse(localStorage.getItem("User")) || []; //checks if the user array is empty or filled on page load
let swalPop = () => {
    return swal({
        title: "Ooops!",
        text: "incorrect user details supplied",
        icon: "warning",
        closeOnClickOutside: false,
    });
}
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
                swal("warning", "User does not exist");
            }else {
                if (  userDetails[i].password !== loginPass) {
                    feedback = swalPop();
                } else {
                    return ( swal({
                        text: "User Login Successful",
                        icon: "success",
                        button: false,
                        closeOnClickOutside: false
                    }),
                    setTimeout( () => {
                        window.location.href = "../pages/user.html"    //   delays the execution of this code for 2seconds;
                    }, 1500) );
                }
            }
        }
   } else {
       return swalPop()
   }
//    return feedback;
})


// END OF LOGIN PANEL

