'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as eris from 'eris';
import * as path from 'path';
import { Client } from 'eris';

var config = vscode.workspace.getConfiguration('discord');
var token = config.get('token');


class Discord {
    public tokenChecker() {
        const client = new Client(token);
        client.on("ready", () => {
            console.log("Ready!");
            if (client.user.bot) {
                vscode.window.showErrorMessage("Cannot accept bot tokens");
            } else {
                vscode.window.showInformationMessage("It's correct!");
            }
            client.disconnect();
        });
        client.connect();
    }

    public sendMessage() {
        const client = new Client(token);
        client.on("ready", () => {
            let guild_names = client.guilds.map(guild => guild.name);
            //console.log("Done 1");
            let served = guild_names;
            let served2: vscode.QuickPickItem[] = []
            for (let index = 0; index < served.length; index++) {
                let item = served[index]
                served2.push({
                    label: item,
                    description: ""
                });
            };
            vscode.window.showQuickPick(served2, { placeHolder: "Pick one to send a message to." }).then(value => {
                let guild = client.guilds.find(g => g.name === value.label);
                let served = guild.channels.map(guild => guild.name);
                let served2: vscode.QuickPickItem[] = []
                for (let index = 0; index < served.length; index++) {
                    let item = served[index]
                    served2.push({
                        label: item,
                        description: ""
                    });
                };
                vscode.window.showQuickPick(served2, { placeHolder: "Pick one to send a message to." }).then(valueC => {
                    let guild = client.guilds.find(g => g.name === value.label);
                    let served = guild.channels.find(g => g.name === valueC.label);
                    vscode.window.showInputBox({ prompt: "What message do you want to send?" }).then(valued => {
                        client.createMessage(served.id, valued);
                    });
                    vscode.window.showInformationMessage("Message sent!");
                });
            });
            client.disconnect({ reconnect: false });
        });
        client.connect();
    };

    public uploadFromCurrentDirectory() {
        const client = new Client(token);
        client.on("ready", () => {
            let guild_names = client.guilds.map(guild => guild.name);
            let served = guild_names;
            let served2: vscode.QuickPickItem[] = []
            for (let index = 0; index < served.length; index++) {
                let item = served[index]
                served2.push({
                    label: item,
                    description: ""
                });
            };
            vscode.window.showQuickPick(served2, { placeHolder: "Pick one to send a message to." }).then(value => {
                let guild = client.guilds.find(g => g.name === value.label);
                let served = guild.channels.map(guild => guild.name);
                let served2: vscode.QuickPickItem[] = []
                for (let index = 0; index < served.length; index++) {
                    let item = served[index]
                    served2.push({
                        label: item,
                        description: ""
                    });
                };
                vscode.window.showQuickPick(served2, { placeHolder: "Pick one to send a message to." }).then(valueC => {
                    let guild = client.guilds.find(g => g.name === value.label);
                    let served = guild.channels.find(g => g.name === valueC.label);
                    let files: vscode.QuickPickItem[] = []
                    let current_files = fs.readdirSync('./')
                    for (let index = 0; index < current_files.length; index++) {
                        let item = current_files[index]
                        files.push({
                            label: item,
                            description: ""
                        });
                    };
                    vscode.window.showQuickPick(files, { placeHolder: "Please select a file from the list" }).then(filename => {
                        let filed = filename.label
                        client.createMessage(served.id, "", { file: fs.readFileSync(filed), name: filed })
                        vscode.window.showInformationMessage("Message sent!");
                    });
                });
            });
            client.disconnect({ reconnect: false });
        });
        client.connect();
    };

    public uploadFromPath() {
        const client = new Client(token);
        client.on("ready", () => {
            let guild_names = client.guilds.map(guild => guild.name);
            let served = guild_names;
            let served2: vscode.QuickPickItem[] = []
            for (let index = 0; index < served.length; index++) {
                let item = served[index]
                served2.push({
                    label: item,
                    description: ""
                });
            };
            vscode.window.showQuickPick(served2, { placeHolder: "Pick one to send a message to." }).then(value => {
                let guild = client.guilds.find(g => g.name === value.label);
                let served = guild.channels.map(guild => guild.name);
                let served2: vscode.QuickPickItem[] = []
                for (let index = 0; index < served.length; index++) {
                    let item = served[index]
                    served2.push({
                        label: item,
                        description: ""
                    });
                };
                vscode.window.showQuickPick(served2, { placeHolder: "Pick one to send a message to." }).then(valueC => {
                    let guild = client.guilds.find(g => g.name === value.label);
                    let served = guild.channels.find(g => g.name === valueC.label);
                    let files: vscode.QuickPickItem[] = []
                    let current_files = fs.readdirSync('./')
                    for (let index = 0; index < current_files.length; index++) {
                        let item = current_files[index]
                        files.push({
                            label: item,
                            description: ""
                        });
                    };
                    vscode.window.showInputBox({ prompt: "Input your file path" }).then(file_path => {
                        if (fs.existsSync(file_path) && !fs.lstatSync(file_path).isDirectory()) {
                            client.createMessage(served.id, "", { file: fs.readFileSync(file_path), name: path.basename(file_path) })
                            vscode.window.showInformationMessage("Message sent!");
                        }
                    })
                });
            });
            client.disconnect({ reconnect: false });
        });
        client.connect();
    }

