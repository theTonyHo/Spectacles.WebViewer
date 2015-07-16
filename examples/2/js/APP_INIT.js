/**
 * Created by benjamin howes on 12/30/2014.
 */

//contains the jquery document.ready callback, which starts the application

$(document).ready(function(){


    //load JSON file 1
    $.getJSON("./js/Spectacles.json", function( data ){

        //once loaded, initialize a VA3C viewer by passing in the div to bind to, the json data, and a callback function
        //where we can enable application functionality in nice clean chunks
        var mySpectacles = new SPECTACLES($("#Spectacles_output1"), data, function(app){

            //call the UI / functionality modules
            app.setBackgroundColor(0xFFFFFF);
        });
    });

    //load JSON file 2
    $.getJSON("./js/Spectacles_2.json", function( data ){

        //once loaded, initialize a VA3C viewer by passing in the div to bind to, the json data, and a callback function
        //where we can enable application functionality in nice clean chunks
        var mySpectacles = new SPECTACLES($("#Spectacles_output2"), data, function(app){

            //call the UI / functionality modules
            app.setBackgroundColor(0xFFFFFF);
        });
    });

});