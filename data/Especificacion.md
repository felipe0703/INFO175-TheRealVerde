# The Real Verde
## Especificaciones JSON
### Descripción
Este JSON mostrará la información respecto a cada topico enfocado a nuestra problematica


```javascript
[
  TOPIC,
  ...
]

// TOPIC object:

[
  { 
    "Id_topico" : number, 
    "Actividades" : [
	{	
	"id_actividad": number, 		//identificador del tipo de actividad
	tipo: "String", 		        //dato String
	tiempo_promedio: number, 		//tiempo promedio aproximado en el que se realiza una actividad
	intentos: number, 	 		//promedio de intentos de actividad por parte de los usuarios en un topico. 	
	intentos_incorrectos: number 		//promedio de errores en una actividad por parte de los usuarios en un topico. 	
	}
     ]
  }
]

```
### Salida JSON 


```javascript
[
  TOPIC,
  ...
]

// TOPIC object:

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
```

## Consulta SQL a utilizar
```javascript
asdfdsdsd

```
  
