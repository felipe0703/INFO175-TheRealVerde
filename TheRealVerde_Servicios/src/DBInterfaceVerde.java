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

			int i = 0;

			int ae = 26;

			int p = 78;

			int q = 130;

			int w = 182;

			int cla_obj = 0;

			int comp = 208;

			int dic = 416;

			int exc = 624;

			int fi_han = 832;

			int func = 1040;

			int if_st = 1248;

			int lis = 1456;

			int log_op = 1664;

			int loo = 1872;

			int ou_for = 2080;

			int str = 2288;

			int val_ref = 2496;

			int var = 2704;

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







				if (rs.getString("actividades").equals("ANIMATED_EXAMPLE")){

					i = i + ae;

				}else if (rs.getString("actividades").equals( "PARSONS")){

					i = i + p;

				}else if (rs.getString("actividades").equals( "QUIZPET")){

					i = i + q;

				}else {

					i = i + w;

				}



				if (rs.getString("topicos").equals("classes_objects")) {

					i = i +cla_obj;

				} else if (rs.getString("topicos").equals("Comparison")) {

					i = i + comp;

				} else if (rs.getString("topicos").equals("dictionary")) {

					i = i + dic;

				} else if (rs.getString("topicos").equals("exceptions")) {

					i = i + exc;

				} else if (rs.getString("topicos").equals("file_handling")) {

					i = i + fi_han;

				} else if (rs.getString("topicos").equals("Functions")) {

					i = i + func;

				} else if (rs.getString("topicos").equals("if_statements")) {

					i = i + if_st;

				} else if (rs.getString("topicos").equals("Lists")) {

					i = i + lis;

				} else if (rs.getString("topicos").equals("logical_operators")) {

					i = i + log_op;

				} else if (rs.getString("topicos").equals("loops")) {

					i = i + loo;

				} else if (rs.getString("topicos").equals("output_formatting")) {

					i = i + ou_for;

				} else if (rs.getString("topicos").equals("strings")) {

					i = i + str;

				} else if (rs.getString("topicos").equals("values_references")) {

					i = i + val_ref;

				} else {

					i = i + var;

				}

				



				h = String.valueOf(i);

				dataPoint[8] =(h);

				i = 0;

			

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
