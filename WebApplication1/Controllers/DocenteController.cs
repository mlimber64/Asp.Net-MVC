using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente

        PruebaDataContext bd = new PruebaDataContext();
        
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult findAllSexo()
        {
            var lista = (bd.Sexo.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { IID = p.IIDSEXO, p.NOMBRE })).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult findAllDocente()
        {
            //var lista = (from docente in bd.Docente where docente.BHABILITADO.Equals(1) select new { docente.IIDDOCENTE, docente.NOMBRE, docente.APPATERNO, docente.APMATERNO, docente.EMAIL }).ToList();

            var lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { p.IIDDOCENTE, p.NOMBRE, p.APPATERNO, p.APMATERNO, p.EMAIL }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarDocentexModalidad(int idmodalidad)
        {

            var lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1) && p.IIDMODALIDADCONTRATO.Equals(idmodalidad)).Select(p => new { p.IIDDOCENTE, p.NOMBRE, p.APPATERNO, p.APMATERNO, p.EMAIL }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }



        public JsonResult findAllModalidadContrato()
        {
            var lista = bd.ModalidadContrato.Where(p => p.BHABILITADO.Equals(1)).Select(p => new {IID = p.IIDMODALIDADCONTRATO, p.NOMBRE }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

    }
}