import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class GetTotalsByUser
 * 
 * Ver el método doGet
 */
@WebServlet("/GetTotalsByUser")
public class GetTotalsByUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private DBInterface dbInterface; // dbInterface es para conectarse a la base de datos

    public GetTotalsByUser() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// Usamos esta clase ConfigManager para leer y cargar variables de configuración 
		// definidas en el archivo config.xml
		ConfigManager cm = new ConfigManager(this);
		
		// Un ejemplo de cómo capturar un parametro de url. Si el paramtero no viene en la url, a la variable se le asignará null
		String userId = request.getParameter("userid");
		
		// otro ejemplo de paramtero entero donde hay involucrada una conversión a int. Al final
		// resulta más fácil manejar la exception que tratar de validar de otra forma
		int limit = -1;
		try {
			limit = Integer.parseInt(request.getParameter("limit"));
		}
		catch(Exception e){
			limit = -1;
		}
		//PRIMERA CONSULTA 
		
		// Se inicializa el objeto de conexión a la base de datos 
		dbInterface = new DBInterface(cm.dbString, cm.dbUser, cm.dbPass);
		dbInterface.openConnection(); // abrir la conexión
		
		// llamada a la función getSampleData que hace la consulta a la base de datos
		ArrayList<String[]> data = dbInterface.getSampleData(); 
		dbInterface.closeConnection(); // cerrar la conexión
		// obtener el objeto flujo de salida (para imprimir la respuesta)
		PrintWriter out = response.getWriter();
		
		// escribir la respuesta
				out.print(outAsJSON(data));
			
		//SEGUNDA CONSULTA
				
		// Se inicializa el objeto de conexión a la base de datos 
		dbInterface = new DBInterface(cm.dbString, cm.dbUser, cm.dbPass);
		dbInterface.openConnection(); // abrir la conexión
				
		// llamada a la función getSampleData2 que hace la  segunda consulta a la base de datos
		data = dbInterface.getSampleData2(); 
		dbInterface.closeConnection(); // cerrar la conexión
		// obtener el objeto flujo de salida (para imprimir la respuesta)
		out = response.getWriter();
				
		// escribir la respuesta
		out.print(outAsJSON(data));
					
		//TERCERA CONSULTA
		
		// Se inicializa el objeto de conexión a la base de datos 
		dbInterface = new DBInterface(cm.dbString, cm.dbUser, cm.dbPass);
		dbInterface.openConnection(); // abrir la conexión
						
		// llamada a la función getSampleData3 que hace la  tercera consulta a la base de datos
		data = dbInterface.getSampleData3(); 
		dbInterface.closeConnection(); // cerrar la conexión
		// obtener el objeto flujo de salida (para imprimir la respuesta)
		out = response.getWriter();
						
		// escribir la respuesta
		out.print(outAsJSON(data));
		
		// CUARTA CONSULTA
		
		// Se inicializa el objeto de conexión a la base de datos 
		dbInterface = new DBInterface(cm.dbString, cm.dbUser, cm.dbPass);
		dbInterface.openConnection(); // abrir la conexión
								
		// llamada a la función getSampleData4 que hace la  cuarta consulta a la base de datos
		data = dbInterface.getSampleData4(); 
		dbInterface.closeConnection(); // cerrar la conexión
		// obtener el objeto flujo de salida (para imprimir la respuesta)
		out = response.getWriter();
								
		// escribir la respuesta
		out.print(outAsJSON(data));
		
		////////////////////////////////////////////////////
		
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request,response);
	}
	
	/**
	 * Este metodo escribe en formato JSON la data obtenida desde la base de datos
	 * 
	 * @param data
	 * @return
	 */
	private String outAsJSON(ArrayList<String[]> data) {
		String outString = "[";
		for(String[] row : data) {
			outString += "\n "
					+ "\", \"tiempo_promedio\":\"" + row[0] //datos primera consulta
					+ "\", \"intentos\":\"" + row[1]
					+ "\", \"applabel\":\"" + row[2]
					+ "\", \"topicname\":\"" + row[3]
					+ "\", \"intentos_incorrectos\":\"" + row[4] //datos primera consulta
					+ "\", \"applabel\":\"" + row[5]
					+ "\", \"topicname\":\"" + row[6]
					+ "\", \"intentos_correctos_corregidos\":\"" + row[7] //datos primera consulta
					+ "\", \"applabel\":\"" + row[8]
					+ "\", \"topicname\":\"" + row[9]
					+ "\", \"actividad_vista\":\"" + row[10] //datos primera consulta
					+ "\", \"applabel\":\"" + row[11]
					+ "\", \"topicname\":\"" + row[12]
					+ "\"},";
		}
		outString = outString.substring(0, outString.length() - 1);
		outString += "\n]";
		return outString;
	}

}
