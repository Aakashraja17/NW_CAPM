sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Column",
    "sap/m/Label",
    "sap/m/Text",
    "sap/m/ColumnListItem"
], function (Controller, Column, Label, Text, ColumnListItem) {
    "use strict";

    return Controller.extend("com.northui.nwui1.controller.View1", {

        onInit: function () {
            // ✅ Load default entity when app starts
            this.byId("entitySelect").setSelectedKey("Products");
            this.onEntityChange({ getSource: () => this.byId("entitySelect") });
        },

        onEntityChange: async function (oEvent) {
            const sEntity = oEvent.getSource().getSelectedKey(); 
            const oTable = this.byId("entityTable");
            const oModel = this.getView().getModel();
            const oMetaModel = oModel.getMetaModel();

            // Reset old table contents
            oTable.destroyColumns();
            oTable.unbindItems();

            // ✅ STEP 1: Get entity set metadata
            const oEntitySet = await oMetaModel.requestObject(`/${sEntity}`);

            if (!oEntitySet || !oEntitySet.$Type) {
                console.error("Entity Set metadata not found:", sEntity);
                return;
            }

            // ✅ STEP 2: Read the actual Type metadata → contains properties
            const sEntityType = oEntitySet.$Type;              // e.g. "NorthwindService.Products"
            const oEntityType = await oMetaModel.requestObject(`/${sEntityType}`);

            if (!oEntityType) {
                console.error("Entity Type metadata missing:", sEntityType);
                return;
            }

            // ✅ STEP 3: Extract only entity properties (no annotations)
            const aProps = Object.keys(oEntityType)
                .filter(p => !p.startsWith("$"));

            // ✅ STEP 4: Build Columns
            aProps.forEach((prop) => {
                oTable.addColumn(new Column({
                    header: new Label({ text: prop })
                }));
            });

            // ✅ STEP 5: Build Row Template
            const aCells = aProps.map(prop => new Text({ text: `{${prop}}` }));

            const oTemplate = new ColumnListItem({
                cells: aCells
            });

            // ✅ STEP 6: Bind items to entity set
            oTable.bindItems({
                path: `/${sEntity}`,
                template: oTemplate
            });
        }
    });
});