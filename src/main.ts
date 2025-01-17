/** @format */

import { XernerxClient } from 'xernerx';
import { config } from 'dotenv';
import settings from './config.js';

config();

const client = new (class Client extends XernerxClient<typeof settings> {
	constructor() {
		super(
			{ intents: ['Guilds', 'MessageContent', 'GuildMessages'] },
			{
				// debug: true,
				token: process.env.betaToken,
				log: {
					// type: 'dynamic',
					levels: {
						info: true,
						warn: true,
						error: true,
						debug: true,
					},
				},
			},
			settings
		);

		this.modules.eventHandler.loadEvents({
			directory: './dist/events',
		});

		this.modules.eventHandler.loadStore();

		this.modules.commandHandler.loadMessageCommands({
			directory: './dist/commands/message',
			prefix: '!',
		});

		this.modules.dashboardHandler.loadDashboard();
	}
})();

client;
