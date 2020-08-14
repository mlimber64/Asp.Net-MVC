using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class SeccionController : Controller
    {
        // GET: Seccion

        PruebaDataContext bd = new PruebaDataContext(); 
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult findAllSeccion()
        {
            var lista = (bd.Seccion.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { p.IIDSECCION, p.NOMBRE })).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}