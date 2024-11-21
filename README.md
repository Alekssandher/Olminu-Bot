<div align="center">
    
# Olminu Bot  
<img src="https://i.imgur.com/xKP55zy.gif" >

**Olminu Bot** is a Discord bot developed using Eris.js.


![GitHub package.json version](https://img.shields.io/github/package-json/v/Alekssandher/Olminu-Bot?style=flat-square)
![GitHub License](https://img.shields.io/github/license/Alekssandher/Olminu-Bot?style=flat-square)
![Contributors](https://img.shields.io/github/contributors/Alekssandher/Olminu-Bot?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/Alekssandher/Olminu-Bot?style=flat-square)

</div>

---

### Why Olminu?
The bot is named after Olminu, a character from the manga *Drifters*. As a fan of the character, I chose to name the bot in her honor.

## Table of Contents
- [Inviting Bot](#inviting-bot)
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Setting Up](#setting-up)
- [Running the Project](#running-the-project)
- [Registering Slash Commands](#registering-slash-commands)
- [Contribution](#contribution)
- [License](#license)

## Inviting Bot
Invite the bot to your server using this [link](https://discord.com/oauth2/authorize?client_id=1303531869878358036).

## Prerequisites
- [Node.js](https://nodejs.org/) (version 20.18 or higher)

## Dependencies

The following libraries are used in the project:

- **[nodemon](https://www.npmjs.com/package/nodemon)** - Automatically restarts the server during development.
- **[prompt-sync](https://www.npmjs.com/package/prompt-sync)** - For synchronous user input reading.
- **[axios](https://axios-http.com/)** - Makes HTTP requests to external APIs.
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Manages environment variables.
- **[eris](https://abal.moe/Eris/)** - Interacts with the Discord API.
- **[wikipedia](https://www.npmjs.com/package/wikipedia)** - Queries Wikipedia content.

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/Alekssandher/Olminu-Bot.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Olminu-Bot
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Setting Up

1. Log in to the [Discord Developer Portal](https://discord.com/developers) and create a new application.
2. Create a `.env` file in the root folder.
    - Check the `.env.example` file for the required variables.
3. Replace the placeholder values with your bot's credentials.

> **Pro Tip**: For testing, create a dedicated Discord server. Use the `GUILD_ID` environment variable to restrict commands to that server.

## Running the Project

Run the main file using one of the commands below.  
> **Recommendation**: Use `pm2 start main.ts --watch` for an improved development workflow and automatic restarts. This is especially helpful because the bot may occasionally crash when a slash command is used. Running it with PM2 ensures it automatically restarts whenever a crash occurs.

```bash
npm run dev:nodemon   # Runs the project with nodemon
ts-node main.ts       # Executes the TypeScript file directly
pm2 start main.ts     # Runs the project with PM2
pm2 start main.ts --watch  # Watches for file changes and restarts automatically
``` 

## Registering Slash Commands
Registering commands is simple. Use the `register-commands.js` script provided in the repository.
Commands can be registered globally or restricted to a specific guild.

```
// To register guild commands
node register-commands.js guild
```
```
// To register global commands
node register-commands.js global
```
> Note: Global command registration might take up to an hour to propagate across all servers. Guild commands are updated instantly.
## Contribution
If you want to contribute to the project, feel free to open an issue or submit a pull request. All contributions are welcome!

## License
This project is licensed under the GNU General Public License (GPL) version 3. You are free to use, modify, and distribute this software, provided that all copies and derivatives are also licensed under GPL v3.

For more details, see the [LICENSE](https://github.com/Alekssandher/Olminu-Bot?tab=GPL-3.0-1-ov-file#) file included in this repository.
