module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [id] = data.inside.splits;

    const manager = d.client.topgg;
    if (!manager) return d.aoiError.fnError(d, 'custom', {}, `Top.gg manager is not defined.`);
    if (!id) return d.aoiError.fnError(d, 'custom', {}, `Please give an invalid bot id`);
  
    const botData = await manager?.getBot(id);
    if (!botData) return d.aoiError.fnError(d, 'custom', {}, `Bot with id "${id}" not found`);

    data.result = JSON.stringify(botData || {});
    return {
        code: d.util.setCode(data)
    };
};