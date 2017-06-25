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
	actividad: "String ",			//nombre de la actividad.
	topico: "String", 		        //nombre del topico al cual corresponde la actividad.
	intentos_correctos:number    //numero de intentos correctos en una actividad por parte de los usuarios en un topico.
	intentos_incorrectos: number, 		//numero de errores en una actividad por parte de los usuarios en un topico.
	intentos: number, 	 		//numero de intentos de actividad por parte de los usuarios en un topico.
	tiempo_promedio: number, 		//tiempo promedio aproximado en el que se realiza una actividad
	porcentaje_correctos: number,		//numero que representa el porcentaje de intentos correctos/intentos de tal actividad	
	porcentaje_incorrectos: number,   	//numero que representa el porcentaje de intentos incorrectos/intentos de tal actividad
	numero_columna: number,			//contador que servira para la posicion de la actividad en su topico respectivo(no definida en la consulta )
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
	actividad: "PARSONS",
	topico: " classes_objects", 
	intentos_correctos: 5,
	intentos_incorrectos: 6,
	intentos: 10,
	tiempo_promedio: 35.1, 
	porcentaje_correctos:0,67,
	porcentaje_incorrectos:0,15,
	numero_columna: 15
	},
	{
	actividad: "QUIZPET",
	topico: "if_statements", 
	intentos_correctos: 10,
	intentos_incorrectos: 20,
	intentos: 23,
	tiempo_promedio: 50.3, 
	porcentaje_correctos:0,80,
	porcentaje_incorrectos:0,30,
	numero_columna: 35
  },
  { 
	actividad: "WEBEX",
	topico: "loops", 
	intentos_correctos: 0,
	intentos_incorrectos: 0,
	intentos: 132,
	tiempo_promedio: 4.3, 
	porcentaje_correctos:0,0,
	porcentaje_incorrectos:0,0,
	numero_columna: 775
	}
    ]
  }
]
```

## Consulta SQL a utilizar
```SQL

// consulta que entrega nombre del topico, nombre de la actividad, 
// intentos correctos en una topico e intentos incorrectos 
// total de intentos, el tiempo promedio y porcentajes de correctas e incorrectas
// 

select  applabel as actividades,	
	topicname as topicos,
        sum(result=1) as intentos_correctos, 
        sum(result=0 ) as intentos_incorrectos,
        count(attemptno) as intentos,
        avg(durationseconds) as tiempo_promedio,
        sum(result=1)/count(attemptno) as porcentaje_correctos,
        sum(result=0)/count(attemptno) as porcentaje_incorrectos
from activity_traces at
where (at.appid>0 and at.result>=-1 )
group by topicname,applabel
order by topicname,applabel ;



```




