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

    }
}