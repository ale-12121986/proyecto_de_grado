import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Chart  from 'chart.js';
import { Medicion } from '../interfaces/medicion';
import { MedicionService } from '../services/medicion.service';
import { SocketService } from "../services/socket.service";
// import { io } from 'socket.io-client';



@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.page.html',
  styleUrls: ['./medicion.page.scss'],
})
export class MedicionPage implements OnInit, OnDestroy {
  
  @ViewChild('barCanvas', { static: true }) barCanvas!: ElementRef<HTMLCanvasElement>; 
  id:any;
  barChart: any;
  mediciones:any[]=[];
  xValues:number[]=[];
  chartAlineacion: any;
  chartPeralte: any;
  chartNivelIzquierdo: any;
  chartNivelDerecho: any;
 
  @ViewChild('grafAlineacion', { static: true }) grafAlineacion!: ElementRef<HTMLCanvasElement>;
  @ViewChild('grafPeralte', { static: true }) grafPeralte!: ElementRef<HTMLCanvasElement>;
  @ViewChild('grafNivelIzquierdo', { static: true }) grafNivelIzquierdo!: ElementRef<HTMLCanvasElement>;
  @ViewChild('grafNivelDerecho', { static: true }) grafNivelDerecho!: ElementRef<HTMLCanvasElement>;

  constructor(private activateRoutes: ActivatedRoute, private _medicionService:MedicionService, private _socketService: SocketService) {
    this.id=0;
  }

  ngOnInit() {
    this.id = this.activateRoutes.snapshot.paramMap.get("id");
    console.log('ID del trabajo a mostrar:' + this.id);
    this._medicionService.getResivirMedicion(this.id)
    .then((valorMedicion)=>{
      this.mediciones = valorMedicion;
      // this.barChartMethod();
      // this.initCharts();
    })
    .catch((error)=>console.log(error));
    // this._mqttService.suscribe();
  }

  ngOnDestroy(): void {
      
  }
  ngAfterViewInit() {
    
  }
  graficaGuardada(){
    this.barChartMethod();
  }
  
  startListening() {
    // this._socketService.on('mqttData', (data) => {
    //   this.updateCharts(data);
    // });
  }

  barChartMethod() { 
  const alineacionCtx = this.grafAlineacion.nativeElement.getContext('2d');
  const peralteCtx = this.grafPeralte.nativeElement.getContext('2d');
  const nivelIzquierdoCtx = this.grafNivelIzquierdo.nativeElement.getContext('2d');
  const nivelDerechoCtx = this.grafNivelDerecho.nativeElement.getContext('2d');
  const myChartAlineacion = new Chart(this.grafAlineacion.nativeElement,  {
      type: 'line',
      data: {
        labels: this.mediciones.map(objeto=>objeto.distancia),
        datasets: [
          {
            label: 'Alieacion',
            data: this.mediciones.map(objeto=>objeto.alineacion),//E
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
    const myChartPeralte = new Chart(this.grafPeralte.nativeElement, {
      type: 'line',
      data: {
        labels: this.mediciones.map(objeto=>objeto.distancia),
        datasets: [
          {
           label: 'Peralte',
            data: this.mediciones.map(objeto=>objeto.peralte),//E
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

     const myChartNivelIzquierdo = new Chart(this.grafNivelIzquierdo.nativeElement, {
      type: 'line',
      data: {
        labels: this.mediciones.map(objeto=>objeto.distancia),
        datasets: [
          {
           label: 'Nivel Izquierdo',
            data: this.mediciones.map(objeto=>objeto.nivel_izquierdo),//E
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
    const myChartNivelDerecho = new Chart(this.grafNivelDerecho.nativeElement, {
      type: 'line',
      data: {
        labels: this.mediciones.map(objeto=>objeto.distancia),
        datasets: [
          {
           label: 'Nivel derecho',
            data: this.mediciones.map(objeto=>objeto.nivel_derecho),//E
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
  updateCharts(data:any) {
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

}
