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
	intentos_correctos_corregidos:number    //numero de errores corregidos en una actividad por parte de los usuarios en un topico           
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
	intentos_correctos_corregidos: 5
	},
	{	
	"id_actividad": 10, 
	tipo: Parson, 
	tiempo_promedio: 23.1, 
	intentos: 6,
	intentos_incorrectos: 4
	intentos_correctos_corregidos: 6
	
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
	intentos_correctos_corregidos: 5
	}
    ]
  }
]
```

## Consulta SQL a utilizar
```SQL

// Consulta entrega tiempo promedio, intentos incorrectos, tipo de topico de las cuatro Actividades

select avg(durationseconds) as tiempo_promedio , count(attemptno) as intentos, applabel, topicname
from activity_traces
where (durationseconds>0 and appid > 0)
group by topicname,applabel  
order by topicname,applabel;

// Consulta entrega intentos incorrectos de las actividades "Quizpet" y "Parsons"

select  count(result) as intentos_incorrectos, applabel,topicname
from activity_traces at
where (at.appid>0 and at.result=0 )
group by topicname,applabel  
order by topicname,applabel ;

// Consulta entrega intentos_correctos_corregidos en los topicos de las actividades "Quizpet" y "Parsons"

select  count(result) as intentos_correctos_corregidos, applabel,topicname
from activity_traces at
where (at.appid>0 and at.result=1 )
group by topicname,applabel
order by topicname,applabel ;

// Consulta entrega numero de actividades vistas por topico para las actividades "Animated Example" y "Webex"

select  count(result) as actividad_vista, applabel,topicname
from activity_traces at
where (at.appid>0 and at.result=-1 )
group by topicname,applabel  
order by topicname,applabel ;


```




