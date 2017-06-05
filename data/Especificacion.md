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
    "Id_topico" : String, 
    "Actividades" : [
	{	
	"id_actividad": number, 		//identificador del tipo de actividad
	tipo: "String", 		        //dato String
	tiempo_promedio: number, 		//tiempo promedio aproximado en el que se realiza una actividad
	intentos: number, 	 		//numero de intentos de actividad por parte de los usuarios en un topico. 	
	intentos_incorrectos: number, 		//numero de errores en una actividad por parte de los usuarios en un topico.
	intentos_correctos:number    //numero de intentos correctos en una actividad por parte de los usuarios en un topico           
	}
     ]
  }
]

```
### Salida JSON 


```javascript
// TOPIC object:

[
  { 
    "Id_topico" : "Functions", 
    "Actividades" : [
	{	
	"id_actividad": 1, 
	tipo: Question, 
	tiempo_promedio: 35.1, 
	intentos: 10,
	intentos_incorrectos: 6
	intentos_correctos: 5
	},
	{	
	"id_actividad": 10, 
	tipo: Parson, 
	tiempo_promedio: 23.1, 
	intentos: 6,
	intentos_incorrectos: 4
	intentos_correctos: 6
	
    ]
  },
  { 
    "Id_topico" : "Exceptions", 
    "Actividades" : [
	{	
	"id_actividad": 4, 
	tipo: Parsons, 
	tiempo_promedio: 10, 
	intentos: 3,
	intentos_incorrectos: 2
	intentos_correctos: 5
	}
    ]
  }
]
```

## Consulta SQL a utilizar
```SQL

// consulta que entrega nombre del topico, nombre de la actividad, 
// intentos correctos en una topico e intentos incorrectos 
// total de intentos y por ultimo el tiempo promedio

select  applabel as actividades,	
	topicname as topicos,
        sum(result = 1) as intentos_correctos, 
        sum(result = 0) as intentos_incorrectos,
        count(attemptno) as intentos,
        avg(durationseconds) as tiempo_promedio
from activity_traces at
where (at.appid>0 and at.result>=-1 )
group by topicname,applabel 
order by topicname,applabel ;



```




