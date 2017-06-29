import java.sql.*; 
import java.util.*;

/**
 * Esta clase implementa metodos de conexión y consulta a una base de datos.
 * 
 * @author Julio Guerra
 *
 */
public class DBInterfaceVerde {
	protected String dbString; //  variable del link de la base de datos
	protected String dbUser;   // variable del usuario de la base de datos
	protected String dbPass;   // variable de la contraseña de la base de datos 
	
	protected Connection conn;
	protected Statement stmt = null; 
	protected ResultSet rs = null;
	
	public DBInterfaceVerde(String connurl, String user, String pass){
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
		int id=0;
		try {
			ArrayList<String[]> res = new ArrayList<String[]>();
			stmt = conn.createStatement();
			//Se añade la consulta que se quiere hacer a la base de datos y se guarda en el query
			String query = "select avg(durationseconds) as tiempo_promedio , count(attemptno) as intentos, applabel as actividades, topicname as topicos,"
					+ "		sum(result=1) as intentos_correctos, "
					+ "		sum(result=0 ) as intentos_incorrectos,"
					+ "		sum(result=1)/count(attemptno) as porcentaje_correctos,"
					+ "		sum(result=0)/count(attemptno) as porcentaje_incorrectos"
					+ " from activity_traces"
					+ " where (durationseconds>=0 and appid > 0)"
					+ " group by topicname,applabel  "
					+ " order by topicname,applabel ;"
				
					;
			rs = stmt.executeQuery(query);

			// rs contiene una estructura de tipo SET que contiene todas
			// las filas de la respuesta de la base de datos
			// guarda los datos en cada posicion asignada del arreglo
			int i=15;
			while (rs.next()) {
				String h ="";
				String[] dataPoint = new String[9];
				dataPoint[0] = rs.getString("actividades");
				dataPoint[1] = rs.getString("topicos");
				dataPoint[2] = rs.getString("intentos_correctos");
				dataPoint[3] = rs.getString("intentos_incorrectos");
				dataPoint[4] = rs.getString("intentos");
				dataPoint[5] = rs.getString("tiempo_promedio"); 	
				dataPoint[6] = rs.getString("porcentaje_correctos");
				dataPoint[7] = rs.getString("porcentaje_incorrectos");
				h = String.valueOf(i);
				dataPoint[8] =(h);
				i=i+20;
			
				
				
				
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
	
	
}