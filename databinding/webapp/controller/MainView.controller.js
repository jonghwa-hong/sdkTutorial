sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/BindingMode",
	"sap/ui/model/resource/ResourceModel",
	"sap/m/library"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel, BindingMode, ResourceModel, mobileLibrary) {
		"use strict";

		return Controller.extend("databinding.controller.MainView", {
			onInit: function () {
				sap.ui.getCore().getMessageManager().registerObject(this.getView(), true);
				// object literal을 JSONModel에 전달하고 생성된 JSONModel 인스턴스를 oModel 변수에 저장
				const oModel = new JSONModel({
					greetingText: 'Hello World!'
				});
				
				const oResourceModel = new ResourceModel({
					bundleName: 'databinding.i18n.i18n',
					supportedLocales: ['', 'de'],
					fallbackLocale: ''
				});

				console.log(sap.ui.getCore().getConfiguration().getLanguage());


				this.getView().setModel(oResourceModel, 'i18n');
				console.log(oResourceModel.getResourceBundle());
				// 현재  view에 model을 설정
				this.getView().setModel(oModel, 'jsonModel'); 
				// model data를 text property에 binding
				const oBindingInfo = {path: 'jsonModel>/greetingText'}
				this.byId('textbinding').bindText(oBindingInfo);

				// two-way databinding
				this.doTwoWayDatabinding();
				// this.doOneWayDatabinding();
			},

			doOneWayDatabinding: function() {
				const oModel = new JSONModel(this.getOwoWayModelData());
				oModel.setDefaultBindingMode(BindingMode.OneWay);
				this.getView().setModel(oModel);
				console.log(oModel);
			},

			doTwoWayDatabinding: function() {
				const oModel = new JSONModel(this.getTwoWayModelData());
				this.getView().setModel(oModel);
				// sap.ui.getCore().setModel(oModel);
				console.log(oModel);
			},

			checkCurrentDataModel: function() {
				const oModel = this.getView().getModel();
				console.log('checkCurrentDataModel!');
				console.log(oModel);
				console.log(oModel.getData());
				// ... model 관련된 다양한 메소드 존재 📝
			},

			refreshDataModel: function() {
				console.log('refreshDataModel!');
				// this.getView().getModel().setData(this.getTwoWayModelData());
				this.getView().getModel().setData(this.getOwoWayModelData()); // 기존 data model과 동일하기에 refreash해도 ui 변경 X
			},

			getOwoWayModelData: function() {
				return {
					firstName: "Jonghwa",
					lastName: "Hong",
					enabled: true,
					panelHeaderText: "One-way Data Binding",
					address: {
						street: "sangdo",
						city: "seoul",
						zip: "123456",
						country: "kr"
					},
					salesAmount: 12345.6789,
					currencyCode: "EUR"
				};
			},

			getTwoWayModelData: function() {
				return {
					firstName: "Jonghwa",
					lastName: "Hong",
					enabled: true,
					panelHeaderText: "Two-way Data Binding",
					address: {
						street: "sangdo",
						city: "seoul",
						zip: "123456",
						country: "kr"
					},
					salesAmount: 12345.6789,
					currencyCode: "EUR"
				};
			},

			formatMail: function(sFirstName, sLastName) {
				const oBundle = this.getView().getModel('i18n').getResourceBundle();
        return mobileLibrary.URLHelper.normalizeEmail(
          sFirstName + '.' + sLastName + '@example.com',
          oBundle.getText('mailSubject', [sFirstName]),
          oBundle.getText('mailBody'));
      },

			onNavPage: function(oEvent) {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteSubView");
			}
		});
	});
