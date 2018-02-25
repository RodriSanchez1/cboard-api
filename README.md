# Cboard API - REST API for CBoard application

[Cboard](https://app.cboard.io/) is an augmentative and alternative communication (AAC) web application, allowing users with speech and language impairments (autism, cerebral palsy) to communicate by symbols and text-to-speech.

<img src='https://i.imgur.com/eeH9cUM.jpg' width='794' alt='Cboard screenshot'>

The app uses the browser's Speech Synthesis API to generate speech when a symbol is clicked, there are 3400 symbols to choose from when creating a board. Cboard is available in 33 languages (support varies by platform - Android, iOS, Windows).

**We're using Discord to collaborate, join us at: https://discord.gg/TEH8uxh**

## How does it work?

This video from Real Look Autism will help you understand how communication boards are being used.

**Disclaimer:** the app in the video is not Cboard.

<a href="https://www.youtube.com/watch?v=oIGrxzPMVtw"><img src="https://img.youtube.com/vi/oIGrxzPMVtw/0.jpg" alt="Real Look Autism Episode 8" width="480" height="360"></a>

## Quick start

### Pre-requisites
Before to install the Cboard API, be sure you are **locally** running successfully following tools:
* Node.js > 7.0.0 (download [here](https://nodejs.org/en/download/)
* MongoDB > 3.0.0 (download [here](https://docs.mongodb.com/manual/installation/)
* Swagger for node 2.0 (download and install using npm [here](https://github.com/swagger-api/swagger-node)

### Install
Clone repository and install npm dependencies:
```bash
$ git clone https://github.com/cboard-org/cboard-api.git
$ cd cboard-api
$ npm install
```

### Run the API Server
Using swagger for nodejs. You need to install swagger for node locally first, Install it using npm. For complete instructions, see the [install](./docs/install.md) page.

```bash
$ npm install -g swagger
$ swagger project start
```
That should start a server process listening on port 10010.

### See API Paths
By using swagger edit application:
```bash
$ swagger project edit
```
That should open a browser window and show API swagger editor like below:
<img src='https://i.imgur.com/pt0eJVQ.png' width='600' alt='Cboard API Swagger'>

### Mailing system configuration
When a new user is created using the API, some verification emails are sent and hence, a emailing system must be configured.d
To use a specific SMPT server, you must edit locally following file:
**config/env/development.js**
And look for following config block:
```javascript
    emailTransport: {
        from: 'cboard@cboard.io',
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true,
        service: 'Sendgrid',
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY
        }
    }
```
Replace above values with your SMTP server details you own.

## License

Code - [GPLv3](https://github.com/shayc/cboard/blob/master/LICENSE)  
Symbols - [CC BY-SA](https://creativecommons.org/licenses/by-sa/2.0/uk/)
