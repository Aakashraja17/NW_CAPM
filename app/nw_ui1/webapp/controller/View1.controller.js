sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Column",
    "sap/m/Label",
    "sap/m/Text",
    "sap/m/ColumnListItem"
], function (Controller, Column, Label, Text, ColumnListItem) {
    "use strict";

    return Controller.extend("com.northui.nwui1.controller.View1", {

        onEntityChange: async function (oEvent) {
            const sEntity = oEvent.getSource().getSelectedKey();  // e.g. "Products"
            const oTable = this.byId("entityTable");
            const oModel = this.getView().getModel(); // OData V4 model
            const oMetaModel = oModel.getMetaModel();

            // Reset old columns + rows
            oTable.destroyColumns();
            oTable.unbindItems();

            // ✅ Fetch entity metadata from V4 metaModel
            const oEntityType = await oMetaModel.requestObject(`/${sEntity}/`);

            if (!oEntityType) {
                console.error("Entity not found in metadata:", sEntity);
                return;
            }

            // ✅ Build columns dynamically
            Object.keys(oEntityType.$Type === undefined ? oEntityType : oEntityType).forEach(prop => {
                if (!prop.startsWith("$")) {
                    oTable.addColumn(new Column({
                        header: new Label({ text: prop })
                    }));
                }
            });

            // ✅ Build row template
            const aCells = Object.keys(oEntityType)
                .filter(prop => !prop.startsWith("$"))
                .map(prop => new Text({ text: `{${prop}}` }));

            const oTemplate = new ColumnListItem({ cells: aCells });

            // ✅ Bind rows dynamically to entity
            oTable.bindItems({
                path: `/${sEntity}`,
                template: oTemplate
            });
        }
    });
});