module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [id, property = 'username', sep = ', '] = data.inside.splits;

    const botData = await d.client.topgg?.getBot(id);
    const getBotData = {
        invite: botData.invite,
        website: botData.website,
        support: botData.support,
        github: botData.github,
        longdesc: botData.longdesc,
        shortdesc: botData.shortdesc,
        prefix: botData.prefix,
        lib: botData.lib,
        clientid: botData.clientid,
        avatar: botData.avatar,
        id: botData.id,
        username: botData.username,
        date: botData.date,
        server_count: botData.server_count,
        shard_count: botData.shard_count,
        guilds: botData.guilds,
        shards: botData.shards,
        monthlyPoints: botData.monthlyPoints,
        points: botData.points,
        certifiedBot: botData.certifiedBot,
        owners: botData.owners?.join(sep),
        tags: botData.tags?.join(sep),
        bannerUrl: botData.bannerUrl,
        donatebotguildid: botData.donatebotguildid
    };

    data.result = getBotData[property];
    return {
        code: d.util.setCode(data)
    }
};
