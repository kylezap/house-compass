# House Compass

This project lets users find compass directions for a home including which direction a home faces and which direction is headed when looking at the home from the street. Practicing real estate brokerage, it's a very common concern among certain groups of people what direction the front door faces. I built this app for this purpose. 

## Tech
This project was built with Vite and React, with Tailwind for light styling. Currently there is only one component separate from the main App, a MapComponent, that initiates the logic behind the search. 

First a User clicks into the search box and starts typing to find an address for a home. The Autocomplete API from Google Maps is integrated, so addresses will start populating. The autocomplete should check IP and start serving addresses that are geographically close to a User's location.

Next, on submit, useEffect is initiated in the MapComponent. The logic is as follows:

1. Initiate Geocoder and run the address through it. It returns a promise with the Latitude and Longitude.

2. Then the Streetview Service and a Panorama image are initiated.

3. Then Streetview panorama API finds the nearest panorama viewpoint from the Streetview service. This is what you can view in the map.

4. Lastly the component runs computeHeading method from Google API with arguments being the first point stored from Geocoder, and second the panorama coordinates. This method returns a heading between the two. The idea is to get the heading as you are viewing the home from the street.

5. A map is rendered with the directions to and facing. Logic is built in the App component directly converting the heading to compass directions.

## Challenges

There were a few challenges building the app. Interfacing with the Google API docs was one such challenge. I initially built functionality that returned a heading perpendicular to the heading of the house, essentially the direction the road runs with the Streetview car. Then I wrote a function that took in this heading and returned a heading 90 degrees. However I couldn't find anything in the payload from the API that specified which side of the road the house was on. So it could be facing the wrong house across the street. 

I rewrote from scratch the map component so it took in the address, got two coordinates, and extracted a heading from them.

## Roadmap

It's not perfect and for many scenarios it can break. One address returned the alleyway behind the house. I suspect I need to create a function that incrementally expands a search for panorama coordinates. 

Additionally I'd like to make the directions dynamic. When a user changes the directions on the drag and drop streetview, the compass directions will update too.

## 
