module.exports = (d) => {
    const data = d.util.aoiFunc(d);
    const manager = d.client.topgg;
    if (!manager) return d.aoiError.fnError(d, 'custom', {}, `Top.gg manager is not defined.`);
    
    const result = d.data?.vote?.type;
    if (!result) return d.client.returnCode(d, data);

    /**
     * returns "test" or "upvote"
     */
    
    data.result = result;
    return {
        code: d.util.setCode(data)
    }
}
