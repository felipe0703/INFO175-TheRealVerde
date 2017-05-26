import java.sql.*; 
import java.util.*;

/**
 * Esta clase implementa metodos de conexión y consulta a una base de datos.
 * 
 * @author Julio Guerra
 *
 */
public class DBInterface {
	protected String dbString; //  variable del link de la base de datos
	protected String dbUser;   // variable del usuario de la base de datos
	protected String dbPass;   // variable de la contraseña de la base de datos 
	
	protected Connection conn;
	protected Statement stmt = null; 
	protected ResultSet rs = null;
	
	public DBInterface(String connurl, String user, String pass){
		dbString = connurl; // contiene el link de la base de datos donde se encuentran las tablas
		dbUser = user; // contiene el usuario de la base de datos
		dbPass = pass; // contiene la contraseña de la base de datos
	}
	
	/**Metodo para generar la conexion  a la base de datos
	 * con sus respectivas  excepciones 
	 * @return
	 */
	
	public boolean openConnection() {
		try{
			Class.forName("com.mysql.jdbc.Driver").newInstance(); 
			conn = DriverManager.getConnection(dbString + "?" + "user=" + dbUser + "&password=" + dbPass);
			if (conn!=null){
				return true; // si funciona la conexion retonar verdadero 
			}
		// excepciones si es que no retorna verdadero el metodo	
			
		}catch (SQLException ex) {
			System.out.println("SQLException: " + ex.getMessage()); 
			System.out.println("SQLState: " + ex.getSQLState()); 
			System.out.println("VendorError: " + ex.getErrorCode());
			return false;
		}catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
		return true; 
	}
	
	/** Metodo para hacer el cierre de la conexion a la base de datos
	 * con su respectiva excepcion
	 */
	
	public void closeConnection() {
		releaseStatement(stmt, rs);
		if (conn != null) {
			try {
				conn.close(); //cierre exitoso de la base de datos
			}catch (SQLException sqlEx) { } 
		}
	}
	
	
	public void releaseStatement(Statement stmt, ResultSet rs) {
		if (rs != null) {
			try { 
				rs.close();
			}catch (SQLException sqlEx) { sqlEx.printStackTrace(); } 
			rs = null;
		}
		if (stmt != null) {
			try {
				stmt.close();
			}catch (SQLException sqlEx) { sqlEx.printStackTrace(); } 
			stmt = null;
		}
	}
	
	/** Metodo donde recibe la primera consulta 
	 * (hace la consulta,
	 * toma los datos de la base de datos,
	 * guarda los datos en las casillas asignadas del arreglo
	 * y retorna el arreglo)
	 * @return
	 */
	
	public ArrayList<String[]> getSampleData() { //primera  consulta 
		try {
			ArrayList<String[]> res = new ArrayList<String[]>();
			stmt = conn.createStatement();
			//Se añade la consulta que se quiere hacer a la base de datos y se guarda en el query
			String query = "select avg(durationseconds) as tiempo_promedio , count(attemptno) as intentos, applabel, topicname"
					+ " from activity_traces"
					+ " where (durationseconds>0 and appid > 0)"
					+ " group by topicname,applabel  "
					+ " order by topicname,applabel ;"
				
					;
			rs = stmt.executeQuery(query);

			// rs contiene una estructura de tipo SET que contiene todas
			// las filas de la respuesta de la base de datos
			// guarda los datos en cada posicion asignada del arreglo
			while (rs.next()) {
				String[] dataPoint = new String[19];
				dataPoint[0] = rs.getString("tiempo_promedio"); 
				dataPoint[1] = rs.getString("intentos");
				dataPoint[2] = rs.getString("applabel");
				dataPoint[3] = rs.getString("topicname");
				
				res.add(dataPoint);
				
			}
			this.releaseStatement(stmt, rs);
			return res;
		}
		catch (Exception ex) {
			System.out.println("Exception: " + ex.getMessage());
			this.releaseStatement(stmt, rs);
			return null;
		}
	}
	/** Metodo donde recibe la segunda consulta 
	 * (hace la consulta,
	 * toma los datos de la base de datos,
	 * guarda los datos en las casillas asignadas del arreglo
	 * y retorna el arreglo)
	 * @return
	 */
	
