sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/library",
	"sap/ui/core/Locale",
	"sap/ui/core/LocaleData",
	"sap/ui/model/type/Currency",
	"sap/m/ObjectAttribute"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel, mobileLibrary, Locale, LocaleData, Currency, ObjectAttribute) {
		"use strict";

		return Controller.extend("databinding.controller.SubView", {
			onInit: function () {
				const oView = this.getView();
				const oProductModel = new JSONModel(this.getOneWayModelData());
				oProductModel.loadData("./model/Products.json");
				oProductModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
				oView.setModel(oProductModel, "products");
				oView.setModel(new JSONModel(this.getOneWayModelData()));
			},

			formatStockValue: function(fUnitPrice, iStockLevel, sCurrCode) {
				const sBrowserLocale = sap.ui.getCore().getConfiguration().getLanguage();
				const oLocale = new Locale(sBrowserLocale);
				const oLocaleData = new LocaleData(oLocale);
				const oCurrency = new Currency(oLocaleData.mData.currencyFormat);
				return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");
	
			},

			getOneWayModelData: function() {
				return {
					priceThreshold: 20,
					currencyCode: "EUR"
				};
			},

			onItemSelected: function(oEvent) {
				const oSelectedItem = oEvent.getSource();
				const oContext = oSelectedItem.getBindingContext("products");
				console.log(oContext);
				const oSelectedItemObj = oContext.getObject();
				console.log(oSelectedItemObj);
				console.log(oContext.getPath());
				const sPath = oContext.getPath();
				const oProductDetailPanel = this.byId("productDetailsPanel");
				oProductDetailPanel.bindElement({ path: sPath, model: "products" });
			},

			productListFactory : function(sId, oContext) {
				let oUIControl;
	
				// Decide based on the data which dependent to clone
				if (oContext.getProperty("UnitsInStock") === 0 && oContext.getProperty("Discontinued")) {
					// The item is discontinued, so use a StandardListItem
					oUIControl = this.byId("productSimple").clone(sId);
				} else {
					// The item is available, so we will create an ObjectListItem
					oUIControl = this.byId("productExtended").clone(sId);
					// The item is temporarily out of stock, so we will add a status
					if (oContext.getProperty("UnitsInStock") < 1) {
						oUIControl.addAttribute(new ObjectAttribute({
							text : {
								path: "i18n>outOfStock"
							}
						}));
					}
				}
	
				return oUIControl;
			}

		});
	});
