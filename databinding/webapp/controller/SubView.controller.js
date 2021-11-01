sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/library",
	"sap/ui/core/Locale",
	"sap/ui/core/LocaleData",
	"sap/ui/model/type/Currency"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel, mobileLibrary, Locale, LocaleData, Currency) {
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
			}

		});
	});
