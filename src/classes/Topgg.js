const { Manager } = require('topgg.utils');
const { Functions } = require('./Functions.js');
const { LoadCommands } = require('aoi.js');
const { Group } = require('@aoijs/aoi.structures');
const { join } = require('node:path');

exports.Topgg = class Topgg extends Manager {
    constructor(client, options = {}) {
        if (!client) throw new Error('Client instance is not defined');
        super(options);
        this.cmd = {
            bot: new Group(),
            guild: new Group(),
            error: new Group(),
            ready: new Group()
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
        return this;
    }

    voteEvent(name, evt = {}) {
        if (!(evt || name) || !(evt?.code || name?.code)) return;
        const cmd = this.cmd[name || evt.type || name.type];
        if (!cmd || !(cmd instanceof Group)) return;
        cmd.set(cmd.size, evt);
        return this;
    }

    #bindEvents(event) {
        this.on(event, async (vote) => {
            const commands = this.cmd[event];
            if (!commands) return;
            for (const cmd of commands.values()) {
                let channel = this.client.channels.cache.get(cmd.channel);
                let guild = channel ? channel.guild : null;
                let member = guild ? guild.members.cache.get(vote.userId) : null;
                let author = this.client.users.cache.get(vote.userId);
                
                if (!cmd.__compiled__) {
                    if (cmd.channel?.startsWith("$")) {
                        channel = this.client.channels.cache.get((await this.client.functionManager.interpreter(
                            this.client, { guild, channel, author, member }, [], { code: cmd.channel, name: 'NameParser' },
                            undefined, true, undefined, { vote }
                        ))?.code);
                        guild = channel ? channel.guild : null;
                        member = guild ? guild.members.cache.get(vote.userId) : null;
                    };

                    if (!channel) continue;
                    await this.client.functionManager.interpreter(
                        this.client, { guild, channel, author, member }, [], cmd,
                        undefined, false, channel, { vote }
                    );
                } else {
                    const client = this.client;
                    await cmd.__compiled__({ client, channel, guild, author, member, vote });
                };
            };
        });
    }
};
