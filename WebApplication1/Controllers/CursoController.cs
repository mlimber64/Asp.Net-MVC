using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class CursoController : Controller
    {
        // GET: Curso
        public ActionResult Index()
        {
            return View();
        }

        public string mensaje()
        {
            return "Bienvenido";
        }

        public string saludo(string nombre)
        {
            return "Hola " + nombre;
        }

        public JsonResult findAllCurso()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { p.IIDCURSO,p.NOMBRE,p.DESCRIPCION}).ToList();

            return Json(lista,JsonRequestBehavior.AllowGet);

        }

        public JsonResult buscarCursoxNombre(string nombres)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(nombres)).Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();
            return Json(lista,JsonRequestBehavior.AllowGet);

        }
    }
}