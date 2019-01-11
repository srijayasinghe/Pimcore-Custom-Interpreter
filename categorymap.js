pimcore.registerNS('pimcore.plugin.importdefinitions.interpreters.category_map');

pimcore.plugin.importdefinitions.interpreters.category_map = Class.create(pimcore.plugin.importdefinitions.interpreters.abstract, {

    getLayout : function (fromColumn, toColumn, record, config) {
        this.defaultObjectField = new Ext.form.TextField({
            name: "objectId",
            value: config.path,
            width: 500
        });

        return [{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            fieldLabel: t("Predefined object"),
            items: [
                {
                    xtype: "button",
                    iconCls: "pimcore_icon_search",
                    handler: this.searchForObject.bind(this, 1)
                }, this.defaultObjectField
            ]
        }
        ];
    },

    searchForObject: function(objectIndex) {
        pimcore.helpers.itemselector(false, this.addDataFromSelector.bind(this, objectIndex), {
            type: ["object"]
        });
    },

    addDataFromSelector: function (objectIndex, item) {
        if (item) {
            this.defaultObjectField.setValue(item.id);
        }
    }
});
