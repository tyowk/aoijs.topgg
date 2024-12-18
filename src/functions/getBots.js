module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    let [limit = 50, offset = 0, sort, fields] = data.inside.splits;
    limit = Number(limit);
    offset = Number(offset);
    
    const manager = d.client.topgg;
    if (!manager) return d.aoiError.fnError(d, 'custom', {}, `Top.gg manager is not defined.`);
    
    if (typeof limit !== 'number') return d.aoiError.fnError(d, 'custom', {}, `Please provide a valid limit number`);
    if (typeof offset !== 'number') return d.aoiError.fnError(d, 'custom', {}, `Please provide a valid offset number`);
    
    const botsData = await manager?.getBots(limit, offset, sort, fields);
    if (!botsData.results?.length) return d.aoiError.fnError(d, 'custom', {}, `Cannot finding any bots`);

    data.result = JSON.stringify(botsData.results || []);
    return {
        code: d.util.setCode(data)
    };
};
