# Geolocation with custom hooks and Public API

Two methods to get user's location information in React:

1. From Front-End with custom hook (Limited info)
2. From public api (More info)

## Method 1

- useGeolocation hook helps get the user's permission to access location information
- Lat and Long values can be determined

## Method 2

- Fetching user's IP and geolocation data based on that IP using public api
- To get user IP: https://freegeoip.app/
- To get geolocation based on the result from above fetch: https://ip-api.com/json/'user-ip'
