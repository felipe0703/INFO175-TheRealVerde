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
		ArrayList<String[]> data1 = dbInterface.getSampleData();
		dbInterface.closeConnection(); // cerrar la conexión
		// obtener el objeto flujo de salida (para imprimir la respuesta)
		PrintWriter out = response.getWriter();
									
		// escribir la respuesta
		out.print(outAsJSON4(data1));
		
		////////////////////////////////////////////////////
		
		
		
		
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request,response);
	}
	

	private String outAsJSON4(ArrayList<String[]> data1) {
		 String outString="Topic[";
		 for(String[] row : data1) {
				outString += "\n "
						+ "{\"actividades\": \"" + row[0] //datos primera consulta
						+ "\", \"topicos\": \"" + row[1]
						+ "\", \"intentos_correctos\": " + row[2]
						+ ", \"intentos_incorrectos\": " + row[3]
						+ ", \"intentos\": " + row[4]
						+ ", \"tiempo_promedio\": " + row[5] 
						+ ", \"porcentaje_correctos\": " + row[6]
						+ ", \"porcentaje_incorrectos\": " + row[7]
						
						
						+ "},";
			}
		
		outString = outString.substring(0, outString.length() - 1)+"\n ]";
		
		return outString;
		
	}



}
