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
     let localStorageSetItem = () =>{
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
                        <td class="pick"> ${element.fullName} </td>
                        <td class="userMobile pick"> ${element.userPhoneNumber} </td>
                        <td class="pick"> ${element.password} </td>
                        <td class="centerText pick"> ${element.attendanceCount} </td>
                        <td class="centerText pick"> <i class="fa fa-trash icon" aria-hidden="true"></i> </td>
                        
                    </tr`);
            });
    };

    // let swalNotice = () => {
  
    // }
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
            swal("Please fill all fields appropriately", { icon: "warning", closeOnClickOutside: false, });
        } else{
            if ( userDigits ) {
                if ( userDigits.length !== 11 ) {
                    swal("Please enter correct phone number format",  { icon: "warning", closeOnClickOutside: false, });
                } else {
                    userDigitValid = userDigits.join(""); // joins the array of numbers picked out and transforms it to a single string of numbers

                    if((firstName === "") || (lastName === "")){
                        swal("Please fill all fields appropriately", { icon: "warning", closeOnClickOutside: false, });
                    } else{
                        existingUser = userDetails.map( value => value.userPhoneNumber );   
                        if ( existingUser.includes(userDigitValid) ) {
                            swal( {
                                title: "Ooops!",
                                text: "Employee details exist already",
                                icon: "warning", 
                                closeOnClickOutside: false,
                            }).then( () => location.reload() );
                        } else {
                            userDetails.push(userInfo)
                            localStorageSetItem();
                            swal("Employee details created successfully", { icon: "warning", closeOnClickOutside: false, })
                            location.reload();
                        }
                    }
                }
                } else {
                    swal("Please enter correct phone number format",  { icon: "warning", closeOnClickOutside: false, });
                }
        }
    });
    // END OF POST REQUEST: CREATE NEW EMPLOYEE
    
    // DELETE AN EMPLOYEE
    $("#employees-table").on("click", ".icon", function() {
        // swalNotice();
        let currentRow = $(this).closest("tr");
        targetUserMobile = (currentRow.children("td.userMobile").text()).trim();
        let index;
        swal({
            title: "Hello Admin!... Are you sure?",
            text: "Deleted information cannot be retrieved!",
            icon: "warning",
            buttons: {
                cancel: "Cancel",
                confirm: "Confirm"
            },
            dangerMode: true,
            closeOnClickOutside: false,
        })
        .then((willDelete) => {
            if (willDelete) {
                for(index = 0; index < userDetails.length; index++) {
                    if ( userDetails[index].userPhoneNumber === targetUserMobile ) {
                        userDetails.splice(index,1);
                        localStorageSetItem();
                        currentRow.remove();
                        swal("Employee Details has been successfully deleted", { icon: "success", closeOnClickOutside: false, })
                    }   
                }
            } else {
            swal("Good! Employee Details are safe", { icon: "info", closeOnClickOutside: false, });
            }
        });

        

        // for(index = 0; index < userDetails.length; index++) {
        //     if ( userDetails[index].userPhoneNumber === targetUserMobile ) {
        //         userDetails.splice(index,1);
        //         localStorageSetItem();
        //         // currentRow.remove();
        //     }   
        // }
    })
    // END OF DELETE AN EMPLOYEE

    
})