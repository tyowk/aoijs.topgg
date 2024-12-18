module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);
    const [id, property = 'username', sep = ', '] = data.inside.splits;

    const manager = d.client.topgg;
    if (!manager) return d.aoiError.fnError(d, 'custom', {}, `Top.gg manager is not defined.`);
    if (!id) return d.aoiError.fnError(d, 'custom', {}, `Please give an invalid bot id`);
  
    const botData = (d.data.botData && d.data.botData?.id === id)
        ? d.data.botData
        : await manager?.getBot(id);

    d.data.botData = botData;
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
