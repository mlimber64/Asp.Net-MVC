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
        PruebaDataContext bd = new PruebaDataContext();
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
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { p.IIDCURSO,p.NOMBRE,p.DESCRIPCION}).ToList();

            return Json(lista,JsonRequestBehavior.AllowGet);

        }

        public JsonResult buscarCursoxNombre(string nombres)
        {
            
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(nombres)).Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();
            return Json(lista,JsonRequestBehavior.AllowGet);

        }

        public JsonResult repuerarDatos(int id_curso)
        {
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1) && p.IIDCURSO.Equals(id_curso)).Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(Curso ocurso)
        {
            int nregistrosAfectados = 0;
            try
            {
                if(ocurso.IIDCURSO == 0)
                {
                    bd.Curso.InsertOnSubmit(ocurso);
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }
                else
                {
                   Curso cursoSel = bd.Curso.Where(p => p.IIDCURSO.Equals(ocurso.IIDCURSO)).First();
                    cursoSel.NOMBRE = ocurso.NOMBRE;
                    cursoSel.DESCRIPCION = ocurso.DESCRIPCION;

                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }
            }catch(Exception ez)
            {
                nregistrosAfectados = 0;
            }
            return nregistrosAfectados;
        }

        public int elininarCurso(Curso ocurso)
        {
            int nregistrosAfectados = 0;
            try
            {
                Curso cursoSel = bd.Curso.Where(p => p.IIDCURSO.Equals(ocurso.IIDCURSO)).First();
                cursoSel.BHABILITADO = 0;
                bd.SubmitChanges();
                nregistrosAfectados = 1;
            }
            catch(Exception ex)
            {
                nregistrosAfectados = 0;
            }
            return nregistrosAfectados;
        }
    }
}