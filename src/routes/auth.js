export default {
    method: 'post',
    path: 'auth',
    handler: async (req, res) => {
        const method = req.query.method;
        res.json({ method });
    }
}