$(document).ready( () => {
    const userDetails = JSON.parse(localStorage.getItem("User")) || []; //checks if the user array is empty or filled on page load
    let existingUser;
    let count = 0;
    let nameCheckReg =  /[^aA-zZ]/g; //regular expression to check if the username contains digits
    let numberCheckReg = /[0-9]/g; //regular expression to check if the user phone number contains digits only or combined and extracts only digits
    let fullName;
    let closeBTN = $("#close-emp").hide();

    // EXECUTE ON PAGE LOAD
    $(window).on("load", () => {
        listAllEmployees();
    });

 // FUNCTION EXPRESSIONS
     // LOCAL STORAGE SET ITEM METHOD
     let localStorageSetItem = () =>{
         return localStorage.setItem("User", JSON.stringify(userDetails));
     }
    //  let reloadPage = () => {
    //      return location.reload();
    //  }
// CAPITALIZE FIRST LETTER OF EACH WORD GIVEN TWO PARAMETERS
    let toCapitalize = (first, second) =>{
        joinedName = first+ " " +second;
        fullName = joinedName.toLowerCase().split(" ");
        for (let i = 0; i < fullName.length; i++) {
            fullName[i] = fullName[i].charAt(0).toUpperCase() + fullName[i].substring(1);
        }
        return fullName.join(" ");
    }
//  CREATE A LIST OF ALL EMPLOYEES AND APPEND
    let listAllEmployees = () => {
        return userDetails.forEach( (element) => {
            $("#all-employees").append(`
                    <li class="display-list ">
                        <span class="userName fontFam">${element.fullName}</span>
                        <span class="employee-number fontFam"> ${element.userPhoneNumber}</span>
                        <span class="employee-count fontFam"> ${element.attendanceCount}</span>
                    </li>`);
            });
    };
 // END OF FUNCTION EXPRESSIONS
     
// ADMIN PANEL
    // POST REQUEST: CREATE NEW EMPLOYEE
    $("#createUserButton").click((event) => {
        event.preventDefault();
        const firstName = ( $("#firstName").val() );
        const lastName = ( $("#lastName").val() );
        const userName = toCapitalize(firstName, lastName);
        const userPhoneNumber = $("#userPhoneNumber").val();                                         
        const password = Math.random().toString(36).slice(2); // generates random password for each user
        const userInfo = {
            fullName: userName,
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
    $("#list-employees").click(() => {
        $(".display-list").remove();
        listAllEmployees();
    });
    // END OF LIST ALL EMPLOYEES GET REQUEST

   


































// END OF ADMIN PANEL






})
