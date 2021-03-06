$(document).ready ( () => {
    $("#about-box, #about, #view-tab").hide();

// codes to execute on page load
    $(window).on("load", () => {
        $("#view-tab, #about").delay(900).slideDown(2000, () => {
            $("#about-box").delay(1000).fadeIn(400)
        })      
    });

// controls the addition of the ".active" to each list item in the nav
    $(".nav-item").click( function() {
        $(this).siblings(".nav-item").removeClass("active");
        $(this).addClass("active")
    });

// USING THE jBOX jQUERY PLUGIN TO CREATE A CUSTOM TOOLTIP
    // tooltip
    let options = {
        attach: ".tooltip-icon",
        content: "Help Center",
        pointer: "left",
        theme: "TooltipDark"
        
    }
    new jBox("Tooltip", options);
    // tooltip end

    // modal
    new jBox('Modal', {
        width: 360,
        theme: "TooltipDark",
        attach: ".tooltip-icon",
        content: '<div class="complaint-card" id=""> <h1 id="complaint-head">send a message</h1> <form class="form-block"  id=""> <input type="text" name="first-name" id="complaint-first-name" placeholder="first name" class="complaint-box" required> <input type="text" name="last-name" id="complaint-last-name" placeholder="last name" class="complaint-box" required> <input type="tel" name="phone-num" class="complaint-box" id="complaint-phoneNumber" minlength="11" maxlength="11" required placeholder="phone number"> <textarea name="user-complaint" id="complaint" cols="30" rows="5"></textarea> <div class="btn"> <input type="submit" value="send" class="send-btn" id="send-btn"> </div> </form> </div>',
        position: {
            x: 'left',
            y: 'top'
          },
        animation: "tada"
    });
    // modal end
// END OF THE JBOX JQUERY PLUGIN

    
});