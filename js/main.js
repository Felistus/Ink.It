$(document).ready ( () => {
    $("#about-box, #about-head, #about, .display-emp, #delete-tab, #view-tab").hide();

// codes to execute on page load
    $(window).on("load", () => {
        $("#about-head").slideDown(800, () => {
            $("#about-box").delay(800).fadeIn(300, () => {
                $("#about").slideDown(1000, () => {
                    $("#delete-tab").delay(1000).fadeIn(400, () => {
                        $("#view-tab").delay(800).fadeIn(400)
                    })
                })
            })
        })        
    });

// change the plus icon to minu and vice versa
    $(".icon").click( (event) => {
        let target = $( event.target );
        if ( target.hasClass("fa-plus") ) {
            target 
                    .removeClass("fa-plus")
                    .addClass("fa-minus");
            target.parent().siblings().show()
        } else {
            target
                    .removeClass("fa-minus")
                    .addClass("fa-plus");
            target.parent().siblings().hide()
        }
    })






    
});