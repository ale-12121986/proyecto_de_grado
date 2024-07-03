import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Medicion } from '../interfaces/medicion';
import { DatoTabla } from "../interfaces/dato-tabla";
import { Observable, Subscription, interval } from 'rxjs';
import Chart from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { MedicionService } from '../services/medicion.service';
import { AlertController, NavController } from '@ionic/angular';
import domtoimage from 'dom-to-image'; // Importar dom-to-image
;
@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.page.html',
  styleUrls: ['./medicion.page.scss'],
})
export class MedicionPage implements OnInit {
  valorABuscar:Medicion;
  mostrarTabla: boolean = false;
  mostrarGrafica: boolean = false;
  id:any;
  barChart: any;
  medidasTiempoReal:Medicion;
  mediciones:DatoTabla[]=[];
  xValues:number[]=[];
  chartAlineacion: any;
  chartPeralte: any;
  chartNivelIzquierdo: any;
  chartNivelDerecho: any;
  Observables:Observable<any>
  subscription: Subscription| null=null;
  @ViewChild('barCanvas', { static: true }) barCanvas!:ElementRef<HTMLCanvasElement>; 
  @ViewChild('grafAlineacion', {  }) grafAlineacion!: ElementRef<HTMLCanvasElement>;
  @ViewChild('grafPeralte', { }) grafPeralte!:ElementRef<HTMLCanvasElement>;
  @ViewChild('grafNivelIzquierdo', { }) grafNivelIzquierdo!:ElementRef<HTMLCanvasElement>;
  @ViewChild('grafNivelDerecho', { }) grafNivelDerecho!:ElementRef<HTMLCanvasElement>;

  constructor(private activateRoutes: ActivatedRoute, private _medicionService:MedicionService,private alertController: AlertController,
              private navCtrl: NavController ) {
    this.id=0;
    this.Observables=interval(3000);
    this.subscription ;
    this.medidasTiempoReal={idMedicion:0, alineacion:0, peralte:0, nivel_izquierdo: 0, nivel_derecho: 0, distancia: 0, idtrabajo2: 0, tipoMedicion:0,};
    this.valorABuscar={idMedicion:0, alineacion:0, peralte:0, nivel_izquierdo: 0, nivel_derecho: 0, distancia: 0, idtrabajo2: 0, tipoMedicion:0};
   }
   
