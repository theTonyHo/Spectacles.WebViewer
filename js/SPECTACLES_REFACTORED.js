//The MIT License (MIT)
//
//Copyright (c) 2015 Thornton Tomasetti, Inc.
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.



//base application object containing Spectacles functions and properties
var SPECTACLES = function (divToBind, jsonFileData, callback) {

    //a local app object we can work with inside of the constructor to avoid 'this' confusion.
    var SPECT = this;

    //top level objects.  These are extended below.
    SPECT.threejs = {};       //objects and functions related to core three.js functionality
    SPECT.ui = {};            //UI specific objects and functions
    SPECT.loader = {};        //use this to load a scene, or add to a scene
    SPECT.lighting = {};      //all models need lights - this is the lighting rig


    //*********************
    //*********************
    //*** THREE.js setup

    //the target div - this is where a single instance of spectacles runs
    SPECT.threejs.targetDiv = {};

    //the three.js scene, renderer, clock, stats, and [orbit] controls objects
    SPECT.threejs.scene = {};
    SPECT.threejs.renderer = {};
    SPECT.threejs.clock = {};
    SPECT.threejs.stats = {};
    SPECT.threejs.controls = {};

    //the background color - it lives here and is set by calling a top level
    //function on the spectacles object - setBackgroundColor - either in the UI layer
    //or by an application extending spectacles
    SPECT.threejs.backgroundColor = {};

    //the scene's bounding sphere. this is used by the lighting objects and to set some views
    SPECT.threejs.boundingSphere = {};


    //function that sets up the initial THREE.js scene, renderer, camera, orbit controls, etc.
    //also creates loading and blackout divs which are shown/hidden as json files are loaded
    SPECT.initViewer = function (viewerDiv) {

        //append the blackout div and let it respond to the parent div resizing
        SPECT.threejs.targetDiv.append("<div class='Spectacles_blackout'></div>");
        //function to position and size the blackout div
        var setBlackout = function () {
            //set the position of the UI relative to the viewer div
            var targetDiv = $('.Spectacles_blackout');

            //get upper left coordinates of the viewer div - we'll use these for positioning
            var win = $(window);
            var x = SPECT.threejs.targetDiv.offset().left - win.scrollLeft();
            var y = SPECT.threejs.targetDiv.offset().top - win.scrollTop();

            //set the position and size
            targetDiv.css('left', x.toString() + "px");
            targetDiv.css('top', y.toString() + "px");
            targetDiv.css('width', SPECT.threejs.targetDiv.width().toString() + "px");
            targetDiv.css('height', SPECT.threejs.targetDiv.height().toString() + "px");
        };
        //call this the first time through
        setBlackout();
        //respond to resize of the parent div
        SPECT.threejs.targetDiv.resize(function () {
            setBlackout();
        });


        //append the loading div and let it respond to the parent div resizing
        SPECT.threejs.targetDiv.append("<div class='Spectacles_loading'><h1>Loading Spectacles .json file...</h1></div>");
        //function to position the loading div
        var setLoading = function () {

            //set the position of the UI relative to the viewer div
            var targetDiv = $('.Spectacles_loading');

            //get upper left coordinates of the viewer div - we'll use these for positioning
            var win = $(window);
            var x = ((SPECT.threejs.targetDiv.offset().left + SPECT.threejs.targetDiv.outerWidth()) - win.scrollLeft()) / 2;
            var y = ((SPECT.threejs.targetDiv.offset().top + SPECT.threejs.targetDiv.outerHeight()) - win.scrollTop()) / 2;

            //set the position and size
            targetDiv.css('left', x.toString() + "px");
            targetDiv.css('top', y.toString() + "px");
        };
        //call this the first time through
        setLoading();
        //respond to resize of the parent div
        SPECT.threejs.targetDiv.resize(function () {
            setLoading();
        });


        //append a footer.  Feel free to strip this out if you'd like to! ;]
        SPECT.threejs.targetDiv.append(
            "<div class='Spectacles_Footer'>" +
                "<img src='https://raw.githubusercontent.com/tt-acm/Spectacles.WebViewer/gh-pages/docs/SPECTACLES_20px.png'> " +
                "Spectacles is developed by the <a href='http://core.thorntontomasetti.com/' target='blank'>CORE studio</a>.  " +
                "Copyright <a href='http://thorntontomasetti.com/' target='blank'>Thornton Tomasetti</a> 2015." +
                "</div>");
        //function to position footer
        var setFooter = function(){
            //set the position of the UI relative to the viewer div
            var targetDiv = $('.Spectacles_Footer');

            //get lower right coordinates of the viewer div - we'll use these for positioning
            var win = $(window);
            var x = SPECT.threejs.targetDiv.offset().left - win.scrollLeft();
            var y = (SPECT.threejs.targetDiv.offset().top - win.scrollTop()) + SPECT.threejs.targetDiv.height();

            //set the position
            targetDiv.css('left', x.toString() + "px");
            targetDiv.css('top', (y - 25).toString() + "px");
        };
        //call the first time through
        setFooter();
        //respond to resize of the parent div
        SPECT.threejs.targetDiv.resize(function () {
            setFooter();
        });

        //empty scene
        SPECT.threejs.scene = new THREE.Scene();

        //set up the THREE.js div and renderer
        SPECT.container = viewerDiv;
        SPECT.renderer = new THREE.WebGLRenderer(
            {
                maxLights: 10,
                antialias: true
            }
        );
        SPECT.renderer.setClearColor(SPECT.backgroundColor, 1.0);
        SPECT.renderer.setSize(viewerDiv.innerWidth(), viewerDiv.innerHeight());
        SPECT.renderer.shadowMapEnabled = true;
        SPECT.container.append(SPECT.renderer.domElement);

        //set up the camera and orbit controls
        SPECT.camera = new THREE.PerspectiveCamera(45, viewerDiv.innerWidth() / viewerDiv.innerHeight(), 1, 1000000);
        SPECT.camera.position.set(1000, 1000, 1000);
        SPECT.orbitControls = new THREE.OrbitControls(SPECT.camera, SPECT.renderer.domElement);
        SPECT.orbitControls.target.set(0, 100, 0);

        //a clock.  the camera uses this
        SPECT.clock = new THREE.Clock();

        //respond to resize
        viewerDiv.resize(function () {
            var WIDTH = viewerDiv.innerWidth(),
                HEIGHT = viewerDiv.innerHeight();
            SPECT.renderer.setSize(WIDTH, HEIGHT);
            SPECT.orbitControls.object.aspect = WIDTH / HEIGHT;
            SPECT.orbitControls.object.updateProjectionMatrix();
        });

        //respond to window resize and scrolling.  when the window resizes, sometimes it moves our parent div ... and all of our
        //children need to be repositioned (maybe I'm just horrible with CSS?).  On a resize, trigger the resize
        //event on our parent DIV, which should reposition all of the children.
        window.addEventListener('resize', function () {
            SPECT.viewerDiv.resize();
        });
        window.addEventListener('scroll', function () {
            SPECT.viewerDiv.resize();
        });


        //call the render function - this starts the webgl render loop
        SPECT.render();
    };





};