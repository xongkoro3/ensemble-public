# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [0.0.5] - 2019-14-30
### Added
- Added authentication
    Users can now register for the site and login.
    Login token stored in local storage so user can be re-authenticated on refresh.
    Logout added
    Dialog routed to contain login, register, and party submission
    Party submission restricted for logged out users.

    Styling changes
    Services isolated in src folder    

## [0.0.4] - 2019-04-13
### Added
- Routing set up
    Routed components created for sidebar. Dynamic routing (cards, details) completed by ui-route.
    Applied resolve vs controller loading correctly
- Spotify API integrated
    Spotify authentication added and now it dynamically renders into the sidebar using spotify service

## [0.0.4] - 2019-04-11
### Added
- Major refactor
    Everything now uses component architecture.
    Gulp used to generate ensemble & vendor bundles.

- Card view created
    Parties on map will now show up as cards in the sidebar.

## [0.0.3] - 2019-03-22
### Added
- Major styling changes
Wired up AngularJS Material and refactored the front-end codes
Added left-nav bar, add-form button

- Parse database wired up
Parse queries are made outside of controller in
model service
User model and Party model created for user and party class
User input through add-form

- Spotify integrated
Added a spotify iframe embedded to HTML

## [0.0.1] - 2019-02-26
### Added
- Mapbox API integrated into the main view
- JSON data connected and served through NodeJS server
- Routing implemention is complete
- Frontend/Backend architecture established
- Initial styling added
- Basic menu bar implemented

[0.0.1]: https://github.com/Viice/Ensemble/v1.0.0