    public sendSelectionMessage() {
        const client = new Client(token);
        client.on("ready", () => {
            let guild_names = client.guilds.map(guild => guild.name);
            //console.log("Done 1");
            let served = guild_names;
            let served2: vscode.QuickPickItem[] = []
            for (let index = 0; index < served.length; index++) {
                let item = served[index]
                served2.push({
                    label: item,
                    description: ""
                });
            };
            vscode.window.showQuickPick(served2, { placeHolder: "Pick one to send a message to." }).then(value => {
                let guild = client.guilds.find(g => g.name === value.label);
                let served = guild.channels.map(guild => guild.name);
                let served2: vscode.QuickPickItem[] = []
                for (let index = 0; index < served.length; index++) {
                    let item = served[index]
                    served2.push({
                        label: item,
                        description: ""
                    });
                };
                vscode.window.showQuickPick(served2, { placeHolder: "Pick one to send a message to." }).then(valueC => {
                    let guild = client.guilds.find(g => g.name === value.label);
                    let served = guild.channels.find(g => g.name === valueC.label);
                    let document = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
                    let toSend = "```\n" + document + '```'
                    client.createMessage(served.id, toSend);
                    vscode.window.showInformationMessage("Message sent!");
                });
            });
            client.disconnect({ reconnect: false });
        });
        client.connect();
    }

    public uploadCurrentFile() {
        const client = new Client(token);
        client.on("ready", () => {
            let guild_names = client.guilds.map(guild => guild.name);
            let served = guild_names;
            let served2: vscode.QuickPickItem[] = []
            for (let index = 0; index < served.length; index++) {
                let item = served[index]
                served2.push({
                    label: item,
                    description: ""
                });
            };
            vscode.window.showQuickPick(served2, { placeHolder: "Pick one to send a message to." }).then(value => {
                let guild = client.guilds.find(g => g.name === value.label);
                let served = guild.channels.map(guild => guild.name);
                let served2: vscode.QuickPickItem[] = []
                for (let index = 0; index < served.length; index++) {
                    let item = served[index]
                    served2.push({
                        label: item,
                        description: ""
                    });
                };
                vscode.window.showQuickPick(served2, { placeHolder: "Pick one to send a message to." }).then(valueC => {
                    let guild = client.guilds.find(g => g.name === value.label);
                    let served = guild.channels.find(g => g.name === valueC.label);
                    let files: vscode.QuickPickItem[] = []
                    let current_files = fs.readdirSync('./')
                    for (let index = 0; index < current_files.length; index++) {
                        let item = current_files[index]
                        files.push({
                            label: item,
                            description: ""
                        });
                    };
                    client.createMessage(served.id, "", { file: fs.readFileSync(__filename), name: path.basename(__filename) })
                    vscode.window.showInformationMessage("Message sent!");
                });
            });
            client.disconnect({ reconnect: false });
        });
        client.connect();
    }
}


export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "discord" is now active!');
    let discord = new Discord();
    if (token) {
        vscode.commands.registerCommand('extension.sendMessage', () => {
            vscode.window.showInformationMessage("Loading user accounts is slow, please wait some time.");
            discord.sendMessage();
        });
        vscode.commands.registerCommand('extension.uploadFromPath', () => {
            vscode.window.showInformationMessage("Loading user accounts is slow, please wait some time.");
            discord.uploadFromPath();
        });
        vscode.commands.registerCommand('extension.sendSelectionMessage', () => {
            vscode.window.showInformationMessage("Loading user accounts is slow, please wait some time.");
            discord.sendSelectionMessage();
        });
        vscode.commands.registerCommand('extension.uploadCurrentFile', () => {
            vscode.window.showInformationMessage("Loading user accounts is slow, please wait some time.");
            discord.uploadFromPath();
        });
        vscode.commands.registerCommand('extension.uploadFromCurrentDirectory', () => {
            discord.uploadFromCurrentDirectory();
        });
        vscode.commands.registerCommand('extension.tokenChecker', () => {
            vscode.window.showInformationMessage("Loading user accounts is slow, please wait some time.");
            discord.tokenChecker();
        });
    } else {
        vscode.window.showErrorMessage('You have to enter your user token to use this extension.');
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}