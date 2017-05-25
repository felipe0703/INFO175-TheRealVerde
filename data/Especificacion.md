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
	intentos_incorrectos: number 		//numero de errores en una actividad por parte de los usuarios en un topico. 	
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
    "Id_topico" : "Exceptions", 
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
```SQL
/////// consulta que entrega tiempo promedio, intentos incorrectos, tipo de actividad "ANIMATED_EXAMPLE"   y tipo de topico.....
select avg(durationseconds) as tiempo_promedio , count(attemptno) as total_Intentos, applabel as actividad, topicname as topicos
from activity_traces
where (durationseconds>=0 and appid > 0) and applabel = "ANIMATED_EXAMPLE"
group by topicname ;

///////  QUIZPET,  tiempo promedio, intentos incorrectos, tipo de topico
select avg(durationseconds) as tiempo_promedio ,  count(attemptno) as total_Intentos,applabel as actividad, topicname as topicos
from activity_traces
where (durationseconds>=0 and appid > 0) and applabel = "QUIZPET"
group by topicname ;


/////// PARSONS, tiempo promedio, intentos incorrectos, tipo de topico
select avg(durationseconds) as tiempo_promedio , count(attemptno) as total_Intentos, applabel as actividad, topicname as topicos
from activity_traces
where (durationseconds>=0 and appid > 0) and applabel = "PARSONS"
group by topicname ;


////// WEBEX, tiempo promedio, intentos incorrectos, tipo de topico
select avg(durationseconds) as tiempo_promedio , count(attemptno) as total_Intentos, applabel as actividad, topicname as topicos
from activity_traces
where (durationseconds>=0 and appid > 0) and applabel = "WEBEX"
group by topicname ;

////////////////////////////////////////////////////////////////////////////// 

/////  intentos incorrectos en una actividad y topico
select applabel,topicname, count(result) as intentos_incorrectos
from activity_traces at
where (at.appid>0 and at.result=0) and applabel = "PARSONS"
group by topicname ; 

/////  intentos correctos en una actividad y topico
select applabel,topicname, count(result) as intentos_correctos
from activity_traces at
where (at.appid>0 and at.result=1) and applabel = "PARSONS"
group by topicname ;


/////  intentos incorrectos en una actividad y topico
select applabel,topicname, count(result) as intentos_incorrectos
from activity_traces at
where (at.appid>0 and at.result=0) and applabel = "QUIZPET"
group by topicname ;

/////  intentos correctos en una actividad y topico
select applabel,topicname, count(result) as intentos_correctos
from activity_traces at
where (at.appid>0 and at.result=1) and applabel = "QUIZPET"
group by topicname ;



select applabel,topicname, count(result) as actividad_vista
from activity_traces at
where (at.appid>0 and at.result=-1) and applabel = "ANIMATED_EXAMPLE"
group by topicname ;

select applabel,topicname, count(result) as actividad_vista
from activity_traces at
where (at.appid>0 and at.result=-1) and applabel = "WEBEX"
group by topicname ;

