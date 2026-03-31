sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/capmlr/lrpuicapm/test/integration/pages/ProductsList",
	"com/capmlr/lrpuicapm/test/integration/pages/ProductsObjectPage"
], function (JourneyRunner, ProductsList, ProductsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/capmlr/lrpuicapm') + '/test/flp.html#app-preview',
        pages: {
			onTheProductsList: ProductsList,
			onTheProductsObjectPage: ProductsObjectPage
        },
        async: true
    });

    return runner;
});