  ngOnInit() {
    this.id = this.activateRoutes.snapshot.paramMap.get("id"); 
    this.valorABuscar.idMedicion = this.id;
  }
  startListening() {
    if (this.subscription) {
      this.subscription.unsubscribe();  
     }
    if (!this.subscription) {
      this.barChartMethod();
      this.subscription = this.Observables.subscribe(()=>{
      this._medicionService.getResivirDatoTiempoReal()
        .then((valorMedicion)=>{
          this.medidasTiempoReal = valorMedicion;
          this.updateCharts(this.medidasTiempoReal);
        })
      });  
    }
  }
  ngOnDestroy() {
  
    this.subscription?.unsubscribe();    
  }
  barChartMethod() {   
    this.chartAlineacion = new Chart(this.grafAlineacion.nativeElement,  {
      type: 'line',
      data: {
        labels: this.mediciones.map(objeto=>objeto.distancia),
        datasets: [
          {
            label: 'Alieacion',
            data: this.mediciones.map(objeto=>objeto.alineacion),
            borderColor: "red",
            fill: "false",
            borderDash: [5, 5] // Línea discontinua
          }
        ],
      },
      options: {
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Distancia' // Aquí puedes cambiar el título del eje x
            }
          }],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              }
            }
          ]
        }
      }
    });

    this.chartPeralte = new Chart(this.grafPeralte.nativeElement, {
      type: 'line',
      data: {
        labels: this.mediciones.map(objeto=>objeto.distancia),
        datasets: [
          {
            label: 'Peralte',
            data: this.mediciones.map(objeto=>objeto.peralte),
            borderColor: "blue",
            fill: "false",
            borderDash: [5, 5] // Línea discontinua
          }
        ],
      },
      options: {
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Distancia' // Aquí puedes cambiar el título del eje x
            }
        }],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              }
            }
          ]
        }
      }
    });

      this.chartNivelIzquierdo = new Chart(this.grafNivelIzquierdo.nativeElement, {
      type: 'line',
      data: {
        labels: this.mediciones.map(objeto=>objeto.distancia),
        datasets: [
          {
            label: 'Nivel Izquierdo',
            data: this.mediciones.map(objeto=>objeto.nivel_izquierdo),
            borderColor: "green",
            fill: "false",
            borderDash: [5, 5] // Línea discontinua
          },
        ],
      },
      options: {
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Distancia' // Aquí puedes cambiar el título del eje x
            }
        }],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              }
            }
          ]
        }
      }
    });

    this.chartNivelDerecho = new Chart(this.grafNivelDerecho.nativeElement, {
      type: 'line',
      data: {
        labels: this.mediciones.map(objeto=>objeto.distancia),
        datasets: [
          {
            label: 'Nivel derecho',
            data: this.mediciones.map(objeto=>objeto.nivel_derecho),
            borderColor: "purple",
            fill: "false",
            borderDash: [5, 5] // Línea discontinua
          },
        ],
      },
      options: {
        scales: {     
          xAxes:[{
            scaleLabel: {
              display: true,
              labelString: 'Distancia' // Aquí puedes cambiar el título del eje x
            }
        }],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              }
            }
          ]
        }
      }
    });
  }

  graficaGuardada(){

    // Update Alineacion Chart
    this.chartAlineacion.data.labels = this.mediciones.map(objeto=>objeto.distancia);
    this.chartAlineacion.data.datasets[0].data = this.mediciones.map(objeto=>objeto.alineacion);
    this.chartAlineacion.update();
  
    // Update Peralte Chart
    this.chartPeralte.data.labels = this.mediciones.map(objeto=>objeto.distancia);
    this.chartPeralte.data.datasets[0].data = this.mediciones.map(objeto=>objeto.peralte);
    this.chartPeralte.update();
  
    // Update Nivel Izquierdo Chart
    this.chartNivelIzquierdo.data.labels = this.mediciones.map(objeto=>objeto.distancia);
    this.chartNivelIzquierdo.data.datasets[0].data = this.mediciones.map(objeto=>objeto.nivel_izquierdo);
    this.chartNivelIzquierdo.update();
  
    // Update Nivel Derecho Chart
    this.chartNivelDerecho.data.labels = this.mediciones.map(objeto=>objeto.distancia);
    this.chartNivelDerecho.data.datasets[0].data  = this.mediciones.map(objeto=> objeto.nivel_derecho);
    this.chartNivelDerecho.update();
     
    }
  ngAfterViewInit(){  
    
  }
  async mostrarDatosGrafico(){
    const alert = await this.alertController.create({
      header:'indicar recorrido',
      buttons:[
        {
          text:'Recorrido 1',
          handler:()=>{
            this.valorABuscar.tipoMedicion = 0;
            this.buscarMedicion(this.valorABuscar);
            this.barChartMethod();
            this.mostrarGrafica = true;
            this.mostrarTabla = false;
            this.graficaGuardada();
          }
        },
        {
          text:'Recorrido 2',
          handler:()=>{
            this.valorABuscar.tipoMedicion = 1;
            this.buscarMedicion(this.valorABuscar);
            this.barChartMethod();
            this.mostrarGrafica = true;
            this.mostrarTabla = false;
            this.graficaGuardada();
          }
        },
        {
          text:'Recorrido 3',
          handler:()=>{
            this.valorABuscar.tipoMedicion = 2;
            this.buscarMedicion(this.valorABuscar);
            this.barChartMethod();
            this.mostrarGrafica = true;
            this.mostrarTabla = false;
            this.graficaGuardada();
          }
        },
      ]
    }); 
    await alert.present();  
  }
  
  buscarMedicion(valor:Medicion){
    console.log(valor);
    this._medicionService.getResivirMedicion(valor)
    .then((valorMedicion)=>{
      this.mediciones = valorMedicion;
      
    })
    .catch((error)=>console.log(error))
  }

  async tipoRecorrido(){
    
  }

  async mostrarDatosTabla(){
    const alert = await this.alertController.create({
      header:'indicar recorrido',
      buttons:[
        {
          text:'Recorrido 1',
          handler:()=>{
            this.valorABuscar.tipoMedicion = 0;
            this.buscarMedicion(this.valorABuscar);
            this.mostrarGrafica = false;
            this.mostrarTabla = true;
          }
        },
        {
          text:'Recorrido 2',
          handler:()=>{
            this.valorABuscar.tipoMedicion = 1;
            this.buscarMedicion(this.valorABuscar);
            this.mostrarGrafica = false;
            this.mostrarTabla = true;
          }
        },
        {
          text:'Recorrido 3',
          handler:()=>{
            this.valorABuscar.tipoMedicion = 2;
            this.buscarMedicion(this.valorABuscar);
            this.mostrarGrafica = false;
            this.mostrarTabla = true;
          }
        },
      ]
    }); 
    await alert.present();  

  }
  updateCharts(data:Medicion) {
    // Update Alineacion Chart
    this.chartAlineacion.data.labels.push(data.distancia);
    this.chartAlineacion.data.datasets[0].data.push(data.alineacion);
    this.chartAlineacion.update();
    
    // Update Peralte Chart
    this.chartPeralte.data.labels.push(data.distancia);
    this.chartPeralte.data.datasets[0].data.push(data.peralte);
    this.chartPeralte.update();

    // Update Nivel Izquierdo Chart
    this.chartNivelIzquierdo.data.labels.push(data.distancia);
    this.chartNivelIzquierdo.data.datasets[0].data.push(data.nivel_izquierdo);
    this.chartNivelIzquierdo.update();

    // Update Nivel Derecho Chart
    this.chartNivelDerecho.data.labels.push(data.distancia);
    this.chartNivelDerecho.data.datasets[0].data.push(data.nivel_derecho);
    this.chartNivelDerecho.update();
  }

  atras(){
    this.navCtrl.back();
  }

  // Función para convertir datos a formato CSV
  unparseCSV(data: any[]): string {
    if (data.length === 0) {
      return '';
    }

    const headers = Object.keys(data[0]);
    const csv = [headers.join(',')];

    for (const entry of data) {
      const line = headers.map(header => this.sanitizeForCSV(entry[header])).join(',');
      csv.push(line);
  }

  return csv.join('\n');  
  }

