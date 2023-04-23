const axios = require('axios');

const BASE_URL = 'https://api-m.sandbox.paypal.com/v1/';

const getAccessToken = async () => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const auth = {
        username: 'AZ2vK0luRWMX9zzwLs-Ko_B_TJxeHYvIFCgXWcNBt50wmj7oZcUw8n4cf11GgdClTVnYMuEs5vRnxVEk',
        password: 'ENsTK3mMS1OEHi-HP-Lzwu4QYuiiv5no4f6jUFElHAhk3TwLDc1NJXBPrMwVs0K2jyyXpx3cCWbGrUni'
    };
    let res = '';
    try {
        res = await axios.post(BASE_URL + 'oauth2/token',
            new URLSearchParams({
                'grant_type': 'client_credentials'
            }), { auth }
        );
        // data = await axios.post(BASE_URL + 'oauth2/token', { auth }, { headers } );
    } catch (err) {
        console.log('Error getting PayPal access token: ', err.message);
        return res;
    }
    return res.data.access_token;
};

module.exports = class Paypal {
    constructor(config = {}) {
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            ...config
        });
    }

    async getSubscriptionDetails(subscriptionId) {
        const authToken = await getAccessToken();
        const headers = {
            Authorization: `Bearer ${authToken}`
        };

        const { data } = await this.axiosInstance.get(`/billing/subscriptions/${subscriptionId}`, {
            headers
        });
        return data;
    }
}
