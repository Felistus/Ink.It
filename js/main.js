$(document).ready( () => {
    const userDetails = JSON.parse(localStorage.getItem("User")) || []; //checks if the user array is empty or filled on page load
    let existingUser;
    let count = 0;
    // $("#close-employees-list").hide();
    let nameCheckReg =  /[^aA-zZ]/g; //regular expression to check if the username contains digits
    let numberCheckReg = /[0-9]/g; //regular expression to check if the user phone number contains digits only or combined and extracts only digits
 
 // FUNCTION EXPRESSIONS
     // LOCAL STORAGE SET ITEM METHOD
     let localStorageSetItem = () =>{
         return localStorage.setItem("User", JSON.stringify(userDetails));
     }
     let reloadPage = () => {
         return location.reload();
     }
 // END OF FUNCTION EXPRESSIONS
 
// ADMIN PANEL
    // POST REQUEST: CREATE NEW EMPLOYEE
    $("#createUserButton").click((event) => {
        event.preventDefault();
        const firstName = ( $("#firstName").val() ).toUpperCase();
        const lastName = ( $("#lastName").val() ).toUpperCase();
        const userPhoneNumber = $("#userPhoneNumber").val();                                         
        const password = Math.random().toString(36).slice(2); // generates random password for each user
        const userInfo = {
            firstName,
            lastName,
            userPhoneNumber,
            attendanceCount: count,
            password,
        };
        let userDigits = userPhoneNumber.match(numberCheckReg); //  checks if the user-input for phone-number was properly filled with digits only
        let userDigitValid;

        if ( firstName.match(nameCheckReg) || lastName.match(nameCheckReg) ) {
        alert("Please fill all fields appropriately");
        } else{

            if ( userDigits ) {
                if ( userDigits.length !== 11 ) {
                    alert("Please enter correct phone number format");
                } else {
                    userDigitValid = userDigits.join(""); // joins the array of numbers picked out and transforms it to a single string of numbers

                    if((firstName === "") || (lastName === "")){
                        alert("Please fill all fields appropriately");
                    } else{
                        existingUser = userDetails.map( value => value.userPhoneNumber );   
                        
                        if ( existingUser.includes(userDigitValid) ) {
                            alert("User already exists");
                        } else {
                            userDetails.push(userInfo)
                            localStorageSetItem();
                            alert("User successfully created");
                        }
                    }
                    
                }
                } else {
                    alert("Please enter correct phone number format")
                }
        }
    });
    // END OF POST REQUEST: CREATE NEW EMPLOYEE

    // GET REQUEST: LIST ALL EMPLOYEES
    $("#list-employees-button").click((event) => {
        event.preventDefault(); 
        $(".all-employee").remove();
    
        for(let index = 0; index < userDetails.length; index++){
            $("#list-all-employees").append(`
                    <li class="all-employee list-group-item d-flex justify-content-between align-items-center">
                        ${userDetails[index].firstName} ${userDetails[index].lastName} 
                    <span class="badge badge-secondary badge-pill"> ${userDetails[index].phoneNumber}</span>
                    <span class="badge badge-primary"> ${userDetails[index].attendanceCount}</span>
                    </li>`);
        }
        $("#close-employees-list").show().click(()=>{
            $(".all-employee").remove();
            $("#close-employees-list").hide()
        });
    });
    // END OF LIST ALL EMPLOYEES GET REQUEST
});
// END OF ADMIN PANEL






























})