// Función para limpiar y escapar datos para el formato CSV
  sanitizeForCSV(value: any): string {
    if (typeof value === 'string') {
      // Si el valor contiene comas, comillas dobles o saltos de línea, lo encerramos entre comillas dobles
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      } else {
        return value;
      }
    } else {
      return value.toString();
    }
  }

  exportToExcel() {
    console.log(this.mediciones);
    let csvData = this.unparseCSV(this.mediciones);
    // const csvData = this.convertToCSV(this.mediciones);
    var blob = new Blob([csvData]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
  }
  convertToCSV(mediciones: any[]) {
    throw new Error('Method not implemented.');
  }
  exportChartsAsImages(){
      this.exportChartAsImage(this.grafAlineacion, 'grafico_alineacion');
      this.exportChartAsImage(this.grafPeralte, 'grafico_peralte');
      this.exportChartAsImage(this.grafNivelIzquierdo, 'grafico_nivel_izquierdo');
      this.exportChartAsImage(this.grafNivelDerecho, 'grafico_nivel_derecho'); 
  }
 // Método para exportar la gráfica como imagen
  exportChartAsImage(chartElement: ElementRef<HTMLCanvasElement>, fileName: string) {
    domtoimage.toBlob(chartElement.nativeElement).then((blob: any) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName + '.png'; // Cambia la extensión según el formato deseado (png, jpg, etc.)
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
