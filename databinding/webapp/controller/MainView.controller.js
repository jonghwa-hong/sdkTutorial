sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("databinding.controller.MainView", {
			onInit: function () {
				// object literal을 JSONModel에 전달하고 생성된 JSONModel 인스턴스를 oModel 변수에 저장
				const oModel = new JSONModel({
					greetingText: 'Hello World!'
				});
				// 현재  view에 model을 설정
				this.getView().setModel(oModel, 'jsonModel'); 
				// model data를 text property에 binding
				const oBindingInfo = {path: 'jsonModel>/greetingText'}
				this.byId('textbinding').bindText(oBindingInfo);

				// two-way databinding
				this.doTwoWayDatabinding();
			},

			doTwoWayDatabinding: function() {
				const oModel = new JSONModel(this.getTwoWayModelData());
				this.getView().setModel(oModel);
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
				this.getView().getModel().setData(this.getTwoWayModelData());
			},

			getTwoWayModelData: function() {
				return {
					firstName: "Jonghwa",
					lastName: "Hong",
					enabled: true,
					panelHeaderText: "Two-way Data Binding"
				};
			}
		});
	});
