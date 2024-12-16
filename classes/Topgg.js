const { Manager } = require('topgg.utils');
const { Functions } = require('./Functions.js');
const { LoadCommands } = require('aoi.js');

exports.Topgg = class Topgg extends Manager {
    constructor(client, options = {}) {
        if (!client) throw new Error('Client instance is not defined');
        super(options);
        this.cmd = {
            botVote: new Group(),
            guildVote: new Group(),
        };

        this.client = client;
        this.client.loadVoteEvents = this.loadVoteEvents.bind(this);
        this.client.voteEvent = this.voteEvent.bind(this);
        this.client.topgg = {
            ...this,
            ...options,
            cmd: this.cmd
        };
        
        new Functions(this.client, join(__dirname, '..', 'functions'), options.debug);
        Object.keys(this.cmd).forEach((event) => this.#bindEvents(event));
    }

    loadVoteEvents(dir, debug = this.client.music.debug || false) {
        if (!this.client.loader) this.client.loader = new LoadCommands(this.client);
        this.client.loader.load(this.cmd, dir, debug);
    }

    voteEvent(name, evt = {}) {
        if (!evt || !evt.code) return;
        const cmd = this.cmd[name];
        if (!cmd) return;
        cmd.set(cmd.size, evt);
    }

    #bindEvents(event) {
        this.on(event, async (data) => {
            const commands = this.client?.cmd?.[event] || this.cmd[event];
            if (!commands) return;
            for (const cmd of commands.values()) {
                if (!cmd.channel) continue;
                let channel = this.client.channels.cache.get(cmd.channel);
                let guild = channel ? channel?.guild : null;
                if (!cmd.__compiled__) {
                    if (cmd.channel?.startsWith("$")) {
                        channel = this.client.channels.cache.get((await this.client.functionManager.interpreter(
                            this.client, { guild, channel }, [], { code: cmd.channel, name: 'NameParser' },
                            undefined, true, undefined, { vote }
                        ))?.code);
                    };
                    if (!channel || !guild) continue;
                    await this.client.functionManager.interpreter(
                        this.client, { guild, channel }, [], cmd,
                        undefined, false, channel, { vote }
                    );
                } else {
                    const client = this.client;
                    await cmd.__compiled__({ client, channel, guild, vote });
                };
            };
        });
    }
};
