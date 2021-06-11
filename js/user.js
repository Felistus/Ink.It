const userDetails = JSON.parse(localStorage.getItem("User")) || []; //checks if the user array is empty or filled on page load

// FUNCTION EXPRESSIONS
let localStorageSetItem = () =>{
    return localStorage.setItem("User", JSON.stringify(userDetails)); // LOCAL STORAGE SET ITEM METHOD
}
 // END OF FUNCTION EXPRESSIONS
document.getElementById("mark-btn").addEventListener("click", event => {
    event.preventDefault();
    let meetingCount;
    let response;
    let i;
    let userArray = userDetails.length;
    const markNumber = document.getElementById("markPhoneNumber").value;
    
    if ( markNumber !== "" ) {
        for (i = 0; i < userArray; i++) {        
            if(userDetails[i].userPhoneNumber === markNumber){
                meetingCount = parseInt(userDetails[i].attendanceCount);
                meetingCount++;
                const user = {
                    fullName: userDetails[i].fullName,
                    userPhoneNumber: userDetails[i].userPhoneNumber,
                    attendanceCount: meetingCount,
                    password: userDetails[i].password
                };
                userDetails.splice(i, 1, user)
                localStorageSetItem();
                alert(`Attendance Successfully Marked for Meeting day: 
                ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
                )
                return window.location.href = "../pages/login.html";
            } else{
                response = ("User doesn't exist ..! See ADMIN for more details");
            }
        };
                
    } else {
        alert("input field cannot be empty...!");
    }
    return alert(response);
})