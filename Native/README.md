# Date Night React Native App

The React Native app for TeamNoSleep's Date Night App.

## Overview

This Android app interfaces with the Serverless API Gateway to display the user's Itinerary.

We tried to stick mostly to React Native and its included libraries.

## Components

### App

The primary component in the app. Renders a header displaying info about the current itinerary, a `ScrollView` with the elements of the itinerary, and a Footer to tie the visual together. Also contains the actual fetching of the data.

### DateNightFooter

A simple footer intended to encapsulate rendering logic of the footer.

### DateNightToolbar

A simple "Toolbar" shown at the top of the app. Displays basic information about the date.

### ItineraryItem

A single itinerary "Item." This component is the largest container for all Itinerary views.

### ItinerarySidebar

A decoration on the `ItineraryItem`, displayed to the left. Responsible for rendering the timeline, the icon related to the activity, and a time stamp about when the activity will be.

### ItineraryTitle

The component which encapsulates simple rendering logic about the activity. In the collapsed state of an `ItineraryItem`, this component is the primary view in the item.

## Caveats

* It doesn't work on iOS :(

