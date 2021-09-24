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
			}
		});
	});
