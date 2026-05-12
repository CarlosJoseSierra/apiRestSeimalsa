import { getConnection, querys, sql } from "../database";

export const getAllEmployees = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(querys.getAllEmployees);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .query(querys.getEmployeeById);
      return res.json(result.recordset[0]);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const createEmployee = async (req, res) => {
    try {
        const employee = req.body;
        const pool = await getConnection();
        const result = await pool.request()
        .input('EMP_nombre', sql.VarChar, employee.Nombres)
        .input('EMP_apellido', sql.VarChar, employee.Apellidos)
        .input('EMP_identificacion', sql.VarChar, employee.Identificacion)
        .input('EMP_ciudad', sql.VarChar, employee.Ciudad)
        .input('EMP_cargo', sql.VarChar, employee.Cargo)
        .input('EMP_departamento', sql.VarChar, employee.Departamento)
        .input('EMP_tipoContrato', sql.VarChar, employee.TipoContrato)
        .input('EMP_jornada', sql.VarChar, employee.Jornada)
        .input('EMP_sueldo', sql.Decimal(18, 4), employee.Sueldo)
        .input('EMP_sueldoAnual', sql.Decimal(18, 4), employee.SueldoAnual || 0)
        .input('EMP_sueldoDiario', sql.Decimal(18, 4), employee.SueldoDiario || 0)
        .input('EMP_sueldoHora', sql.Decimal(18, 4), employee.SueldoHora || 0)
        .query(querys.createEmployee);
        if(result.rowsAffected==1){
          return res.status(200).json({ status: "ok", msg: "Registro exitoso" ,token:0});
        }else{
          return res.status(400).json({ status: "400", msg: "No se pudo registrar, consulte al administrador" ,token:0});
        }
      
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = req.body;
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .input('EMP_nombre', sql.VarChar(100), employee.firstName)
        .input('EMP_apellido', sql.VarChar(100), employee.lastName)
        .input('EMP_identificacion', sql.VarChar(50), employee.documentNumber)
        .input('EMP_ciudad', sql.VarChar(100), employee.city)
        .input('EMP_cargo', sql.VarChar(100), employee.position)
        .input('EMP_departamento', sql.VarChar(100), employee.department)
        .input('EMP_tipoContrato', sql.VarChar(50), employee.contractType)
        .input('EMP_jornada', sql.VarChar(50), employee.workSchedule)
        .input('EMP_sueldo', sql.Decimal(18, 2), employee.baseSalary)
        .input('EMP_sueldoAnual', sql.Decimal(18, 2), employee.annualSalary || 0)
        .input('EMP_sueldoDiario', sql.Decimal(18, 2), employee.dailySalary || 0)
        .input('EMP_sueldoHora', sql.Decimal(18, 2), employee.hourlySalary || 0)
        .query(querys.updateEmployee);
  
     if(result.rowsAffected==1){
      return res.status(200).json({ status: "ok", msg: "Actualizacion exitosa" ,token:0});
    }else{
      return res.status(400).json({ status: "400", msg: "No se pudo actualizar, consulte al administrador" ,token:0});
    }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = req.body;
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .query(querys.deleteEmployee);
  
     if(result.rowsAffected==1){
      return res.status(200).json({ status: "ok", msg: "Actualizacion exitosa" ,token:0});
    }else{
      return res.status(400).json({ status: "400", msg: "No se pudo actualizar, consulte al administrador" ,token:0});
    }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
