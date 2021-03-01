using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class AlumnoController : Controller
    {
        // GET: Alumno

        PruebaDataContext bd = new PruebaDataContext();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult findAllSexo()
        {
            var lista = (bd.Sexo.Where(p => p.BHABILITADO.Equals(1)).Select(p => new {IID= p.IIDSEXO, p.NOMBRE })).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult findAllAlumno()
        {
            
            var lista = (bd.Alumno.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { p.IIDALUMNO, p.NOMBRE, p.APPATERNO, p.APMATERNO, p.TELEFONOPADRE })).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarAlumnoxSexo(int idsexo)
        {
            var lista = bd.Alumno.Where(p => p.BHABILITADO.Equals(1) && p.IIDSEXO.Equals(idsexo)).Select(p => new { p.IIDALUMNO, p.NOMBRE, p.APPATERNO, p.APMATERNO, p.TELEFONOPADRE }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int eliminar(int id_alumno)
        {
            int nregistrosAfectados = 0;
            try
            {
                Alumno oAlumno = bd.Alumno.Where(p => p.IIDALUMNO.Equals(id_alumno)).First();
                oAlumno.BHABILITADO = 0;
                bd.SubmitChanges();
                nregistrosAfectados = 1;
            }
            catch(Exception ex)
            {
                nregistrosAfectados = 0;
            }

            return nregistrosAfectados;
        }

        public JsonResult recuperarAlumno(int id_alumno)
        {
            var lista = bd.Alumno.Where(p => p.IIDALUMNO.Equals(id_alumno)).Select(p => new
            {
                p.IIDALUMNO,
                p.NOMBRE,
                p.APPATERNO,
                p.APMATERNO,
                FECHANAC = ((DateTime)p.FECHANACIMIENTO).ToShortDateString(),
                p.IIDSEXO,
                p.NUMEROHERMANOS,
                p.TELEFONOPADRE,
                p.TELEFONOMADRE

            });

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(Alumno oAlumno)
        {
            int nregistrosAfectados = 0;

            try
            {
                int idAlumno = oAlumno.IIDALUMNO;

                if(idAlumno == 0)
                {
                    bd.Alumno.InsertOnSubmit(oAlumno); //agregar
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }else
                {
                    Alumno obj = bd.Alumno.Where(p => p.IIDALUMNO.Equals(idAlumno)).First();

                    obj.NOMBRE = oAlumno.NOMBRE;
                    obj.APPATERNO = oAlumno.APPATERNO;
                    obj.APMATERNO = oAlumno.APMATERNO;
                    obj.FECHANACIMIENTO = oAlumno.FECHANACIMIENTO;
                    obj.IIDSEXO = oAlumno.IIDSEXO;
                    obj.TELEFONOPADRE = oAlumno.TELEFONOPADRE;
                    obj.TELEFONOMADRE = oAlumno.TELEFONOMADRE;
                    obj.NUMEROHERMANOS = oAlumno.NUMEROHERMANOS;

                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                    
                }
            }catch(Exception ex)
            {
                nregistrosAfectados = 0;
            }

            return nregistrosAfectados;
        }

    }
}