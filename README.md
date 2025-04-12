## Description
Gorrik is an REST API service that acts as a bridge between client and Guild Wars 2 repository. Currently only one path is available
```
/streamer/{twitchId}
```
To link Guild Wars 2 account with Gorrik users have to link it thru the https://gw2labs.com/
This project is a microservice only used to talk between client (Twitch overlay) and the GW2 API. It will cache the response for each streamer for 5 minutes globally to avoid GW2 API limits.

## Project setup

```bash
$ npm install
```

You need a .env file with Pocketbase credentials.
Example .env file:
```env
API_URL=http://localhost:8090/
PB_ADMIN_EMAIL=admin@admin.com
PB_ADMIN_PASSWORD=adminpassword
```


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
