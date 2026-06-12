const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    // Connect to the external service defined in package.json
    const bupa = await cds.connect.to('BusinessPartnerA2X');

    // Register the custom READ handler for the external entity
    this.on('READ', 'A_BusinessPartner', async (req) => {
        try {
            return await bupa.run(req.query);
        } catch (error) {
            req.reject(500, `Failed to fetch data from Business Partner service: ${error.message}`);
        }
    });
});