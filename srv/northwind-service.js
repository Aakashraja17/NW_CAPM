const cds = require('@sap/cds');
const axios = require('axios');

module.exports = async function () {

  // ✅ Your existing handlers (unchanged)
  this.on('READ', 'Products', async req => {
    const url = 'https://services.odata.org/V2/Northwind/Northwind.svc/Products?$format=json';
    const res = await axios.get(url);
    return res.data.d.results;
  });

  this.on('READ', 'Customers', async req => {
    const url = 'https://services.odata.org/V2/Northwind/Northwind.svc/Customers?$format=json';
    const res = await axios.get(url);
    return res.data.d.results;
  });

  this.on('READ', 'Orders', async req => {
    const url = 'https://services.odata.org/V2/Northwind/Northwind.svc/Orders?$format=json';
    const res = await axios.get(url);
    return res.data.d.results;
  });

  this.on('READ', 'Categories', async req => {
    const url = 'https://services.odata.org/V2/Northwind/Northwind.svc/Categories?$format=json';
    const res = await axios.get(url);
    return res.data.d.results;
  });

  // ✅ ADD THIS: Dropdown data endpoint
  this.on('EntityList', async () => {
    return [
      { key: "Products", text: "Products" },
      { key: "Customers", text: "Customers" },
      { key: "Orders", text: "Orders" },
      { key: "Categories", text: "Categories" }
    ];
  });

};