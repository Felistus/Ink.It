const userDetails = JSON.parse(localStorage.getItem("User")) || []; //checks if the user array is empty or filled on page load

// FUNCTION EXPRESSIONS
let localStorageSetItem = () =>{
    return localStorage.setItem("User", JSON.stringify(userDetails)); // LOCAL STORAGE SET ITEM METHOD
}
let swalPop = () => {
    return swal({
        title: "Error!",
        text: "incorrect user detail entered",
        icon: "warning",
        closeOnClickOutside: false,
    });
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

                let theDate = new Date().getDate();
                let theMonth = new Date().getMonth();
                let theYear = new Date().getFullYear();
                let todayDate = `${theDate}/${theMonth}/${theYear}`
               
                if( userDetails[i]["date"].includes(todayDate)) {
                    return swal("Notice!", "You have already marked your attendance for today!", "warning")
                } else{
                    userDetails[i]["date"].push(`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`);
                    const user = {
                        fullName: userDetails[i].fullName,
                        userPhoneNumber: userDetails[i].userPhoneNumber,
                        attendanceCount: meetingCount,
                        password: userDetails[i].password,
                        date: userDetails[i]["date"]
                    };

                    userDetails.splice(i, 1, user)
                    localStorageSetItem();
                    return ( swal({
                                title: "Congratulations!",
                                text: "Attendance Successfully Marked.",
                                icon: "success",
                                button: false
                        }),
                        setTimeout( () => {
                            window.location.href = "../pages/login.html"    //   delays the execution of this code for 2seconds;
                        }, 3000) )
                     
                }
                // end of test              
                 
                
            
            } else{
                response = swalPop();
            }
        };
                
    } else {
        swalPop();
    }
    return response;
})