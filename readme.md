![Spectacles Logo](/docs/SPECTACLES_LOGO_250.jpg)

Spectacles --- A hackable BIM viewer for the web. 
======


Spectacles allows authors in the AEC industry to easily publish their 3D design work on the web, for free.  Users can export models (including BIM data) from popular authoring applications (Grasshopper and Revit to start), and view the models in a web browser.

Spectacles is a fork of the [vA3C viewer](http://va3c.github.io/) project which was launched at the [AEC Technology Hackathon](http://core.thorntontomasetti.com/aec-technology-symposium-2014/aec-technology-symposium-2014-hackathon/) in NYC in May of 2014.  The idea for the project was first outlined [here](https://www.hackerleague.org/hackathons/aec-technology-hackathon-2014/hacks/three-dot-js-aec-viewer-model-exporters) by Benjamin Howes.  The original vA3C viewer was built by Theo Armour, Josh Wentz, Jonatan Schumacher, Benjamin Howes, and Jeremy Tammik.  Thornton Tomasetti's [CORE studio](http://tt-acm.github.io/Spectacles.WebViewer/) is currently developing Spectacles.

Get the Exporters!
======
- [Grasshopper Exporter download](https://github.com/tt-acm/Spectacles.GrasshopperExporter)
- [Grasshopper Exporter Github repo](https://github.com/tt-acm/Spectacles.GrasshopperExporter)
- [Revit Exporter download](https://github.com/tt-acm/Spectacles.RevitExporter)
- [Revit Exporter Github repository](https://github.com/tt-acm/Spectacles.RevitExporter)

Check out the Embedded Viewer Examples
=====
These examples show how a Spectcles viewer can be embedded in another web page, and how the user interface can be customized, or removed entirely.
- [#1 - No User Interface](http://tt-acm.github.io/Spectacles.WebViewer/examples/1/)
- [#2 - Multiple Viewers](http://tt-acm.github.io/Spectacles.WebViewer/examples/2/)
- [#3 - Scene and Lighting UI](http://tt-acm.github.io/Spectacles.WebViewer/examples/3/)
- [#4 - Layers UI](http://tt-acm.github.io/Spectacles.WebViewer/examples/4/)
- [#5 - View and Selection UI](http://tt-acm.github.io/Spectacles.WebViewer/examples/5/)
- [#6 - Mash up Spectacles.json and .Obj/.Mtl](http://tt-acm.github.io/Spectacles.WebViewer/examples/6/)

Goals
======

There are two primary goals for Spectacles.

Goal #1: provide the AEC industry with an easy, free, and open source means of publishing 3D content on the web. The Spectacles platform allows users to export .json files from common AEC authoring applications that can be opened with the Spectacles viewer. The viewer comes in two flavors. One is a full page web application served from github.io that can open .json files from a user’s machine. The second flavor is an embeddable viewer that can be included in any html page. Both viewers will provide a minimal user interface to allow for easy model navigation and intuitive element investigation.

Goal #2: build a general, extensible viewer app that can be forked to build more bespoke, use-case-specific applications. Besides it’s out of the box functionality as a model viewer, Spectacles can be seen as a foundation project that is meant to be forked by power users to build other apps; the viewer can be easily customized, extended, hacked. Spectacles should provide the lowest common denominator in terms of it’s UI and code base. It should have all of the features that all good AEC viewers should have, and ideally, nothing more. Which of course begs the question - what features should all AEC model viewers have? Opinions vary from camp to camp, and pinning down this specification is likely going to be one of the most challenging aspects of the project.


Why?
======

So why are we building this? What’s the point?

There is an incredible amount of knowledge built up in even the most typical [AEC] 3D models - geometrical and architectural relationships, BIM information, relationships between various building systems, etc. Compared to the abundance of this three-dimensionally-encoded knowledge that is being created continuously by the AEC industry, it remains relatively difficult for an author to share a thought in 3D with an audience of any size. It is easy to author 3D models, and difficult to publish them.

AEC wants to embrace 3D/4D in the browser, but everyone who wants to publish 3D content - designy architects, super fussy builders, stuffy old engineers, egomaniacal owners -- everyone - needs something a little different in terms of user interface, or they need a database on the back end, or whatever. As an industry, we need a free, open source solution that we can customize to suit all of our respective needs. Spectacles aims to provide just that - a solid foundation that can be built upon by the other hackers in the industry - by developing an extensible, easy to use web viewer for AEC models.



