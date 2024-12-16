module.exports = (d) => {
    const data = d.util.aoiFunc(d);
    const manager = d.client.topgg;
    if (!manager) return d.aoiError.fnError(d, 'custom', {}, `Top.gg manager is not defined.`);
    
    const result = d.data.randoms?.vote?.type;
    if (!result) return d.client.returnCode(d, data);
    
    data.result = result;
    return {
        code: d.util.setCode(data)
    }
}
