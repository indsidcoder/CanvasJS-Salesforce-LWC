import { LightningElement } from 'lwc';
import CanvasJS from '@salesforce/resourceUrl/CanvasJS';
import { loadScript } from 'lightning/platformResourceLoader';

export default class Salesforce_canvasjs extends LightningElement {
    
    canvasjsInitialized = false;
    chart;
    error;
    renderedCallback() {
        if (this.canvasjsInitialized) {
            return;
        }
        this.canvasjsInitialized = true;

        loadScript(this, CanvasJS).then(() => {
            const container = this.template.querySelector('[data-id="chartContainer"]');
            this.chart = new window.CanvasJS.Chart(container, {
            animationEnabled: true,
                title: {
                    text: "Basic Column Chart in Salesforce LWC"
                },
                data: [{
                    type: "column",
                    dataPoints: [
                        { y: 41, label: "Apple" },
                        { y: 55, label: "Mango" },
                        { y: 50, label: "Orange" },
                        { y: 65, label: "Banana" },
                        { y: 95, label: "Pineapple" },
                        { y: 68, label: "Pears" },
                        { y: 28, label: "Grapes" },
                        { y: 34, label: "Lychee" },
                        { y: 14, label: "Jackfruit" }
                    ]
                }]
            });
            this.chart.render();
        }).catch((error) => {
            this.error = error;
        });
    }
}