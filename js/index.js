$(document).ready( () => {
    const userDetails = JSON.parse(localStorage.getItem("User")) || []; //checks if the user array is empty or filled on page load
    let existingUser;
    let count = 0;
    let nameCheckReg =  /[^aA-zZ]/g; //regular expression to check if the username contains digits
    let numberCheckReg = /[0-9]/g; //regular expression to check if the user phone number contains digits only or combined and extracts only digits
    let fullName;
    // let closeBTN = $("#close-emp").hide();


    // EXECUTE ON PAGE LOAD
    $(window).on("load", () => {
        listAllEmployees();
    });

 // FUNCTION EXPRESSIONS
     // LOCAL STORAGE SET ITEM METHOD
     let localStorageSetItem = (userDetails) =>{
         return localStorage.setItem("User", JSON.stringify(userDetails));
     }
   
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
            $("#employees-table").append(`
                    <tr>
                        <td> ${element.fullName} </td>
                        <td class="userMobile"> ${element.userPhoneNumber} </td>
                        <td> ${element.password} </td>
                        <td class="centerText"> ${element.attendanceCount} </td>
                        <td class="centerText"> <i class="fa fa-trash icon" aria-hidden="true"></i> </td>
                        
                    </tr`);
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
                            location.reload();
                        } else {
                            userDetails.push(userInfo)
                            localStorageSetItem(userDetails);
                            alert("User successfully created");
                            location.reload();
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
    // $("#list-employees-btn").click(() => {
    //     $(".display-list").remove();
    //     listAllEmployees();
    // });
    // END OF LIST ALL EMPLOYEES GET REQUEST

    
    // DELETE AN EMPLOYEE
    $("#employees-table").on("click", ".icon", function() {
        currentRow = $(this).closest("tr").children("td.userMobile").text();
        console.log(currentRow)

        for(let index = 0; index < userDetails.length; index++) {
            if ( currentRow === userDetails[index].userPhoneNumber ) console.log(currentRow)
        }
    });
   






























   
    // GET REQUEST: LIST AN EMPLOYEE
    // $("#view-emp").click(event => {
    //     event.preventDefault();
    //     let userNumber = $("#employee-ID").val();
    //     let i;
    //     let userArray = userDetails.length;

    //     for(i = 0; i < userArray; i++){
    //         if(userDetails[i].userPhoneNumber !== userNumber){
    //             $(".one-employee").remove();
    //             $("#list-an-employee").append(`<li class="one-employee no-employee">User doesn't exists in db</li>`);
    //             closeBTN.show();
    //         } else{
    //             $(".one-employee").remove();
    //             closeBTN.show();
    //             return $("#list-an-employee").append(
    //                     `<li class="one-employee display-one-emp"> ${userDetails[i].fullName} 
    //                         <span class="password"> ${userDetails[i].password} </span>
    //                     </li>`
    //             );
    //             }
    //         }        
    // });
    // END OF LIST AN EMPLOYEE GET REQUEST
    
    // GET REQUEST: DELETE AN EMPLOYEE
    // $("#del-emp").click(()=> {
    //     userNumber = $("#employee-ID").val();
    //     let i;
    //     let userArray = userDetails.length

    //     for(i = 0; i < userArray; i++){
    //         if(userDetails[i].userPhoneNumber !== userNumber){
    //             $(".one-employee").remove();
    //             $("#list-an-employee").append(`<li class="one-employee no-employee">User doesn't exists in db</li>`);
    //         } else{
    //             userDetails.splice(i,1);
    //             localStorageSetItem();
    //             $(".one-employee").remove();
    //             return $("#list-an-employee").append(`<li class="one-employee">User successfully DELETED</li>`);
    //         }
    //         closeBTN.show();
    //     }        
    // });
    // END OF DELETE AN EMPLOYEE

    // WIPE DIV CLEAR OF TEXTS/DETAILS
    // $("#close-emp").click( event => {
    //     event.preventDefault();
    //     $(".one-employee").remove();
    //     closeBTN.hide();
    //     $("#employee-ID").empty();
    // })
    // END OF WIPE DIV CLEAR OF TEXTS/DETAILS
// END OF ADMIN PANEL


})