	public ArrayList<String[]> getSampleData2() {
		try {
			ArrayList<String[]> res = new ArrayList<String[]>(); //se crea el arreglo dinamico
			stmt = conn.createStatement(); 
			//Se añade la consulta que se quiere hacer a la base de datos y se guarda en el query
			String query = "select  count(result) as intentos_incorrectos, applabel,topicname"
					+ " from activity_traces at"
					+ " where (at.appid>0 and at.result=0 )"
					+ " group by topicname,applabel  "
					+ " order by topicname,applabel ;"
				
					;
			rs = stmt.executeQuery(query);

			// rs contiene una estructura de tipo SET que contiene todas
			// las filas de la respuesta de la base de datos
			// guarda los datos en cada posicion asignada del arreglo
			while (rs.next()) {
				String[] dataPoint = new String[19];
				dataPoint[4] = rs.getString("intentos_incorrectos");
				dataPoint[5] = rs.getString("applabel");
				dataPoint[6] = rs.getString("topicname");
				
				res.add(dataPoint);
				
			}
			this.releaseStatement(stmt, rs);
			return res;
		}
		catch (Exception ex) {
			System.out.println("Exception: " + ex.getMessage());
			this.releaseStatement(stmt, rs);
			return null;
		}
	
	}
	
	/** Metodo donde recibe la tercera  consulta 
	 * (hace la consulta,
	 * toma los datos de la base de datos,
	 * guarda los datos en las casillas asignadas del arreglo
	 * y retorna el arreglo)
	 * @return
	 */
	
	public ArrayList<String[]> getSampleData3() {
		try {
			ArrayList<String[]> res = new ArrayList<String[]>();
			stmt = conn.createStatement();
			//Se añade la consulta que se quiere hacer a la base de datos y se guarda en el query
			String query = "select  count(result) as intentos_correctos_corregidos, applabel,topicname"
					+ " from activity_traces at"
					+ " where (at.appid>0 and at.result=1 )"
					+ " group by topicname,applabel  "
					+ " order by topicname,applabel ;"
				
					;
			rs = stmt.executeQuery(query);

			// rs contiene una estructura de tipo SET que contiene todas
			// las filas de la respuesta de la base de datos
			// guarda los datos en cada posicion asignada del arreglo
			while (rs.next()) {
				String[] dataPoint = new String[19];
				dataPoint[7] = rs.getString("intentos_correctos_corregidos");
				dataPoint[8] = rs.getString("applabel");
				dataPoint[9] = rs.getString("topicname");
				
				res.add(dataPoint);
				
			}
			this.releaseStatement(stmt, rs);
			return res;
		}
		catch (Exception ex) {
			System.out.println("Exception: " + ex.getMessage());
			this.releaseStatement(stmt, rs);
			return null;
	}
	}

	/** Metodo donde recibe la cuarta y ultima consulta 
	 * (hace la consulta,
	 * toma los datos de la base de datos,
	 * guarda los datos en las casillas asignadas del arreglo
	 * y retorna el arreglo)
	 * @return
	 */

	public ArrayList<String[]> getSampleData4() {
		try {
			ArrayList<String[]> res = new ArrayList<String[]>();
			stmt = conn.createStatement();
			//Se añade la consulta que se quiere hacer a la base de datos y se guarda en el query
			String query = "select  count(result) as actividad_vista, applabel,topicname"
					+ " from activity_traces at"
					+ " where (at.appid>0 and at.result=-1 )"
					+ " group by topicname,applabel  "
					+ " order by topicname,applabel ;"
				
					;
			rs = stmt.executeQuery(query);

			// rs contiene una estructura de tipo SET que contiene todas
			// las filas de la respuesta de la base de datos
			// guarda los datos en cada posicion asignada del arreglo
			while (rs.next()) {
				String[] dataPoint = new String[19];
				dataPoint[10] = rs.getString("actividad_vista");
				dataPoint[11] = rs.getString("applabel");
				dataPoint[12] = rs.getString("topicname");
				
				res.add(dataPoint);
				
			}
			this.releaseStatement(stmt, rs);
			return res;
		}
		catch (Exception ex) {
			System.out.println("Exception: " + ex.getMessage());
			this.releaseStatement(stmt, rs);
			return null;
	}
	}

}
