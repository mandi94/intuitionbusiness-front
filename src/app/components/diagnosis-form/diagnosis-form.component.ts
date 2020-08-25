import { Component, OnInit,ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {AbstractControl, FormBuilder, FormGroup, Validators,FormControl, FormArray} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';


export interface Question{
  id:String
  description:String,
  option:String[],
  type:String,
  nameId:String
}

@Component({
  selector: 'app-diagnosis-form',
  templateUrl: './diagnosis-form.component.html',
  styleUrls: ['./diagnosis-form.component.css']
})


export class DiagnosisFormComponent implements OnInit {
  // Stepper work enable
  workDisabled = true;
  selectedIndex: number = 0;
  selectedStep:string='authorship'

  autorShipSelect= true
  workSelect     = false
  experienceSelect= false

  autorShipEditable=false
  workEditable=false
  experienceEditable=false

  // Autoria
  authorshipQuestionOne :Question={id: '1', description: '¿Eres el autor de la historia?',option:[],type:'slide-toggle',nameId:'historyAutor'}
  authorshipQuestionTwo :Question={id: '2', description: '¿Eres el representante legal de la historia?',option:[],type:'slide-toggle',nameId:'historyRepresent'}
  authorshipQuestionThree :Question={id: '3', description: 'Si no, ¿Tienes la autorización del autor o representante legal para inscribirla en WePlot?',option:[],type:'slide-toggle',nameId:'historyAutorization'}

  // Sobre la Obra
  workQuestionOne:Question= {id: '4', description: '¿Cuál es el título de la historia?',option:[],type:'input',nameId:''}
  workQuestionTwo:Question= {id: '5', description: 'Tu historia es:', option:['Un libro ya publicado de ficción','Un guión',
                  'Un argumento','Una bíblia audiovisual','Un proyecto audiovisual',
                  'Una adaptación literaria','Un formato','Un remake','Un reportaje',
                  'Un cómic','Una correspondencia','Una propiedad intelectual','Un personaje real',
                  'Un texto literario no publicado','Una historia de vida','Una idea aún no escrita',
                  'Un boceto de algo que creo potente'],type:'radio-group',nameId:''}
  workQuestionThree:Question=  {id: '6', description: 'Para ti, tu historia tiene potencial para ser:',
                                option:['Una película','Una miniserie','Una serie',
                                        'Una animación','Un documental','Un reality show','Una webserie',
                                        'Un \'branded content\'','Un videojuego','Factual'
                                                    ],type:'radio-group',nameId:''}

  // Sobre la experiencia
  experienceQuestionOne:Question={id: '5', description: '¿Consideras que tienes experiencia previa con proyectos audiovisuales?',option:[],type:'slide-toggle',nameId:''}
  experienceQuestionTwo:Question=    {id: '6', description: '¿Consideras que tu proyecto está listo para presentarse a players del sector audiovisual?',option:[],type:'slide-toggle',nameId:''}
  experienceQuestionThree:Question=     {id: '7', description: 'De 0 a 5, ¿cuál consideras el estado de desarrollo de tu proyecto?',option:[],type:'slider',nameId:''}
  experienceQuestionFour:Question=    {id: '8', description: 'De 0 a 5, ¿cuánto crees que te falta trabajar en tu proyecto para que sea presentable a un player?',option:[],type:'slider',nameId:''}
  experienceQuestionFive:Question= {id: '9', description: '¿Cuáles consideras que son las principales fortalezas de tu proyecto AL DIA DE HOY?',
                                      option:['La trama','El formato'],type:'chip',nameId:'strengthsControl'}
  experienceQuestionSix:Question={id: '10', description: '¿Cuáles consideras que son las principales debilidades de tu proyecto AL DIA DE HOY?',
  option:['El texto','La estructura'],type:'chip',nameId:'weaknessesControl'}
  experienceQuestionSeven:Question=     {id: '11', description: '¿Ya has presentado tu proyecto a algún player?',option:[],type:'slide-toggle',nameId:''}
  experienceQuestionEight:Question=    {id: '12', description: '¿Cuáles?',option:[],type:'input',nameId:''}
  experienceQuestionNine:Question=     {id: '13', description: '¿En qué idioma presentas tu proyecto?',option:['ESP','POR' ,'ENG'],type:'button-toggle',nameId:''}
  experienceQuestionTen:Question= {id: '14', description: 'Seleccione 1 o varios servicios listados abajo, ¿Cuáles te parecen importantes para que tu historia se vuelva un proyecto con potencial',
                                    option:['Diagnostico profesional','Corrección de texto y estilo','Brainstorming','Doctoring (análisis de guión)',
                                            'Escritura de Guión','Escritura de Sinopsis y tratamiento','Adaptación Literaria','Investigación temática',
                                            'Texto de PitchDoc (carpeta de ventas)','Edición / Revisión de Teaser','VideoPitch','MoodBoard / MoodTeaser',
                                            'Presupuesto y Cronograma','Storyboard','Representación y Venta','Estrategia de Coproducción Internacional',
                                            'Escritura Creativa y Storytelling','Ghost Writer','Creative Producer','Taller de Pitch','Desarrollo de \"biblia\"',
                                            'Estructura de Serie: Arco General, Sinopsis Capitulares','Reestructura: Revisión y ajuste de proyecto en desarrollo',
                                            'Escritura de "pareceres" literarios con foco en audiovisual','Consultorías temáticas con especialistas','Diseño Gráfico de PitchDoc (carpeta de ventas)',
                                            'Análisis Técnico (Desglose y Presupuesto)','Análisis Técnico para producción internacional','Diseño de Plan de Financiación y/o Coproducción',
                                            'Estrategia de Laboratorios, Convocatorias y Festivales','Prospección de productora y de coproductora'],type:'checkboxgroup',nameId:''}

  updateWorkForm(e) {
    if (this.workDisabled) {
      this.workDisabled = false;
    }
  }

  weaknessesChipControl = new FormControl([]);
  strengthsChipControl = new FormControl([]);

  onWeaknessesRemoved(option: string) {
    const options = this.weaknessesChipControl.value as string[];
    this.removeFirst(options, option);
    this.weaknessesChipControl.setValue(options); 
  }

  onStrengthsRemoved(option: string) {
    const options = this.strengthsChipControl.value as string[];
    this.removeFirst(options, option);
    this.strengthsChipControl.setValue(options); 
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  updateStep(){
    this.autorShipSelect= this.selectedStep=='authorship' ? true:false
    this.workSelect     = this.selectedStep=='work' ? true:false
    this.experienceSelect=this.selectedStep=='experience' ? true:false
  }

  // Cambia el step y modifica los colores del stepper personalizado
  changeStep(step,stepper) {
    switch(step) { 
      case 'authorship': { 
        this.selectedIndex = 0
        this.selectedStep =step
        stepper.selectedIndex = this.selectedIndex
        this.updateStep()
        console.log(this.autorShipSelect)
        break
      } 
      case 'work': { 
        this.selectedIndex = 0
        this.selectedStep =step
        stepper.selectedIndex = this.selectedIndex
        this.updateStep()
        console.log(this.workSelect)
        break 
      } 
      case 'experience': { 
        this.selectedIndex = 1
        this.selectedStep =step
        stepper.selectedIndex = this.selectedIndex
        this.updateStep()
        console.log(this.experienceSelect)
        break 
      } 
      default: { 
        stepper.selectedIndex = this.selectedIndex
        console.log(`Selected tab index: ${this.selectedIndex}`)
        break          
      } 
   }
  }

  nextStep(step,stepper) {
    this.selectedIndex = 1
    this.selectedStep =step
    stepper.selectedIndex = this.selectedIndex
    this.updateStep()
  }

  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  formGroup: FormGroup;
  experienceTen : FormGroup

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          authorshipOne: [''],
          authorshipTwo: [''],
          authorshipThree: [''],
          workOneCtrl: ['', Validators.required],
          workTwoCtrl:['', Validators.required],
          workThreeCtrl:['',Validators.required]
        }),
        this._formBuilder.group({
          experienceOne:['',Validators.required],
          experienceTwo:['',Validators.required],
          experienceThree:['',Validators.required],
          experienceFour:['',Validators.required],
          experienceSeven:[''],
          experienceEight:[''],
          aceptTermCond:['', Validators.required]        
        }),
      ]),
    });

   
   
    // this.nameFormGroup = this._formBuilder.group({
    //   firstNameCtrl: ['', Validators.required],
    //   lastNameCtrl: ['', Validators.required],
    // });

    // this.emailFormGroup = this._formBuilder.group({
    //   emailCtrl: ['', Validators.email]
    // });


  }



  onFormSubmit() {
    console.log(JSON.stringify(this.formGroup.value, null, 2))

  }
}
