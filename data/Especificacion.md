# The Real Verde
## Especificaciones JSON
### Descripción
Este JSON mostrará la información respecto a cada topico enfocado a nuestra problematica


```javascript

[
  { 
    "Id_topico" : number, 
    "Actividades" : [
	{	
	"id_actividad": number, 
	tipo: "String", 
	tiempo_promedio: number, 
	intentos: number, 
	intentos_incorrectos: number
	}
     ]
  }
]

```


ejemplo json

[
  { 
    "Id_topico" : "1", 
    "Actividades" : [
	{	
	"id_actividad": 1, 
	tipo: Question, 
	tiempo_promedio: 35.1, 
	intentos: 10,
	intentos_incorrectos: 6
	},
	{	
	"id_actividad": 10, 
	tipo: Parson, 
	tiempo_promedio: 23.1, 
	intentos: 6,
	intentos_incorrectos: 4
	
    ]
  },
  { 
    "Id_topico" : "3", 
    "Actividades" : [
	{	
	"id_actividad": 4, 
	tipo: Parsons, 
	tiempo_promedio: 10, 
	intentos: 3,
	intentos_incorrectos: 2
	}
    ]
  }
]



  
