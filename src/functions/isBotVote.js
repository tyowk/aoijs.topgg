module.exports = (d) => {
    const data = d.util.aoiFunc(d);
    const manager = d.client.topgg;
    if (!manager) return d.aoiError.fnError(d, 'custom', {}, `Top.gg manager is not defined.`);
    
    const result = (d.data.vote?.bot && !d.data.vote?.guild) ? true : false;
    
    /**
     * returns "true" or "false"
     */
    
    data.result = result;
    return {
        code: d.util.setCode(data)
    }
}
