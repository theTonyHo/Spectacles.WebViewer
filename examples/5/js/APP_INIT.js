/**
 * Created by benjamin howes on 12/30/2014.
 */

//contains the jquery document.ready callback, which starts the application

$(document).ready(function(){


    //load our json file
    $.getJSON("./js/Spectacles_2.json", function( data ){

        //once loaded, initialize a Spectacles viewer by passing in the div to bind to, the json data, and a callback function
        //where we can enable application functionality in nice clean chunks
        var mySpectacles = new SPECTACLES($("#Spectacles_output"), data, function(app){

            //call the UI / functionality modules
            app.userInterface();
            app.viewAndSelectionUI();
            app.viewsUI();
            app.setBackgroundColor(0xFFFFFF);
        });
    });

});