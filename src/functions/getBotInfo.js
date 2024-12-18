module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [id, property = 'username', sep = ', '] = data.inside.splits;

    const manager = d.client.topgg;
    if (!manager) return d.aoiError.fnError(d, 'custom', {}, `Top.gg manager is not defined.`);
    
    const botData = await manager?.getBot(id);
    if (!botData) return d.aoiError.fnError(d, 'custom', {}, `Bot with id "${id}" not found`);

    if (property === 'owners') {
        data.result = botData.owners?.join(sep);
    } else if (property === 'tags') {
        data.result = botData.tags?.join(sep);
    } else {
        data.result = botData[property]
    };
    
    return {
        code: d.util.setCode(data)
    };
};
